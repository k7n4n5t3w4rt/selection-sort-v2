// @flow
// NEXT STEPS:
// [1] Grid uses the a[n].className property to set a CSS class on the cell

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
  grid: Cell[][]
}

type SelectionSortWithMemberVariables = {
  i: number,
  a: ProtoCell[]
} & Props &
  State &
  React.Component<Props, State>

// ====================================================
// Component
// ====================================================
class SelectionSort extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const self: Object = this
    self.i = 0
    self.click = click(props.click)
    self.cols = cols(props.cols)
    self.rows = rows(props.rows)
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

  render = () => {
    return <Grid grid={this.state.grid} className="selection-sort" />
  }

  componentWillMount() {
    // I have to make a copy of `this` and use it
    // when assigning new member variables or flow
    // chucks a spaz. I'll probably be refactoring
    // this out when I add redux
    const self: Object = this
    selectionSort(self)
  }
}

async function selectionSort(component: SelectionSortWithMemberVariables) {
  // Return out if we have ordered the whole array
  if (component.i === component.a.length) {
    return true
  }
  await D.wait(component.click)
  let minValue: number = component.a[component.i].value
  const minIndex: number = await component.a.reduce(
    async (
      minIndexPromise: Promise<number>,
      currentProtoCell: ProtoCell,
      currentIndex: number
    ): Promise<number> => {
      const minIndex: number = await minIndexPromise
      // await D.wait(component.click)
      if (currentIndex > minIndex && currentProtoCell.value < minValue) {
        minValue = currentProtoCell.value
        return currentIndex
      } else {
        return minIndex
      }
    },
    Promise.resolve(component.i)
  )
  // If this one is already in the right
  // position do nothing
  if (component.i !== minIndex) {
    const newA: ProtoCell[] = swapArrayElements(
      component.a,
      component.i,
      minIndex
    )
    updateDisplay(component, newA)
    component.a = newA
  }
  ++component.i
  selectionSort(component)
}

function updateDisplay(
  component: SelectionSortWithMemberVariables,
  newA: ProtoCell[]
): mixed {
  // body
  component.setState({
    grid: D.gridFactory(
      newA,
      component.props.size.width,
      component.props.size.height,
      component.cols,
      component.rows
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
    return 1000
  }
}

function rows(propsRows: number | typeof undefined) {
  const urlProps: Object = qs.parse(window.location.search.substring(1))
  if (urlProps.rows) {
    return urlProps.rows
  } else if (propsRows) {
    return propsRows
  } else {
    return 1000
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
