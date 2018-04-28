import D from './gridService.js'

// ====================================
// The Selection Sort algorithm
// ====================================
export default (async function selectionSort(uiClick, uiGrid, a, i, dispatch) {
  // -----------------------------------
  // [0] Housekeeping
  // -----------------------------------
  // Return out if we have ordered the whole array
  if (i === a.length) {
    return true
  }
  // MAKE THIS AN ACTION AND REDUCER
  // dispatch.setState({
  //   grid: grid
  // })
  // -----------------------------------
  // [1] Next
  // -----------------------------------
  D.styleCellAsNext(uiGrid, i, uiClick, dispatch)
  await D.wait(uiClick)
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
      //   D.styleCellAsNothing(grid, currentIndex - 1, uiClick, dispatch)
      // }
      // ...style this one as being checked
      if (currentIndex !== i) {
        D.styleCellAsChecking(uiGrid, currentIndex, uiClick, dispatch)
        await D.wait(uiClick)
      }
      // ...check this value against the current minValue
      if (currentIndex > minIndex && currentValue < minValue) {
        // ...remove styling on the previous min cell
        if (minIndex !== i) {
          D.styleCellAsNothing(uiGrid, minIndex, uiClick, dispatch)
        }
        // ...style this one as min
        if (currentIndex !== i) {
          D.styleCellAsMin(uiGrid, currentIndex, uiClick, dispatch)
        }
        minValue = currentValue
        return currentIndex
      } else {
        if (currentIndex !== i) {
          D.styleCellAsNothing(uiGrid, currentIndex, uiClick, dispatch)
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
    D.animateCellSwap(uiGrid, i, minIndex, uiClick, dispatch)
    // D.animateCellSwap did the
    // animation but it didn't reset the
    // actual values on which the grid
    // is based - the array. We do that
    // now BUT we don't re-render the grid -
    // that happens in transitionEndEvents()
    // after the swap animation
    // DISPATCH AN ACTION
    // dispatch.setState({
    //   a: newA,
    //   i: dispatch.state.i + 1
    // })
  } else {
    D.styleCellAsNothing(uiGrid, i, uiClick, dispatch)
    // DISPATCH AN ACTION
    // dispatch.setState({
    //   i: dispatch.state.i + 1
    // })
    // I DON'T THINK I SHOULD BE CALLING selectionSort MANUALLY EVER... selectionSort(uiClick, uiGrid, a, i, dispatch)
  }
  // -----------------------------------
  // [4] Repeat the process starting from the
  //     next cell
  // -----------------------------------
  // NOTE: selectionSort() is called when transitionEndEvents,
  // defined inside Rx.Observable.create() in the constructor,
  // hears the transitionEnd event as a cell finishes moving
  // OLD: selectionSort(dispatch)
})

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
