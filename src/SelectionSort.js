// @flow
// -------------------------------------------
// Packages
// -------------------------------------------
import * as React from 'react'
import sizeMe from 'react-sizeme'
// -------------------------------------------
// SelectionSort
// -------------------------------------------
import Grid from './Grid.js'
import gridService from './services/gridService.js'
// -------------------------------------------
// CSS
// -------------------------------------------
import './SelectionSort.css'
// -------------------------------------------
// Flow
// -------------------------------------------
type Cell = {
  value: number,
  id: string,
  width: number,
  height: number,
  x: number,
  y: number
}
type Props = {
  size: {
    width: number,
    height: number
  },
  cols: number,
  rows: number
}
// showWorking?: boolean,
// fps?: number,
// accelleration?: number,
// maxSecondsTransitionIinterval?: number,
// loop?: boolean,
// reloadInterval?: number,
// constantTransitionSpeed?: false
type State = {
  a: number[],
  grid: Cell[][]
}
// -------------------------------------------
// Component
// -------------------------------------------
class SelectionSort extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const a = arrayToSort(props.cols, props.rows)
    this.state = {
      a,
      grid: gridService(
        a,
        props.size.width,
        props.size.height,
        props.cols,
        props.rows
      )
    }
  }
  render = () => {
    // SHOW_WORKING: props.showWorking || true,
    // FPS: props.fps || 10,
    // ACCELLERATION: props.accelleration || 1,
    // MAX_SECONDS_TRANSITION_INTERVAL: props.maxSecondsTransitionIinterval || 2,
    // LOOP: props.loop || true,
    // RELOAD_INTERVAL: props.reloadInterval || 2000,
    // CONSTANT_TRANSITION_SPEED: props.constantTransitionSpeed || false
    return (
      <Grid
        grid={this.state.grid}
        style={{
          display: 'block',
          width: '100%',
          height: '100%'
        }}
      />
    )
  }
  componentDidMount() {
    function loop(a: number[], i: number): null | void {
      const minIndex = findMinIndex(a, i)
      // If this one is already in the right position
      // jump to the next cell and return out
      if (minIndex === i) {
        skipToNextLoop(a, i, minIndex)
        return null
      }
      const newA = swapArrayElements(a, i, minIndex)
      this.setState
      loop(a, i)
    }

    function skipToNextLoop(a: number[], i: number, minIndex: number): void {
      loop(a, ++i)
    }

    function findMinIndex(a: number[], j: number): number {
      let minValue = a[j]
      let minIndex = j
      for (; j <= a.length; ++j) {
        if (j === a.length) {
          return minIndex
        } else if (a[j] < minValue) {
          minValue = a[j]
          minIndex = j
        }
      }
      return minIndex
    }

    function swapArrayElements(
      a: number[],
      i: number,
      minIndex: number
    ): number[] {
      const tmpValue = a[i]
      a[i] = a[minIndex]
      a[minIndex] = tmpValue
      return a
    }
    loop(this.state.a, 0)
  }
}

function arrayToSort(cols: number, rows: number): number[] {
  const a = []
  let randomNumber = 0
  const numItems = cols * rows
  for (let i = 0; i < numItems; i++) {
    randomNumber = Math.random()
    a.push(randomNumber)
  }
  return a
}

export default sizeMe({ monitorHeight: true })(SelectionSort)
