// @flow
// -------------------------------------------
// Flow
type Cell = {
  value: number,
  id: string,
  width: number,
  height: number,
  x: number,
  y: number
}

// -------------------------------------------
function gridFactory(
  a: number[],
  containerWidth: number,
  containerHeight: number,
  cols: number,
  rows: number
): () => Cell[][] {
  const cellWidth = containerWidth / parseInt(cols, 10)
  const cellHeight = containerHeight / parseInt(rows, 10)
  const grid = matrix(a, cols)
  return (): Cell[][] => {
    const displayGrid = grid.map((row, currentIndex) => {
      const y = currentIndex * cellHeight
      return row.map((value, currentIndex) => {
        return {
          value,
          id: '_' + currentIndex,
          width: cellWidth,
          height: cellHeight,
          y: y,
          x: currentIndex * cellWidth
        }
      })
    })
    return displayGrid
  }
}

// -------------------------------------------
function wait(click: number): Promise<void> {
  return new Promise(resolve => {
    window.setTimeoutZero(resolve, click)
  })
}

export default {
  gridFactory,
  wait
}

// -------------------------------------------
// 'private'
// -------------------------------------------
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
