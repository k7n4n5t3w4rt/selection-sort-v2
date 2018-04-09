// @flow
// Import React "as a namespace":
//   ~ https://flow.org/en/docs/react/types/
import * as React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

import registerServiceWorker from './registerServiceWorker'

const root = document.getElementById('root')

if (root) {
  ReactDOM.render(<App />, root)

  registerServiceWorker()
}
