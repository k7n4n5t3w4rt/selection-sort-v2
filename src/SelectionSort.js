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
  grid: Cell[][]
}
// -------------------------------------------
// Component
// -------------------------------------------
class SelectionSort extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const self: Object = this
    self.i = 0
    if (props.click) {
      self.click = props.click
    } else {
      self.click = 1000
    }
    self.a = arrayToSort(props.cols, props.rows)
    this.state = {
      grid: gridService(
        self.a,
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
  componentWillMount() {
    const self: Object = this
    self.loopTimer = setInterval(() => {
      const minIndex = findMinIndex(self.a, self.i)
      // If this one is already in the right
      // position do nothing
      if (self.i !== minIndex) {
        const newA = swapArrayElements(self.a, self.i, minIndex)
        this.setState({
          grid: gridService(
            newA,
            this.props.size.width,
            this.props.size.height,
            this.props.cols,
            this.props.rows
          )
        })
        self.a = newA
      }
      ++self.i
    }, self.click)

    function findMinIndex(a: number[], j: number): number {
      let minValue = a[j]
      return a.reduce(
        (
          minIndex: number,
          currentValue: number,
          currentIndex: number
        ): number => {
          if (currentIndex > minIndex && currentValue < minValue) {
            minValue = currentValue
            return currentIndex
          } else {
            return minIndex
          }
        },
        j
      )
    }

    function swapArrayElements(
      a: number[],
      i: number,
      minIndex: number
    ): number[] {
      const tmpValue = a[i]
      const newA = [...a]
      newA[i] = newA[minIndex]
      newA[minIndex] = tmpValue
      return newA
    }
  }
  componentWillUnmount() {
    const self: Object = this
    clearInterval(self.loopTimer)
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
