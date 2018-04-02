// @flow
// -------------------------------------------
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
export type ProtoCell = {
  value: number,
  className: string
}

// -------------------------------------------
function gridFactory(
  a: ProtoCell[],
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
      return row.map((protoCell, currentIndex) => {
        const x = currentIndex * cellWidth
        return {
          value: protoCell.value,
          id: '_' + currentIndex,
          width: cellWidth,
          height: cellHeight,
          y: y,
          x: x,
          className: protoCell.className,
          cssTransition: ''
        }
      })
    })
    return displayGrid
  }
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
    iCell.className = 'index-cell'
    minCell.x = iCellCopy.x
    minCell.y = iCellCopy.y
    minCell.cssTransition = cssTransition(click)
    minCell.className = 'min-cell'
  } else {
    // Just put a nice style on the index cell
    iCell.className = 'index-cell'
  }
  component.setState({ grid })
  return Promise.resolve(true)
}

function cssTransition(click: number): string {
  return `left ${click}ms ease-out, top ${click}ms ease-out`
}

// -------------------------------------------
function wait(click: number): Promise<void> {
  return new Promise(resolve => {
    window.setTimeoutZero(resolve, click)
  })
}

export default {
  gridFactory,
  animateCellSwap,
  wait
}

// -------------------------------------------
// 'private'
// -------------------------------------------
function cellCoordinatesFromArrayIndex(
  index: number,
  grid: Cell[][]
): { colIndex: number, rowIndex: number } {
  console.log('index', index)
  const rows = grid.length
  const cols = grid[0].length
  const rowIndex = index % (rows - 1)
  const colIndex = Math.floor(index / cols)
  return { colIndex, rowIndex }
}

function matrix(a: ProtoCell[], cols: number): ProtoCell[][] {
  return a.reduce(
    (grid, currentProtoCell, currentIndex) => {
      const lastIndex = grid.length - 1
      grid[lastIndex].push(currentProtoCell)
      if (!((currentIndex + 1) % cols)) {
        grid.push([])
      }
      return grid
    },
    [[]]
  )
}

// --------------------------------------------------
// FROM: https://dbaron.org/log/20100309-faster-timeouts
// --------------------------------------------------
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
