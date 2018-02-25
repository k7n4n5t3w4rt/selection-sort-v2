// @flow - https://flow.org/en/docs/react/types/
// Flow
type Cell = {
  value: number,
  id: string,
  width: number,
  height: number,
  x: number,
  y: number
}

export default function gridService(
  a: number[],
  containerWidth: number,
  containerHeight: number,
  cols: number,
  rows: number
): Cell[][] {
  const cellWidth = containerWidth / parseInt(cols, 10)
  const cellHeight = containerHeight / parseInt(rows, 10)
  const matrixOfPlainValues = matrix(a, cols)
  return grid(matrixOfPlainValues, cellWidth, cellHeight)
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

function grid(
  grid: number[][],
  cellWidth: number,
  cellHeight: number
): Cell[][] {
  const gridInQuestion = grid.map((row, currentIndex) => {
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
  return gridInQuestion
}
