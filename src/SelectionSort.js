// @flow
// NEXT STEPS:
// [1] Make SelectionSort inherit from React.Component
// [2] Use a life cycle hook to start the algorithm after the grid has rendered
// [3] When two items are swapped, update "a" in the store with an action and a reducer
// [4] Re-implement the unit tests - the Cypress tests should be fine

// -------------------------------------
// Packages
// -------------------------------------
import * as React from 'react'
import { connect } from 'react-redux'
import sizeMe from 'react-sizeme'
// import Rx from 'rxjs'
// -------------------------------------
// App
// -------------------------------------
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
  // Coming from sizeMe
  size: {
    width: number,
    height: number
  }
}

// ====================================
// Component
// ====================================
function SelectionSort(props: Props, context: any) {
  const instance = Object.create(React.Component.prototype)
  instance.props = props
  instance.context = context
  // ---
  // "The reason why Flow rejects this code is because we take
  // class methods to be readonly.At runtime, they are read / write,
  // but the readonly assumption is extremely convenient in that it
  // allows subclasses to override methods covariantly, which is an
  // even more common pattern than rebinding."
  // https://github.com/facebook/flow/issues/1397
  // $FlowFixMe
  instance.componentDidMount = () => {
    sort(context.store)
  }
  // ---
  // "The reason why Flow rejects this code is because we take
  // class methods to be readonly.At runtime, they are read / write,
  // but the readonly assumption is extremely convenient in that it
  // allows subclasses to override methods covariantly, which is an
  // even more common pattern than rebinding."
  // https://github.com/facebook/flow/issues/1397
  // $FlowFixMe
  instance.render = () => {
    const { uiRows, uiCols, uiClick, uiGrid, a, size } = props
    const grid =
      uiGrid ||
      D.gridFactory(a, size.width, size.height, uiCols, uiRows, uiClick)()
    return (
      <Grid
        grid={grid}
        click={uiClick}
        cellTransitionEnd={e => {
          // self.transitionEndEvents(e, this)
        }}
        className="selection-sort"
      />
    )
  }
  // ---

  return instance
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
    a: state.data.a
  }
}

const mapDispatchToProps = (state: GlobalState) => {
  return {
    // onTodoClick: id => {
    //   dispatch(toggleTodo(id))
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  sizeMe({ monitorHeight: true })(SelectionSort)
)
