import React from 'react'
import ReactDOM from 'react-dom'
import './reset.css'
import './index.css'
import SelectionSort from './SelectionSort.js'
import registerServiceWorker from './registerServiceWorker'
ReactDOM.render(
  <SelectionSort cols="3" rows="3" click="500" />,
  document.getElementById('root')
)
registerServiceWorker()
