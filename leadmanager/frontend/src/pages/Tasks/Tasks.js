import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BaseSelect from '../../components/BaseSelect/BaseSelect';
import { changeTask } from '../../redux/actions';


function Tasks() {
    const [task, setTask] = useState(useSelector( select => select.task));
    const dispatch = useDispatch();
    
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
                    items={['Распределение однородного ресурса', 'Распределение однородного ресурса (общий случай)', 'Неоднородный ресурс', 'Трёхиндексная функция']} 
                    label='Задача' 
                    handleChange={(e) => setTask(e.target.value)}
                    selected={task}
                    >
                    </BaseSelect>
                </div>
                <div className='col-3'></div>
            </div>
            <div>
                {task}
            </div>
        </>
     );
}

export default Tasks;