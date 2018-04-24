// @flow
// Types
import type { Cell } from '../services/gridService.js'
import type { Actions } from './actions.js'
export type GlobalState = {
  ui: {
    click: number,
    cols: number,
    rows: number,
    size: {
      width: number,
      height: number
    } | null,
    grid: Cell[][] | null
  },
  data: {
    i: number,
    a: number[]
  }
}
export default function reducer(
  state: GlobalState | typeof undefined,
  action: Actions
) {
  if (typeof state === 'undefined') {
    return state
  }
  switch (action.type) {
    case 'START':
      return state
    case 'DONE':
      return state
    case 'ERROR':
      return state
    default:
      return state
  }
}
