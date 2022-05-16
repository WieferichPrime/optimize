import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ChartBar from '../../components/ChartBar/ChartBar';
import styles from './Calculation.module.scss';

function getCookie(name) {
    if (!document.cookie) {
      return null;
    }
  
    const xsrfCookies = document.cookie.split(';')
      .map(c => c.trim())
      .filter(c => c.startsWith(name + '='));
  
    if (xsrfCookies.length === 0) {
      return null;
    }
    return decodeURIComponent(xsrfCookies[0].split('=')[1]);
}


function Calculation() {
    const tables = useSelector(select => select.tables);
    const task = Number(useSelector(select => select.task));
    const [data, setData] = useState({});
    useEffect(() => {
        fetch('/get', { 
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({tables, task})
        })
        .then(res => res.json())
        .then(res => {setData(res);})
        .catch(err => console.log(err))
    }, [tables])
    
    let content = data && data.x && data.F?( 
        <>  
            <div className='col'>
                    <h3>{(task === 0 || task === 1)?'Вектор решения':'Матрица решения'}</h3>
                    <table className='table'>
                        <thead>
                            <tr>
                            <th>{task === 0 || task === 1?'Объект':'Объект/Средство'}</th>
                                {
                                    ((task === 0 || task === 1)?data.x:data.x[0]).map( (col, i) => <th>{i}</th>) 
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (task === 0 || task === 1)?
                                (
                                <tr>
                                    <th></th>
                                    {data.x.map(cell => <td>{cell}</td>)}
                                </tr>
                                ):null
                            }
                            {
                                (task === 2 || task === 3)?
                                (data.x.map( (col, j) => <tr>
                                    <th>{j}</th>
                                    {col.map(cell => <td>{cell}</td>)}
                                </tr>)
                                ):null
                            }
                        </tbody>
                    </table>
                </div>
                {
                (task !== 3)?
                    (
                        <div className='col'>
                            <ChartBar 
                            data={data.F.map( point => ({argument: (task === 0 || task === 1?'Период ':'Средство ') + point[1], value: point[0]}))} 
                            value={'value'} 
                            argument={'argument'}
                            title = {'Полезное воздействие'}
                            ></ChartBar>
                            <span>F(x) = {data.F.map(elem => elem[0]).reduce((prev, current) => prev + current).toFixed(2)}</span>
                        </div>
                    )
                    :<span className={styles.function}>F(x) = {data.res.toFixed(2)}</span>
                }
        </>
     ):<div className={styles.gear__inner}><i className={["fa", "fa-gear", "fa-10x", styles.gear].join(' ')}></i> </div>
     return content;
}

export default Calculation;