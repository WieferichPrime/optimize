import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BaseSelect from '../../components/BaseSelect/BaseSelect';
import { changeTask } from '../../redux/actions';


function Tasks() {
    const dispatch = useDispatch();
    const items = ['Распределение однородного ресурса', 'Распределение однородного ресурса (общий случай)', 'Неоднородный ресурс', 'Трёхиндексная функция'];
    
    const [task, setTask] = useState(Number(useSelector( select => select.task)));
    const dataHandler = useCallback((newData) => {
        dispatch(changeTask(newData));
    }, []);

    useEffect(() => {
        dataHandler(task);
    }, [task])
    return ( 
        <>
            <div className='row mt-1'>
                <div className='col-3'></div>
                <div className='col-6'>
                    <BaseSelect 
                    items={items} 
                    label='Задача' 
                    handleChange={(e) => setTask(items.indexOf(e.target.value))}
                    >
                    </BaseSelect>
                </div>
                <div className='col-3'></div>
            </div>
            <div>
                {items[task] || ''}
            </div>
        </>
     );
}

export default Tasks;