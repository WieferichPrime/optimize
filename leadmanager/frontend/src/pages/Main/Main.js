import EditableTable from "../../components/EditTable/EditTable";
import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { clearTables } from "../../redux/actions";
import { Input } from "@mui/material";

const Main = () => {
    const dispatch = useDispatch();
    const task = Number(useSelector(select => select.task));
    const [objCount, setObjCount] = React.useState(0);
    const dataHandler = React.useCallback(() => {
      dispatch(clearTables());
      location.reload();
    }, []);
    let content = '';
    switch(task) {
        case 0 : {
            content = (
                <>
                    <div className="btn btn-primary mt-5" onClick={dataHandler}>Очистить всё</div>
                    <div style={{marginTop: '20px'}}>
                        <EditableTable 
                        initCols={useSelector(state => state.tables.table_1 && state.tables.table_1.columns?state.tables.table_1.columns:[])}
                        initRows={useSelector(state => state.tables.table_1 && state.tables.table_1.rows?state.tables.table_1.rows:[])}
                        title={'Типы объектов'}
                        tableName = 'table_1'
                        onlyOneRow = {true}
                        ></EditableTable>
                    </div>
                    <div style={{marginTop: '20px'}}>
                        <EditableTable 
                        initCols={useSelector(state => state.tables.table_2 && state.tables.table_2.columns?state.tables.table_2.columns:[])}
                        initRows={useSelector(state => state.tables.table_2 && state.tables.table_2.rows?state.tables.table_2.rows:[])}
                        title={'Вероятности успешного воздействия средств по объектам'}
                        tableName = 'table_2'
                        onlyOneRow = {true}
                        ></EditableTable>
                    </div>
                </>
            )
        }; break;
        case 1 : {
            content = (
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
            </>)
        }; break;
        case 2: {
            content = (
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
        }; break;
        case 3: {
            content = (
                <>
                    <div className="btn btn-primary mt-5" onClick={dataHandler}>Очистить всё</div>
                    <div style={{marginTop: '20px'}}>
                        <EditableTable 
                        initCols={useSelector(state => state.tables.table_1 && state.tables.table_1.columns?state.tables.table_1.columns:[])}
                        initRows={useSelector(state => state.tables.table_1 && state.tables.table_1.rows?state.tables.table_1.rows:[])}
                        title={'Типы объектов'}
                        tableName = 'table_1'
                        getNumObjects={(num) => setObjCount(num)}
                        ></EditableTable>
                    </div>
                    {
                        [...Array(objCount).keys()].map(elem => (
                            <EditableTable 
                                initCols={[]}
                                initRows={[]}
                                title={`Цель №${elem}`}
                                tableName = {`obj_${elem}`}
                                key={`obj_${elem}`}
                            ></EditableTable>
                        ))
                    }
                </>
            )
            
        }; break;
        default: content = 'Задача не определена';
    }

    return content;
}

export default Main;
