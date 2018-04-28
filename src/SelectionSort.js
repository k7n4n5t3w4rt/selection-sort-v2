// @flow
// NEXT STEPS:
// [1] SelectionSort a class that inherits from React.Component
// [2] Use a life cycle hook to start the algorithm after the grid has rendered
// [3] When two items are swapped, update "a" in the store with an action and a reducer
// [4] Re-implement the unit tests - the Cypress tests should be fine

// -------------------------------------
// Packages
// -------------------------------------
import * as React from 'react'
import { connect } from 'react-redux'
// $FlowFixMe
import sizeMe from 'react-sizeme'
// import Rx from 'rxjs'
// -------------------------------------
// App
// -------------------------------------
import { updateGrid } from './redux/actions.js'
import Grid from './Grid.js'
import D from './services/gridService.js'
import sort from './services/selectionSort.js'

// -------------------------------------
// CSS
// -------------------------------------
import './SelectionSort.css'
// -------------------------------------
// Flow
// -------------------------------------
import type { GlobalState } from './redux/reducer.js'
import type { Cell } from './services/gridService.js'
type Props = {
  // These are coming from the store
  uiRows: number,
  uiCols: number,
  uiClick: number,
  uiGrid: Cell[][],
  a: number[],
  i: number[],
  // Coming from sizeMe
  size: {
    width: number,
    height: number
  },
  dispatch: any
}

// ====================================
// Component
// ====================================
class SelectionSort extends React.Component<Props> {
  componentDidMount = () => {
    const { uiRows, uiCols, uiClick, uiGrid, a, size, i } = this.props
    if (uiGrid === null) {
      const newGrid = D.gridFactory(
        a,
        size.width,
        size.height,
        uiCols,
        uiRows,
        uiClick
      )()
      this.props.dispatch(updateGrid(newGrid))
    }
  }

  componentDidUpdate = () => {
    const { uiClick, uiGrid, a, i } = this.props
    if (uiGrid !== null) {
      sort(uiClick, uiGrid, a, i, this.props.dispatch)
    }
  }
  render = () => {
    console.log('rendering...')
    const { uiGrid, uiClick } = this.props
    return (
      <Grid
        grid={uiGrid}
        click={uiClick}
        cellTransitionEnd={e => {
          // self.transitionEndEvents(e, this)
        }}
        className="selection-sort"
      />
    )
  }
}

// // -----------------------------------
// // [4] Repeat the process starting from the
// //     next cell
// // -----------------------------------
// // The hander for all `transitionend` events
// // from the animated cell swap
// const rawEventStream = Rx.Observable.create(obs => {
//   self.transitionEndEvents = (
//     e: SyntheticEvent<HTMLLIElement>,
//     component: React.Component<Props, State>
//   ): void => {
//     obs.next(e.currentTarget.id)
//   }
// })
// rawEventStream
//   // $FlowFixMe - Rx.operators
//   .pipe(Rx.operators.filter(id => id === '_' + self.state.i))
//   // $FlowFixMe - Rx.operators
//   .pipe(Rx.operators.distinctUntilChanged())
//   .subscribe(id => {
//     selectionSort(self)
//   })

const mapStateToProps = (state: GlobalState) => {
  return {
    uiRows: state.ui.rows,
    uiCols: state.ui.cols,
    uiClick: state.ui.click,
    uiGrid: state.ui.grid,
    a: state.data.a,
    i: state.data.i
  }
}

// const mapDispatchToProps = (state: GlobalState) => {
//   return {
//     // onTodoClick: id => {
//     //   dispatch(toggleTodo(id))
//     // }
//   }
// }

export default connect(mapStateToProps)(
  sizeMe({ monitorHeight: true })(SelectionSort)
)
