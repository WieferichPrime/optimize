import React, { useCallback, useEffect, useRef, useState } from 'react';
import saveAs from 'file-saver';
import Paper from '@mui/material/Paper';
import { EditingState } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditColumn,
  TableInlineCellEditing,
  TableColumnVisibility,
  ExportPanel,
  Toolbar
} from '@devexpress/dx-react-grid-material-ui';
import { GridExporter } from '@devexpress/dx-react-grid-export';
import { Input, FormControl, Button } from '@mui/material';
import BaseSelect from '../BaseSelect/BaseSelect';
import readXlsxFile from 'read-excel-file'
import './EditTable.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changeTables } from '../../redux/actions';

const tableMessages = {
  noData: 'Нет данных',
};
const editColumnMessages = {
  addCommand: 'Добавить',
  editCommand: 'Изменить',
  deleteCommand: 'Удалить',
  commitCommand: 'Подтвердить',
  cancelCommand: 'Отменить',
};

    
// const groupingPanelMessages = {
//   groupByColumn: 'Ziehen Sie eine Spalte hierhin, um danach zu gruppieren',
// };
// const filterRowMessages = {
//   filterPlaceholder: 'Filter...',
// };
// const pagingPanelMessages = {
//   showAll: 'Alle',
//   rowsPerPage: 'Zeilen pro Seite',
//   info: 'Zeilen {from} bis {to} ({count} Elemente)',
// };

const getRowId = (row) => row.id;

let saved = false;
const onSave = (workbook, name) => {
  workbook.xlsx.writeBuffer().then((buffer) => {
    if (!saved) {
      saved = true;
      saveAs(
        new Blob([buffer], { type: "application/octet-stream" }),
        `${name}.xlsx`
      );
    } else saved = false;
  });
};

