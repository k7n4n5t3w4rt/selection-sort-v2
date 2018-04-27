import D from './services/gridService.js'

// ====================================
// The Selection Sort algorithm
// ====================================
async function selectionSort(store) {
  const { i, a, click, size, cols, rows } = store.getState()
  let { grid } = store.getState()
  // -----------------------------------
  // [0] Housekeeping
  // -----------------------------------
  // Return out if we have ordered the whole array
  if (i === a.length) {
    return true
  }
  // Reset the grid based on the data array
  grid = D.gridFactory(a, size.width, size.height, cols, rows, click)()
  // MAKE THIS AN ACTION AND REDUCER
  // store.dispatch.setState({
  //   grid: grid
  // })
  // -----------------------------------
  // [1] Next
  // -----------------------------------
  D.styleCellAsNext(grid, i, click, store.dispatch)
  await D.wait(click)
  let minValue: number = a[i]
  // -----------------------------------
  // [2] Look ahead for the lightest cell in the
  //     remaining gaggle of unsorted cells
  // -----------------------------------
  const minIndex: number = await a.reduce(
    async (
      minIndexPromise: Promise<number>,
      currentValue: number,
      currentIndex: number
    ): Promise<number> => {
      // ...ignore everything up to i
      if (currentIndex < i) {
        return i
      }
      const minIndex: number = await minIndexPromise
      // // ...remove styling on the previously checked cell
      // if (currentIndex !== i && currentIndex - 1 !== minIndex) {
      //   D.styleCellAsNothing(grid, currentIndex - 1, click, store.dispatch)
      // }
      // ...style this one as being checked
      if (currentIndex !== i) {
        D.styleCellAsChecking(grid, currentIndex, click, store.dispatch)
        await D.wait(click)
      }
      // ...check this value against the current minValue
      if (currentIndex > minIndex && currentValue < minValue) {
        // ...remove styling on the previous min cell
        if (minIndex !== i) {
          D.styleCellAsNothing(grid, minIndex, click, store.dispatch)
        }
        // ...style this one as min
        if (currentIndex !== i) {
          D.styleCellAsMin(grid, currentIndex, click, store.dispatch)
        }
        minValue = currentValue
        return currentIndex
      } else {
        if (currentIndex !== i) {
          D.styleCellAsNothing(grid, currentIndex, click, store.dispatch)
        }
        return minIndex
      }
    },
    Promise.resolve(i)
  )
  // -----------------------------------
  // [3] Swap the cells
  // -----------------------------------
  if (i !== minIndex) {
    const newA: number[] = swapArrayElements(a, i, minIndex)
    D.animateCellSwap(grid, i, minIndex, click, store.dispatch)
    // D.animateCellSwap did the
    // animation but it didn't reset the
    // actual values on which the grid
    // is based - the array. We do that
    // now BUT we don't re-render the grid -
    // that happens in transitionEndEvents()
    // after the swap animation
    // DISPATCH AN ACTION
    // store.dispatch.setState({
    //   a: newA,
    //   i: store.dispatch.state.i + 1
    // })
  } else {
    D.styleCellAsNothing(grid, i, click, store.dispatch)
    // DISPATCH AN ACTION
    // store.dispatch.setState({
    //   i: store.dispatch.state.i + 1
    // })
    selectionSort(store)
  }
  // -----------------------------------
  // [4] Repeat the process starting from the
  //     next cell
  // -----------------------------------
  // NOTE: selectionSort() is called when transitionEndEvents,
  // defined inside Rx.Observable.create() in the constructor,
  // hears the transitionEnd event as a cell finishes moving
  // OLD: selectionSort(store.dispatch)
}

export function swapArrayElements(
  a: number[],
  i: number,
  minIndex: number
): number[] {
  const tmpValue: number = a[i]
  const newA: number[] = a.slice()
  newA[i] = newA[minIndex]
  newA[minIndex] = tmpValue
  return newA
}

module.exports = selectionSort
