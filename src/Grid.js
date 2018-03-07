// @flow
// -------------------------------------------
// Packages
// -------------------------------------------
import * as React from 'react'
// -------------------------------------------
// CSS
// -------------------------------------------
import './Grid.css'
import './font-awesome/css/font-awesome.min.css'
// -------------------------------------------
// Flow
// -------------------------------------------
type Cell = {
  value: number,
  id: string,
  width: number,
  height: number,
  x: number,
  y: number,
  className: string
}
type CellStyle = {
  background: string,
  width: string,
  height: string,
  top: string,
  left: string
}
type Props = {
  grid: Cell[][]
}
// -------------------------------------------
// Component
// -------------------------------------------
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
function Grid({ grid }: Props) {
  let idCount = 0
  return (
    <ul>
      {grid.map((row, i) => {
        return row.map((cell, j) => {
          const cellColour: number = 255 - Math.ceil(255 * cell.value)
          const cellStyle: CellStyle = {
            background: `rgb(${cellColour},${cellColour},${cellColour})`,
            width: cell.width.toString() + 'px',
            height: cell.height.toString() + 'px',
            top: cell.y ? cell.y.toString() + 'px' : 0 + 'px',
            left: cell.x ? cell.x.toString() + 'px' : 0 + 'px'
          }
          const cellClassName: string = cell.className
          ++idCount
          return (
            <li
              id={'_' + idCount}
              key={j}
              style={cellStyle}
              className={cellClassName}
            />
          )
        })
      })}
    </ul>
  )
}

export default Grid
