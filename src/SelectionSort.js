// @flow
// NEXT STEPS:
// [1] Change self.a so it can hold the state of each item
//     so it can flow through to the Grid display, eg:
//
//       type a = {
//         value: number,
//         state: string
//       }[]
//
// [2] Grid uses the a[n].state property to set a CSS class on the cell

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
type State = {
  grid: Cell[][]
}

// ====================================================
class SelectionSort extends React.Component<Props, State> {
  // -------------------------------------------
  constructor(props: Props) {
    super(props)
    const self: Object = this
    self.i = 0
    const urlProps = qs.parse(window.location.search.substring(1))
    // Set the `click` property  used for the basic loop frequency
    if (urlProps.click) {
      self.click = urlProps.click
    } else if (props.click) {
      self.click = props.click
    } else {
      self.click = 1000
    }
    // Set the `cols` property
    if (urlProps.cols) {
      self.cols = urlProps.cols
    } else if (props.cols) {
      self.cols = props.cols
    } else {
      self.cols = 1000
    }
    // Set the `rows` property
    if (urlProps.rows) {
      self.rows = urlProps.rows
    } else if (props.rows) {
      self.rows = props.rows
    } else {
      self.rows = 1000
    }
    // Generate an array of random values between 0 and 1
    self.a = arrayToSort(self.cols, self.rows)
    // Put a grid matrix of columns and rows into the state
    this.state = {
      grid: D.gridFactory(
        self.a,
        props.size.width,
        props.size.height,
        self.cols,
        self.rows
      )()
    }
  }
  // -------------------------------------------
  render = () => {
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
  // -------------------------------------------
  componentWillMount() {
    const self: Object = this
    // -------------------------------------------
    async function loop() {
      // Return out if we have ordered the whole array
      if (self.i === self.a.length) {
        return true
      }
      await D.wait(self.click)
      let minValue = self.a[self.i]

      const minIndex = await self.a.reduce(
        async (
          minIndexPromise: Promise<number>,
          currentValue: number,
          currentIndex: number
        ): Promise<number> => {
          const minIndex = await minIndexPromise
          // await D.wait(self.click)
          if (currentIndex > minIndex && currentValue < minValue) {
            minValue = currentValue
            return currentIndex
          } else {
            return minIndex
          }
        },
        Promise.resolve(self.i)
      )
      // If this one is already in the right
      // position do nothing
      if (self.i !== minIndex) {
        const newA = swapArrayElements(self.a, self.i, minIndex)
        updateDisplay(newA)
        self.a = newA
      }
      ++self.i
      loop()
    }
    // -------------------------------------------
    function updateDisplay(newA: number[]) {
      // body
      self.setState({
        grid: D.gridFactory(
          newA,
          self.props.size.width,
          self.props.size.height,
          self.cols,
          self.rows
        )()
      })
    }
    // -------------------------------------------
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
    loop()
  }
  // -------------------------------------------
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
