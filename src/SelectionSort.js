// @flow

import React, { Component } from 'react'
// JS: Make these proper npm package imports
import { selectionSortFactory } from './selection-sort/index.js'
import { gridDisplay } from './grid-display/index.js'
// CSS
import './SelectionSort.css'
import './grid-display/main.css'
import './grid-display/font-awesome/css/font-awesome.min.css'

// NOTE: the actual type of ALGORITHMS and COUNT don't have any effect
/*::
type Props = {
  finishCounter: {
    ALGORITHMS: Array<Object>,
    COUNT: number
  }
}
*/
class SelectionSort extends Component<Props> { // Can't work out comment syntax for <Props>
  props /*: Props */
  render = () => {
    return (
      <div id="selection-sort" className="viz"></div>
    )
  }

  componentDidMount = () => {
    // Config
    const selectionConf = {
      FPS: 10,
      MAX_SECONDS_TRANSITION_INTERVAL: 2,
      COLS: 4,
      ROWS: 4,
      SHOW_WORKING: true,
      LOOP: true,
      RELOAD_INTERVAL: 2000,
      CONSTANT_TRANSITION_SPEED: false,
      FINISH_COUNTER: this.props.finishCounter,
      CONTAINER_ID: 'selection-sort'
    }

    console.log('SelectionSort.conponentDidMount', this.props.finishCounter)
    // --------------------------------- //
    // SELECTION SORT
    // --------------------------------- //
    const selectionSort = selectionSortFactory(selectionConf, gridDisplay)
    // I shouldn't, but I am. Adding this algorithm  to the FINISH_COUNTER.ALGORITHMS prop
    selectionConf.FINISH_COUNTER.ALGORITHMS.push(selectionSort)
    selectionSort.run()
  }
}

export default SelectionSort
