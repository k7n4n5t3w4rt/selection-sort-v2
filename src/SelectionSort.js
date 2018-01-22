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
  containerId: string,
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
      <div id={this.props.containerId} className="viz selection-sort"></div>
    )
  }

  componentDidMount = () => {
    // Config
    const selectionConf = {
      CONTAINER_ID: this.props.containerId,
      SHOW_WORKING: true,
      FPS: 10,
      ACCELLERATION: 1,
      MAX_SECONDS_TRANSITION_INTERVAL: 2,
      COLS: 4,
      ROWS: 4,
      LOOP: true,
      RELOAD_INTERVAL: 2000,
      CONSTANT_TRANSITION_SPEED: false,
      FINISH_COUNTER: this.props.finishCounter,
    }
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