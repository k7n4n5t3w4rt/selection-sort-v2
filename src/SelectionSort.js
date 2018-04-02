// @flow
// NEXT STEPS:
// [1] Get onTransitionEnd in place for the animated swap

// -------------------------------------------
// Packages
// -------------------------------------------
import * as React from 'react'
import sizeMe from 'react-sizeme'
import qs from 'qs'
// -------------------------------------------
// App
// -------------------------------------------
import Grid from './Grid.js'
import D from './services/gridService.js'
// -------------------------------------------
// CSS
// -------------------------------------------
import './SelectionSort.css'
// -------------------------------------------
// Flow
// -------------------------------------------
import type { Cell } from './services/gridService.js'
import type { ProtoCell } from './services/gridService.js'
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
  a: ProtoCell[],
  cols: number,
  rows: number,
  size: {
    width: number,
    height: number
  },
  grid: Cell[][]
}

// ====================================================
// Component
// ====================================================
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
  }

  render = () => {
    const { click, grid } = this.state
    return <Grid grid={grid} click={click} className="selection-sort" />
  }

  componentWillMount() {
    selectionSort(this)
  }
}

// ====================================================
// The Selection Sort algorithm
// ====================================================
async function selectionSort(component: React.Component<Props, State>) {
  const { i, a, click, size, cols, rows, grid } = component.state
  // Return out if we have ordered the whole array
  if (i === a.length) {
    return true
  }
  // -----------------------------------------
  // [1] Next
  // -----------------------------------------
  D.styleCellAsNext(grid, i, click, component)
  await D.wait(click)
  let minValue: number = a[i].value
  // -----------------------------------------
  // [2] Look ahead for the lightest cell in the
  //     remaining gaggle of unsorted cells
  // -----------------------------------------
  const minIndex: number = await a.reduce(
    async (
      minIndexPromise: Promise<number>,
      currentProtoCell: ProtoCell,
      currentIndex: number
    ): Promise<number> => {
      // ...ignore everything up to i
      if (currentIndex < i) {
        return i
      }
      const minIndex: number = await minIndexPromise
      // ...remove styling on the previously checked cell
      if (currentIndex !== i && currentIndex - 1 !== minIndex) {
        D.styleCellAsNothing(grid, currentIndex - 1, click, component)
      }
      // ...style this one as being checked
      if (currentIndex !== i) {
        D.styleCellAsChecking(grid, currentIndex, click, component)
        await D.wait(click)
      }
      // ...check this value against the current minValue
      if (currentIndex > minIndex && currentProtoCell.value < minValue) {
        // ...remove styling on the previous min cell
        if (minIndex !== i) {
          D.styleCellAsNothing(grid, minIndex, click, component)
        }
        // ...style this one as min
        if (currentIndex !== i) {
          D.styleCellAsMin(grid, currentIndex, click, component)
          await D.wait(click)
        }
        minValue = currentProtoCell.value
        return currentIndex
      } else {
        return minIndex
      }
    },
    Promise.resolve(i)
  )
  // -----------------------------------------
  // [3] Swap the cells
  // -----------------------------------------
  const newA: ProtoCell[] = swapArrayElements(a, i, minIndex)
  D.animateCellSwap(grid, i, minIndex, click, component)
  // A temporary hack
  await D.wait(click)
  component.setState({
    grid: D.gridFactory(newA, size.width, size.height, cols, rows, click)()
  })
  component.state.a = newA
  // -----------------------------------------
  // [4] Repeat the process starting from the
  //     next cell
  // -----------------------------------------
  ++component.state.i
  selectionSort(component)
}

// -------------------------------------------
function swapArrayElements(
  a: ProtoCell[],
  i: number,
  minIndex: number
): ProtoCell[] {
  const tmpValue: number = a[i].value
  const newA: ProtoCell[] = [...a]
  newA[i].value = newA[minIndex].value
  newA[minIndex].value = tmpValue
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

function arrayToSort(cols: number, rows: number): ProtoCell[] {
  const a: ProtoCell[] = []
  let randomNumber: number = 0
  const numItems: number = cols * rows
  for (let i = 0; i < numItems; i++) {
    randomNumber = Math.random()
    a.push({ value: randomNumber, className: 'normal-cell' })
  }
  return a
}

export default sizeMe({ monitorHeight: true })(SelectionSort)
