// @flow
import { combineReducers } from 'redux'
// Types
import type { Cell } from '../services/gridService.js'
import type { Actions } from './actions.js'
export type Ui = {
  click: number,
  cols: number,
  grid: Cell[][] | null,
  rows: number,
  size: {
    width: number,
    height: number
  } | null
}
export type Data = {
  a: number[],
  i: number
}
export type GlobalState = {
  data: Data,
  ui: Ui
}

function uiReducer(state: Ui | typeof undefined, action: Actions) {
  if (typeof state === 'undefined') {
    return {
      click: 0,
      cols: 0,
      rows: 0,
      size: null,
      grid: null
    }
  }
  switch (action.type) {
    case 'UPDATE_GRID':
      return Object.assign({}, state, {
        grid: action.payload
      })
    default:
      return state
  }
}

function dataReducer(state: Data | typeof undefined, action: Actions) {
  if (typeof state === 'undefined') {
    return {
      i: 0,
      a: []
    }
  }
  switch (action.type) {
    default:
      return state
  }
}

const reducer = combineReducers({
  ui: uiReducer,
  data: dataReducer
})

export default reducer
