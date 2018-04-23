// @flow
import qs from 'qs'
import D from '../services/gridService.js'
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
    },
    grid: Cell[][]
  },
  data: {
    i: number,
    a: number[]
  }
}
// If there's a click=SOMETHING in the url use that,
// otherwise use a default
const initialClick = qs.parse(window.location.search.substring(1)).click || 1000
// If there's a cols=SOMETHING in the url use that,
// otherwise use a default
const initialCols = qs.parse(window.location.search.substring(1)).cols || 5
// If there's a rows=SOMETHING in the url use that,
// otherwise use a default
const initialRows = qs.parse(window.location.search.substring(1)).rows || 5
const a = arrayToSort(initialCols, initialRows)
const initialSize = { width: window.innerWidth, height: window.innerHeight }

const initialState: GlobalState = {
  ui: {
    click: initialClick,
    cols: initialCols,
    rows: initialRows,
    size: initialSize,
    grid: D.gridFactory(
      a,
      initialSize.width,
      initialSize.height,
      initialCols,
      initialRows,
      initialClick
    )()
  },
  data: {
    i: 0,
    a: a
  }
}

export default function reducer(
  state: GlobalState = initialState,
  action: Actions
) {
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

export function arrayToSort(cols: number, rows: number): number[] {
  const a: number[] = []
  let randomNumber: number = 0
  const numItems: number = cols * rows
  for (let i = 0; i < numItems; i++) {
    randomNumber = Math.random()
    a.push(randomNumber)
  }
  return a
}
