//@flow

import React, { Component } from 'react';
// JS: Make these proper npm package imports
import { selectionSortFactory } from './selection-sort/index.js'
import { gridDisplay } from './grid-display/index.js'
// CSS
import './App.css';
import './grid-display/main.css';
import './grid-display/font-awesome/css/font-awesome.min.css';

class SelectionSort extends Component {
  render = () => {
    return (
     <div id="selection-sort" className="viz"></div>
    );
  }

  // Config
 selectionConf = {
    FPS: 10,
    MAX_SECONDS_TRANSITION_INTERVAL: 2,
    COLS: 4,
    ROWS: 4,
    SHOW_WORKING: false,
    LOOP: true,
    RELOAD_INTERVAL: 2000,
    CONSTANT_TRANSITION_SPEED: false,
    FINISH_COUNTER: {
      ALGORITHMS: [],
      COUNT: 0
    },
    CONTAINER_ID: 'selection-sort'
  }
  componentDidMount = () => {

    // --------------------------------- //
    // SELECTION SORT
    // --------------------------------- //
    const selectionSort = selectionSortFactory(this.selectionConf, gridDisplay)
    this.selectionConf.FINISH_COUNTER.ALGORITHMS.push(selectionSort)
    selectionSort.run()
  }
}

export default SelectionSort;
