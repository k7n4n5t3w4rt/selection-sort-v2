// @flow
import * as React from 'react'
// import D from './grid-display/index.js'
// import Rx from 'rxjs/Rx.js'
// CSS
import './grid-display/main.css'
import './grid-display/font-awesome/css/font-awesome.min.css'
// Flow
type Cell = {
  value: number,
  id?: string,
  x?: number,
  y?: number
}
type Props = {
  a: Cell[],
  containerWidth: number,
  containerHeight: number,
  cols: number,
  rows: number
}
// type FinishCounter = {
//   ALGORITHMS: [],
//   COUNT: number
// }
// SHOW_WORKING: boolean,
// FPS: number,
// ACCELLERATION: number,
// MAX_SECONDS_TRANSITION_INTERVAL: number,
// LOOP: boolean,
// RELOAD_INTERVAL: number,
// CONSTANT_TRANSITION_SPEED: boolean,
// FINISH_COUNTER: FinishCounter
function Grid({ a, containerWidth, containerHeight, cols, rows }: Props) {
  const cellWidth = containerWidth / parseInt(cols, 10)
  const cellHeight = containerHeight / parseInt(rows, 10)
  const matrix = getMatrix(a, cols)
  const matrixXY = getMatrixXYValues(matrix, cellWidth, cellHeight)

  return (
    <ul>
      {matrixXY.map(row => {
        return row.map((cell, i) => {
          const cellColour = 255 - Math.ceil(255 * cell.value)
          const cellStyle = {
            background: `rgb(${cellColour},${cellColour},${cellColour})`,
            width: cellWidth.toString() + 'px',
            height: cellHeight.toString() + 'px',
            top: cell.y ? cell.y.toString() + 'px' : 0 + 'px',
            left: cell.x ? cell.x.toString() + 'px' : 0 + 'px'
          }
          return <li key={i} style={cellStyle} />
        })
      })}
    </ul>
  )
}

function getMatrix(a: Cell[], cols: number): Cell[][] {
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

function getMatrixXYValues(
  matrix: Cell[][],
  cellWidth: number,
  cellHeight: number
): Cell[][] {
  return matrix.map((row, currentIndex) => {
    const y = currentIndex * cellHeight
    return row.map((cell, currentIndex) => {
      cell.id = '_' + currentIndex
      const x = currentIndex * cellWidth
      cell.y = y
      cell.x = x
      return cell
    })
  })
}

export default Grid
