// @flow
// NEXT STEPS:
// [1] Get onTransitionEnd in place for the animated swap

// -------------------------------------
// Packages
// -------------------------------------
import * as React from 'react'
import sizeMe from 'react-sizeme'
import Rx from 'rxjs'
import qs from 'qs'
// -------------------------------------
// App
// -------------------------------------
import Grid from './Grid.js'
import D from './services/gridService.js'
// -------------------------------------
// CSS
// -------------------------------------
import './SelectionSort.css'
// -------------------------------------
// Flow
// -------------------------------------
import type { Cell } from './services/gridService.js'
type Props = {
  size: {
    width: number,
    height: number
  },
  click: number,
  cols: number,
  rows: number
}
type State = {
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

// ====================================
// Component
// ====================================
class SelectionSort extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    // Generate an array of random values between 0 and 1
    const a = arrayToSort(cols(props.cols), rows(props.rows))
    // Put a grid matrix of columns and rows into the state
    this.state = {
      i: 0,
      click: click(props.click),
      a: a,
      cols: cols(props.cols),
      rows: rows(props.rows),
      size: props.size,
      grid: D.gridFactory(
        a,
        props.size.width,
        props.size.height,
        cols(props.cols),
        rows(props.rows),
        click(props.click)
      )()
    }
    const self: any = this
    // The hander for all `transitionend` events from
    // the animated cell swwap
    const rawEventStream = Rx.Observable.create(obs => {
      self.transitionEndEvents = (
        e: SyntheticEvent<HTMLLIElement>,
        component: React.Component<Props, State>
      ): void => {
        obs.next(e.currentTarget.id)
      }
    })
    rawEventStream
      // $FlowFixMe
      .pipe(Rx.operators.filter(id => id === '_' + self.state.i))
      // $FlowFixMe
      .pipe(Rx.operators.distinctUntilChanged())
      .subscribe(id => {
        console.log(id)
        selectionSort(self)
      })
  }

  render = () => {
    const self: any = this
    const { click, grid } = this.state
    return (
      <Grid
        grid={grid}
        click={click}
        cellTransitionEnd={e => {
          self.transitionEndEvents(e, this)
        }}
        className="selection-sort"
      />
    )
  }

  componentWillMount() {
    selectionSort(this)
  }
}

// ====================================
// The Selection Sort algorithm
// ====================================
async function selectionSort(component: React.Component<Props, State>) {
  const { i, a, click, size, cols, rows } = component.state
  let { grid } = component.state
  // -----------------------------------
  // [0] Housekeeping
  // -----------------------------------
  // Return out if we have ordered the whole array
  if (i === a.length) {
    return true
  }
  // Reset the grid based on the data array
  grid = D.gridFactory(a, size.width, size.height, cols, rows, click)()
  component.setState({
    grid: grid
  })
  // -----------------------------------
  // [1] Next
  // -----------------------------------
  D.styleCellAsNext(grid, i, click, component)
  await D.wait(click)
  let minValue: number = a[i]
  // -----------------------------------
  // [2] Look ahead for the lightest cell in the
  //     remaining gaggle of unsorted cells
  // -----------------------------------
  const minIndex: number = await a.reduce(
    async (
      minIndexPromise: Promise<number>,
      currentValue: number,
      currentIndex: number
    ): Promise<number> => {
      // ...ignore everything up to i
      if (currentIndex < i) {
        return i
      }
      const minIndex: number = await minIndexPromise
      // // ...remove styling on the previously checked cell
      // if (currentIndex !== i && currentIndex - 1 !== minIndex) {
      //   D.styleCellAsNothing(grid, currentIndex - 1, click, component)
      // }
      // ...style this one as being checked
      if (currentIndex !== i) {
        D.styleCellAsChecking(grid, currentIndex, click, component)
        await D.wait(click)
      }
      // ...check this value against the current minValue
      if (currentIndex > minIndex && currentValue < minValue) {
        // ...remove styling on the previous min cell
        if (minIndex !== i) {
          D.styleCellAsNothing(grid, minIndex, click, component)
        }
        // ...style this one as min
        if (currentIndex !== i) {
          D.styleCellAsMin(grid, currentIndex, click, component)
        }
        minValue = currentValue
        return currentIndex
      } else {
        if (currentIndex !== i) {
          D.styleCellAsNothing(grid, currentIndex, click, component)
        }
        return minIndex
      }
    },
    Promise.resolve(i)
  )
  // -----------------------------------
  // [3] Swap the cells
  // -----------------------------------
  if (i !== minIndex) {
    const newA: number[] = swapArrayElements(a, i, minIndex)
    D.animateCellSwap(grid, i, minIndex, click, component)
    // D.animateCellSwap did the
    // animation but it didn't reset the
    // actual values on which the grid
    // is based - the array. We do that
    // now BUT we don't re-render the grid -
    // that happens in transitionEndEvents()
    // after the swap animation
    component.setState({
      a: newA,
      i: component.state.i + 1
    })
  } else {
    D.styleCellAsNothing(grid, i, click, component)
    component.setState({
      i: component.state.i + 1
    })
    selectionSort(component)
  }
  // -----------------------------------
  // [4] Repeat the process starting from the
  //     next cell
  // -----------------------------------
  // NOTE: selectionSort() is called when transitionEndEvents,
  // defined inside Rx.Observable.create() in the constructor,
  // hears the transitionEnd event as a cell finishes moving
  // OLD: selectionSort(component)
}

function swapArrayElements(a: number[], i: number, minIndex: number): number[] {
  console.log('a', a)
  const tmpValue: number = a[i]
  const newA: number[] = a.slice()
  newA[i] = newA[minIndex]
  newA[minIndex] = tmpValue
  console.log('a', a)
  console.log('newA', newA)
  return newA
}

function click(propsClick: number | typeof undefined) {
  const urlProps: Object = qs.parse(window.location.search.substring(1))
  // Set the `click` property  used for the basic selectionSort frequency
  if (urlProps.click) {
    return urlProps.click
  } else if (propsClick) {
    return propsClick
  } else {
    return 1000
  }
}

function cols(propsCols: number | typeof undefined) {
  const urlProps: Object = qs.parse(window.location.search.substring(1))
  if (urlProps.cols) {
    return urlProps.cols
  } else if (propsCols) {
    return propsCols
  } else {
    return 5
  }
}

function rows(propsRows: number | typeof undefined) {
  const urlProps: Object = qs.parse(window.location.search.substring(1))
  if (urlProps.rows) {
    return urlProps.rows
  } else if (propsRows) {
    return propsRows
  } else {
    return 5
  }
}

function arrayToSort(cols: number, rows: number): number[] {
  const a: number[] = []
  let randomNumber: number = 0
  const numItems: number = cols * rows
  for (let i = 0; i < numItems; i++) {
    randomNumber = Math.random()
    a.push(randomNumber)
  }
  return a
}

export default sizeMe({ monitorHeight: true })(SelectionSort)
