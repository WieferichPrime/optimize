import {combineReducers} from 'redux'
import {CHANGE_TABLES, CHANGE_TASK, CLEAR_TABLES} from './types'

function tablesReducer(state=JSON.parse(sessionStorage.getItem('tables')) || {}, action) {
    if (action.type === CHANGE_TABLES) {
        const newState = {...state, ...action.payload}
        sessionStorage.setItem('tables', JSON.stringify(newState));
        return newState;
    } 
    if (action.type === CLEAR_TABLES) {
      const newState = {}
      sessionStorage.removeItem('tables');
      return newState;
    } 
    
    return state
}

function taskReducer(state=sessionStorage.getItem('task'), action) {
  if (action.type === CHANGE_TASK) {
    const newState = action.payload;
    sessionStorage.setItem('task', newState);
    return newState;
  } 
  return state;
}

export const rootReducer = combineReducers({
  tables: tablesReducer,
  task: taskReducer
})