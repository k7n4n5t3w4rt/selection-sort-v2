import React from 'react'
import ReactDOM from 'react-dom'
import './reset.css'
import './index.css'
import SelectionSort from './SelectionSort.js'
import registerServiceWorker from './registerServiceWorker'
ReactDOM.render(
  <SelectionSort cols="10" rows="10" click="250" />,
  document.getElementById('root')
)
registerServiceWorker()
