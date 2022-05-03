import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ChartBar from '../../components/ChartBar/ChartBar';

// function getCookie(name) {
//     if (!document.cookie) {
//       return null;
//     }
  
//     const xsrfCookies = document.cookie.split(';')
//       .map(c => c.trim())
//       .filter(c => c.startsWith(name + '='));
  
//     if (xsrfCookies.length === 0) {
//       return null;
//     }
//     return decodeURIComponent(xsrfCookies[0].split('=')[1]);
// }


function Calculation() {
    const tables = useSelector(select => select.tables);
    const [data, setData] = useState({});
    useEffect(() => {
        fetch('/get', { 
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(tables)
        })
        .then(res => res.json())
        .then(res => {setData(res);})
        .catch(err => console.log(err))
    }, [tables])
    
    let content = data && data.x && data.F?( 
        <>  
            <div className='row'>
                <div className='col-6'>
                    <h3>Матрица решения</h3>
                    <table className='table'>
                        <thead>
                            <tr>
                            <th>i/j</th>
                                {
                                    data.x[0].map( (col, i) => <th>{i}</th>)
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {data.x.map( (col, j) => <tr>
                                <th>{j}</th>
                                {col.map(cell => <td>{cell}</td>)}
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className='col-6'>
                    <ChartBar 
                    data={data.F.map( point => ({argument: 'Средство ' + point[1], value: point[0]}))} 
                    value={'value'} 
                    argument={'argument'}
                    title = {'Полезное воздействие'}
                    ></ChartBar>
                    
                </div>
                <span>Итоговый ущерб: {data.F.map(elem => elem[0]).reduce((prev, current) => prev + current).toFixed(2)}</span>
            </div>
        </>
     ): 'Загрузка...'

     return content;
}

export default Calculation;