// @flow
// Import React "as a namespace":
//   ~ https://flow.org/en/docs/react/types/
import * as React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import qs from 'qs'
// App
import './reset.css'
import './index.css'
import SelectionSort from './SelectionSort.js'
import reducer from './redux/reducer.js'
import logger from './redux/middleware/logger.js'

// Flow
import type { GlobalState } from './redux/reducer.js'
// If there's a click=SOMETHING in the url use that,
// otherwise use a default
const click = qs.parse(window.location.search.substring(1)).click || 1000
// If there's a cols=SOMETHING in the url use that,
// otherwise use a default
const cols = qs.parse(window.location.search.substring(1)).cols || 5
// If there's a rows=SOMETHING in the url use that,
// otherwise use a default
const rows = qs.parse(window.location.search.substring(1)).rows || 5
// Generate the array of random values between 0 and 1
const a = arrayToSort(cols, rows)

const initialState: GlobalState = {
  ui: {
    click,
    cols,
    rows,
    size: null,
    grid: null
  },
  data: {
    i: 0, // The starting index
    a: a
  }
}

const store = createStore(reducer, initialState, applyMiddleware(logger))

function App() {
  return (
    <Provider store={store}>
      <SelectionSort />
    </Provider>
  )
}

// -------------------------------------
// Helpers
// -------------------------------------
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
export default App
