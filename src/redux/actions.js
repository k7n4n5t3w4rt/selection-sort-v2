// @flow
// Types
import type { Cell } from '../services/gridService.js'
type UpdateGrid = {
  type: string,
  isInProgress: boolean,
  payload: Cell[][]
}

export function updateGrid(newGrid: Cell[][]): UpdateGrid {
  return {
    type: 'UPDATE_GRID',
    isInProgress: false,
    payload: newGrid
  }
}

// for some reason if you extract this out to a common file and then `import type` it wont work!!
type _ExtractReturn<B, F: (...args: any[]) => B> = B //eslint-disable-line no-unused-vars
export type ExtractReturn<F> = _ExtractReturn<*, F>

export type Actions = ExtractReturn<typeof updateGrid>
