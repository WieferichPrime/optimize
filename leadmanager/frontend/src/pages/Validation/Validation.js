import React from 'react';
import { useSelector } from 'react-redux';

function Validation() {
    const tables = useSelector(state => state.tables);
    
    return ( 
        <>
            {
            (tables.table_1.columns.length === 0
            && tables.table_1.rows.length === 0
            &&tables.table_2.columns.length === 0
            && tables.table_2.rows.length === 0
            )?'Нечего проверять, введите исходные данные':
            Object.values(tables).map(table => {
                return ( 
                    <table className="table">
                        <thead>
                            <tr>
                            {table.columns.map(col => <th scope='col' key={col.title}>{col.title}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {table.rows.map((row, i) => <tr key={i}>
                                    {table.columns.map( (cell, j) => <td scope='col' key={`${i}${j}`}>{row[cell.name]}</td>)}
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                )
            })}
        </>
        // <table class="table">
            
        //     <tbody>
        //         {Object.values(tables).map(table => table.columns.map(col => <th scope='col'>{col.name}</th>))}
        //         <tr>
        //         <th scope="row">1</th>
        //         <td>Mark</td>
        //         <td>Otto</td>
        //         <td>@mdo</td>
        //         </tr>
        //         <tr>
        //         <th scope="row">2</th>
        //         <td>Jacob</td>
        //         <td>Thornton</td>
        //         <td>@fat</td>
        //         </tr>
        //         <tr>
        //         <th scope="row">3</th>
        //         <td colspan="2">Larry the Bird</td>
        //         <td>@twitter</td>
        //         </tr>
        //     </tbody>
        // </table>
    );
}

export default Validation;