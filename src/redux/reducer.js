// @flow
import qs from 'qs'
import D from '../services/gridService.js'
// Types
import type { Cell } from '../services/gridService.js'
import type { Actions } from './actions.js'
export type GlobalState = {
  i: number,
  click: number,
  a: number[],
  cols: number,
  rows: number,
  size: {
    width: number,
    height: number
  },
  grid: Cell[][]
}

const initialClick = click()
const initialCols = cols()
const initialRows = rows()
const a = arrayToSort(initialCols, initialRows)
const initialSize = { width: window.innerWidth, height: window.innerHeight }

const initialState: GlobalState = {
  i: 0,
  click: initialClick,
  a: a,
  cols: cols(),
  rows: rows(),
  size: initialSize,
  grid: D.gridFactory(
    a,
    initialSize.width,
    initialSize.height,
    initialCols,
    initialRows,
    initialClick
  )()
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

export function click() {
  const urlProps: Object = qs.parse(window.location.search.substring(1))
  // Set the `click` property  used for the basic selectionSort frequency
  if (urlProps.click) {
    return urlProps.click
  } else {
    return 1000
  }
}

export function cols() {
  const urlProps: Object = qs.parse(window.location.search.substring(1))
  if (urlProps.cols) {
    return urlProps.cols
  } else {
    return 5
  }
}

export function rows() {
  const urlProps: Object = qs.parse(window.location.search.substring(1))
  if (urlProps.rows) {
    return urlProps.rows
  } else {
    return 5
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
