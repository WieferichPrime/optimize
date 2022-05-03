import EditableTable from "../../components/EditTable/EditTable";
import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { clearTables } from "../../redux/actions";

const Main = () => {
    const dispatch = useDispatch();
    const dataHandler = React.useCallback(() => {
      dispatch(clearTables());
      location.reload();
    }, []);
    return (
        <>
            <div className="btn btn-primary mt-5" onClick={dataHandler}>Очистить всё</div>
            <div style={{marginTop: '20px'}}>
                <EditableTable 
                initCols={useSelector(state => state.tables.table_1 && state.tables.table_1.columns?state.tables.table_1.columns:[])}
                initRows={useSelector(state => state.tables.table_1 && state.tables.table_1.rows?state.tables.table_1.rows:[])}
                title={'Типы объектов'}
                tableName = 'table_1'
                ></EditableTable>
            </div>
            <div style={{marginTop: '20px'}}>
                <EditableTable 
                initCols={useSelector(state => state.tables.table_2 && state.tables.table_2.columns?state.tables.table_2.columns:[])}
                initRows={useSelector(state => state.tables.table_2 && state.tables.table_2.rows?state.tables.table_2.rows:[])}
                title={'Вероятности успешного воздействия средств по объектам'}
                tableName = 'table_2'
                ></EditableTable>
            </div>
        </>
    )
}

export default Main;
