import {CHANGE_TABLES, CLEAR_TABLES, CHANGE_TASK} from './types'

export function changeTables(newData) {
  return {
    type: CHANGE_TABLES,
    payload: newData
  }
}

export function changeTask(newData) {
  return {
    type: CHANGE_TASK,
    payload: newData
  }
}

export function clearTables() {
  return {
    type: CLEAR_TABLES
  }
}

