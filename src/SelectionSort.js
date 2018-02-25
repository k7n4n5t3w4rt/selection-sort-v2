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
type FinishCounter = {
  ALGORITHMS: [],
  COUNT: number
}
type Props = {
  size: {
    width: number,
    height: number
  },
  cols: number,
  rows: number,
  finishCounter?: FinishCounter,
  showWorking?: boolean,
  fps?: number,
  accelleration?: number,
  maxSecondsTransitionIinterval?: number,
  loop?: boolean,
  reloadInterval?: number,
  constantTransitionSpeed?: false
}
type State = {
  grid: Cell[][]
}
// -------------------------------------------
// Component
// -------------------------------------------
class SelectionSort extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      grid: gridService(
        arrayToSort(props.cols, props.rows),
        props.size.width,
        props.size.height,
        props.cols,
        props.rows
      )
    }
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({
        grid: gridService(
          arrayToSort(this.props.cols, this.props.rows),
          this.props.size.width,
          this.props.size.height,
          this.props.cols,
          this.props.rows
        )
      })
    }, 1000)
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