const MyTable = ({title, tableName, initRows, initCols, onlyOneRow = false, getNumObjects = () => null}) => {
  const [columns, setColumns] = useState(initCols);
  const [rows, setRows] = useState(initRows);
  const [addedColumn, setAddedColumn] = useState('');
  const [deletedColumn, setDeletedColumn] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [excelLoaded, setExcelLoaded] = useState(false);
  // const [editingCells, setEditingCells] = useState([]);
  // const [editingRowIds, setEditingRowIds] = useState([]);
  const [rowChanges, setRowChanges] = useState({});
  const [hiddenColumnNames, setHiddenColumnNames] = useState(['id']);
  const [validationStatus, setValidationStatus] = useState({});
  const [validationRules, setValidationRules] = useState({});
  const exporterRef = useRef(null);

  useEffect(() => {
    const rules = {};
    columns.forEach(({name}) => {
      rules[name] = string;
    });
    setValidationRules({...validationRules, ...rules});
  }, [excelLoaded])

  const dispatch = useDispatch();

  const dataHandler = useCallback((newData) => {
    dispatch(changeTables(newData));

  }, []);

  useEffect(() => {
    const tableData = {}
    tableData[tableName] = {
      columns: columns,
      rows: rows
    }
    dataHandler(tableData);
    getNumObjects(columns.length)
  }, [columns, rows])

  const number = {
    isValid: number => Number.isInteger(+number),
    errorText: 'Введите целое число',
  };

  const probability = {
    isValid: n => +n <= 1 && +n >= 0,
    errorText: 'Введите число в диапозоне от 0 до 1',
  };

  const string = {
    isValid: value => value.length !== 0,
    errorText: 'Непустое текстовое поле',
  }

  const addColumn = () => {
    if (addedColumn !== '' && selectedType !== '' && columns.findIndex( col => col.name === addedColumn) === -1) {
      const newRule = {};
      switch(selectedType) {
        case 'Строка': newRule[addedColumn] = string;break;
        case 'Вероятность': newRule[addedColumn] = probability;break;
        case 'Целое число': newRule[addedColumn] = number;break;
        
        default: newRule[addedColumn] = string;
      }
      
      setValidationRules({...validationRules, ...newRule});
      
      setColumns([...columns, {
        name: addedColumn,
        title: addedColumn
      }]);
    }
  }

  const deleteColumn = () => {
    if (deletedColumn !== '' && columns.findIndex( col => col.title === deletedColumn) !== -1) {
      setColumns(columns.filter(col => col.title !== deletedColumn));
    }
  }

  const validate = (changed, validationStatus) => Object.keys(changed).reduce((status, id) => {
    let rowStatus = validationStatus[id] || {};
    if (changed[id]) {
      rowStatus = {
        ...rowStatus,
        ...Object.keys(changed[id]).reduce((acc, field) => {
          const isValid = validationRules[field].isValid(changed[id][field]);
          return {
            ...acc,
            [field]: {
              isValid,
              error: !isValid && validationRules[field].errorText,
            },
          };
        }, {}),
      };
    }
  
    return { ...status, [id]: rowStatus };
  }, {});

  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId = rows.length > 0
        ? Math.max(rows[rows.length - 1].id, rows[0].id) + 1
        : 0;
      changedRows = [
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
        ...rows,
      ];
      //setEditingCells([{ rowId: startingAddedId, columnName: columns[0].name }]);
    }
    if (changed) {
      changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
      setValidationStatus({ ...validationStatus, ...validate(changed, validationStatus) });
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter(row => !deletedSet.has(row.id));
    }
    
    setRows(changedRows);
  };

  const addEmptyRow = () => commitChanges({ added: [{}] });

  const Cell = React.useCallback((props) => {
    const { tableRow: { rowId }, column: { name: columnName } } = props;
    const columnStatus = validationStatus[rowId]?.[columnName];
    const valid = !columnStatus || columnStatus.isValid;
    const style = {
      ...(!valid ? { color: 'tomato' } : null),
    };
    const title = valid ? '' : validationStatus[rowId][columnName].error;

    return (
      <Table.Cell
        {...props}
        style={style}
        title={title}
      />
    );
  }, [validationStatus]);

  const selectChange = (event) => setSelectedType(event.target.value);

  const startExport = useCallback(() => {
    exporterRef.current.exportGrid();
  }, [exporterRef]);

  const importExcel = (e) => {
        readXlsxFile(e.target.files[0])
        .then((rows) => {
          let columns = rows[0];
          let addedRows = rows.slice(1);
          if (rows[0][0] === 'id') {
            columns = columns.slice(1);
            addedRows = addedRows.map(row => row.slice(1));
          }
          setColumns(columns.map(cell => ({name: cell, title: cell})));
          addedRows = addedRows.map(row => {
            const newRow = {};
            columns.forEach((col, index) => {
              newRow[col] = row[index];
            });
            //console.log(newRow);
            return newRow;
          })
          console.log(addedRows, columns, rows[0][0]);
        commitChanges({added: addedRows});
        })
        .then(() => setExcelLoaded(true))
        .catch((err) => console.log(err));
  }



  return (
    <Paper className='my-table'>
      <h3 className='table-title'>{title}</h3>
      <div className='row'>
        <div className='col-6'></div>
        <div className='col-2'>
          <BaseSelect items={['Строка', "Целое число", "Вероятность"]} label='Тип' handleChange={selectChange}></BaseSelect>
        </div>
        <div className='col-2'>
          <Input placeholder='Название столбца' onChange={(e) => setAddedColumn(e.target.value)} style={{height: '100%'}}></Input>
        </div>
        <div className='col-2'>
          <Button onClick = {() => {addColumn()}} className='mr-5'>
            Добавить столбец
          </Button>
        </div>
      </div>
      <div className='row' style={{marginTop: '10px'}}>
        <div className='col-8'></div>
        <div className='col-2'>
          <Input placeholder='Название столбца' onChange={(e) => setDeletedColumn(e.target.value)} style={{height: '100%'}}></Input>
        </div>
        <div className='col-2'>
          <Button onClick = {() => {deleteColumn()}} className='mr-5'>
            Удалить столбец
          </Button>
        </div>
      </div>
      <Grid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
      >
        <EditingState
          onCommitChanges={commitChanges}
          rowChanges={rowChanges}
          onRowChangesChange={setRowChanges}
          // editingCells={editingCells}
          // onEditingCellsChange={setEditingCells}
          addedRows={[]}
          onAddedRowsChange={addEmptyRow}
        />
        <Table cellComponent={Cell} messages={tableMessages}/>
        <TableHeaderRow />
        <TableInlineCellEditing selectTextOnEditStart />
        <TableEditColumn
          showAddCommand = {!onlyOneRow || rows.length === 0}
          showDeleteCommand
          messages= {editColumnMessages}
        />
        <TableColumnVisibility
          hiddenColumnNames={hiddenColumnNames}
          onHiddenColumnNamesChange={setHiddenColumnNames}
          messages={{noColumns: 'Нечего показывать'}}
        />
        <Toolbar />
        <ExportPanel startExport={startExport} />
      </Grid>
      <GridExporter
      ref={exporterRef}
      columns={columns}
      rows={rows}
      onSave={(param) => onSave(param, title)}
      />
      <div className='d-flex justify-content-end mt-2 mb-2'>
          <Button
            variant="contained"
            component="label"
            >
              Загрузить данные (Excel)
              <input
                type="file"
                hidden
                onChange={importExcel}
              />
          </Button>
        </div>
    </Paper>
  );
};

export default MyTable;