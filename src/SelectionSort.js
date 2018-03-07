// @flow
// NEXT STEPS:
// [1] Change self.a so it can hold the state of each item
//     such that it can flow through to the Grid display, eg:
//
//       type a = {
//         value: number,
//         className: string
//       }[]
//
// [2] Grid uses the a[n].className property to set a CSS class on the cell

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
  y: number,
  className: string
}
type ProtoCell = {
  value: number,
  className: string
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
    const urlProps: Object = qs.parse(window.location.search.substring(1))
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
      let minValue: number = self.a[self.i].value

      const minIndex: number = await self.a.reduce(
        async (
          minIndexPromise: Promise<number>,
          currentProtoCell: ProtoCell,
          currentIndex: number
        ): Promise<number> => {
          const minIndex: number = await minIndexPromise
          // await D.wait(self.click)
          if (currentIndex > minIndex && currentProtoCell.value < minValue) {
            minValue = currentProtoCell.value
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
        const newA: ProtoCell[] = swapArrayElements(self.a, self.i, minIndex)
        updateDisplay(newA)
        self.a = newA
      }
      ++self.i
      loop()
    }
    // -------------------------------------------
    function updateDisplay(newA: ProtoCell[]): mixed {
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
    loop()
  }
  // -------------------------------------------
  componentWillUnmount() {
    const self: Object = this
    clearInterval(self.loopTimer)
  }
}

function arrayToSort(cols: number, rows: number): ProtoCell[] {
  const a: ProtoCell[] = []
  let randomNumber: number = 0
  const numItems: number = cols * rows
  for (let i = 0; i < numItems; i++) {
    randomNumber = Math.random()
    a.push({ value: randomNumber, className: 'normalCell' })
  }
  return a
}

export default sizeMe({ monitorHeight: true })(SelectionSort)
