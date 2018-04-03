// @flow
// -------------------------------------
// Flow
export type Cell = {
  value: number,
  id: string,
  width: number,
  height: number,
  x: number,
  y: number,
  className: string,
  cssTransition: string
}

// -------------------------------------
function gridFactory(
  a: number[],
  containerWidth: number,
  containerHeight: number,
  cols: number,
  rows: number,
  click: number
): () => Cell[][] {
  const cellWidth = containerWidth / parseInt(cols, 10)
  const cellHeight = containerHeight / parseInt(rows, 10)
  const grid = matrix(a, cols)
  return (): Cell[][] => {
    const displayGrid = grid.map((row, currentIndex) => {
      const y = currentIndex * cellHeight
      return row.map((value, currentIndex) => {
        const x = currentIndex * cellWidth
        return {
          value: value,
          id: '_' + currentIndex,
          width: cellWidth,
          height: cellHeight,
          y: y,
          x: x,
          className: '',
          cssTransition: ''
        }
      })
    })
    return displayGrid
  }
}

function styleCellAsNothing(
  grid: Cell[][],
  cellIndex: number,
  click: number,
  component: any
): Promise<boolean> {
  const coordinates = cellCoordinatesFromArrayIndex(cellIndex, grid)
  const cell = grid[coordinates.colIndex][coordinates.rowIndex]
  cell.className = ''
  component.setState({ grid })
  return Promise.resolve(true)
}

function styleCellAsNext(
  grid: Cell[][],
  cellIndex: number,
  click: number,
  component: any
): Promise<boolean> {
  const coordinates = cellCoordinatesFromArrayIndex(cellIndex, grid)
  const cell = grid[coordinates.colIndex][coordinates.rowIndex]
  cell.className = 'next-cell'
  component.setState({ grid })
  return Promise.resolve(true)
}

function styleCellAsChecking(
  grid: Cell[][],
  cellIndex: number,
  click: number,
  component: any
): Promise<boolean> {
  const coordinates = cellCoordinatesFromArrayIndex(cellIndex, grid)
  const cell = grid[coordinates.colIndex][coordinates.rowIndex]
  cell.className = 'checking-cell'
  component.setState({ grid })
  return Promise.resolve(true)
}

function styleCellAsMin(
  grid: Cell[][],
  cellIndex: number,
  click: number,
  component: any
): Promise<boolean> {
  const coordinates = cellCoordinatesFromArrayIndex(cellIndex, grid)
  const cell = grid[coordinates.colIndex][coordinates.rowIndex]
  cell.className = 'min-cell'
  component.setState({ grid })
  return Promise.resolve(true)
}

function animateCellSwap(
  grid: Cell[][],
  i: number,
  minIndex: number,
  click: number,
  component: any
): Promise<boolean> {
  const iCoordinates = cellCoordinatesFromArrayIndex(i, grid)
  const minCoordinates = cellCoordinatesFromArrayIndex(minIndex, grid)
  const iCell = grid[iCoordinates.colIndex][iCoordinates.rowIndex]
  const iCellCopy = Object.assign({}, iCell)
  const minCell = grid[minCoordinates.colIndex][minCoordinates.rowIndex]
  // Only do the swap if the index cell is not also
  // the minimum cell
  if (iCell.x !== minCell.x || iCell.y !== minCell.y) {
    iCell.x = minCell.x
    iCell.y = minCell.y
    iCell.cssTransition = cssTransition(click)
    minCell.x = iCellCopy.x
    minCell.y = iCellCopy.y
    minCell.cssTransition = cssTransition(click)
  }
  // Just a note for when I forget.
  // Changing the state here just sets
  // the values on grid cells in such a
  // way as to start the CSS transition.
  // The actual data aray is not changed
  // so next time the grid is rebuilt, it
  // will take the values from the actual
  // data array
  component.setState({ grid })
  return Promise.resolve(true)
}

function cssTransition(click: number): string {
  return `left ${click}ms ease-out, top ${click}ms ease-out`
}

// -------------------------------------
function wait(click: number): Promise<void> {
  return new Promise(resolve => {
    window.setTimeoutZero(resolve, click)
  })
}

export default {
  gridFactory,
  styleCellAsNothing,
  styleCellAsNext,
  styleCellAsChecking,
  styleCellAsMin,
  animateCellSwap,
  wait
}

// -------------------------------------
// 'private'
// -------------------------------------
function cellCoordinatesFromArrayIndex(
  index: number,
  grid: Cell[][]
): { colIndex: number, rowIndex: number } {
  const rows = grid.length
  const cols = grid[0].length
  const rowIndex = index % (rows - 1)
  const colIndex = Math.floor(index / cols)
  return { colIndex, rowIndex }
}

function matrix(a: number[], cols: number): number[][] {
  return a.reduce(
    (grid, currentValue, currentIndex) => {
      const lastIndex = grid.length - 1
      grid[lastIndex].push(currentValue)
      if (!((currentIndex + 1) % cols)) {
        grid.push([])
      }
      return grid
    },
    [[]]
  )
}

// --------------------------------------------
// FROM: https://dbaron.org/log/20100309-faster-timeouts
// --------------------------------------------
// Only add setZeroTimeout to the window object, and hide everything
// else in a closure.
;(function() {
  var timeouts = []
  var messageName = 'zero-timeout-message'

  function setTimeoutZero(fn, click) {
    if (click) {
      setTimeout(fn, click)
    } else {
      timeouts.push(fn)
      window.postMessage(messageName, '*')
    }
  }

  function handleMessage(event) {
    if (event.source === window && event.data === messageName) {
      event.stopPropagation()
      if (timeouts.length > 0) {
        var fn = timeouts.shift()
        fn()
      }
    }
  }

  window.addEventListener('message', handleMessage, true)

  // Add the one thing we want added to the window object.
  window.setTimeoutZero = setTimeoutZero
})()
