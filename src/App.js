// @flow
// Import React "as a namespace":
//   ~ https://flow.org/en/docs/react/types/
import * as React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
// App
import './reset.css'
import './index.css'
import SelectionSort from './SelectionSort.js'
import reducer from './redux/reducer.js'

let store = createStore(reducer)

// Initialise state here?

function App() {
  return (
    <Provider store={store}>
      <SelectionSort cols="3" rows="3" click="500" />
    </Provider>
  )
}

export default App
