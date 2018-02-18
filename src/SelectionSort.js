// @flow
import * as React from 'react'
import sizeMe from 'react-sizeme'
import Grid from './Grid.js'
// import { selectionSort } from './selection-sort/index.js'
// CSS
import './SelectionSort.css'
import './grid-display/main.css'
import './grid-display/font-awesome/css/font-awesome.min.css'
// Flow
type Cell = {
  value: number,
  id?: string,
  x?: number,
  y?: number
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
  a: Cell[]
}

class SelectionSort extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      a: makeArrayToSort(props.cols, props.rows)
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.updateStateArrayAndRender(
        makeArrayToSort(this.props.cols, this.props.rows)
      )
    }, 50)
  }

  updateStateArrayAndRender(a: Cell[]): mixed {
    this.setState({
      a
    })
  }

  render = () => {
    const displayProps = {
      a: this.state.a,
      updateArray: this.updateStateArrayAndRender,
      containerWidth: this.props.size.width,
      containerHeight: this.props.size.height,
      cols: this.props.cols,
      rows: this.props.rows
    }
    // SHOW_WORKING: props.showWorking || true,
    // FPS: props.fps || 10,
    // ACCELLERATION: props.accelleration || 1,
    // MAX_SECONDS_TRANSITION_INTERVAL: props.maxSecondsTransitionIinterval || 2,
    // LOOP: props.loop || true,
    // RELOAD_INTERVAL: props.reloadInterval || 2000,
    // CONSTANT_TRANSITION_SPEED: props.constantTransitionSpeed || false
    return (
      <Grid
        {...displayProps}
        style={{
          display: 'block',
          width: '100%',
          height: '100%'
        }}
      />
    )
  }
}

function makeArrayToSort(cols: number, rows: number): Cell[] {
  const a = []
  let randomNumber = 0
  const numItems = cols * rows
  for (let i = 0; i < numItems; i++) {
    randomNumber = Math.random()
    a.push({
      value: randomNumber
    })
  }
  return a
}

export default sizeMe({ monitorHeight: true })(SelectionSort)
