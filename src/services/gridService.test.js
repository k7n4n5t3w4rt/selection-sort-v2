import D from './gridService.js'
import { cellCoordinatesFromArrayIndex, matrix } from './gridService.js'

// D.gridFactory
it('returns the full grid data structure', () => {
  const a = [
    0.4436106041926098,
    0.7224597202715499,
    0.8108199440903086,
    0.5941702729121889,
    0.6093192625779376,
    0.4856893431983711,
    0.4582624980848786,
    0.546459383301849,
    0.8705959130806717
  ]
  const containerWidth = 1280
  const containerHeight = 699
  const cols = '3'
  const rows = '3'
  const click = '500'
  expect(
    D.gridFactory(a, containerWidth, containerHeight, cols, rows, click)()
  ).toEqual([
    [
      {
        value: 0.4436106041926098,
        id: '_0:0',
        width: 426.6666666666667,
        height: 233,
        y: 0,
        x: 0,
        className: '',
        cssTransition: ''
      },
      {
        value: 0.7224597202715499,
        id: '_0:1',
        width: 426.6666666666667,
        height: 233,
        y: 0,
        x: 426.6666666666667,
        className: '',
        cssTransition: ''
      },
      {
        value: 0.8108199440903086,
        id: '_0:2',
        width: 426.6666666666667,
        height: 233,
        y: 0,
        x: 853.3333333333334,
        className: '',
        cssTransition: ''
      }
    ],
    [
      {
        value: 0.5941702729121889,
        id: '_1:0',
        width: 426.6666666666667,
        height: 233,
        y: 233,
        x: 0,
        className: '',
        cssTransition: ''
      },
      {
        value: 0.6093192625779376,
        id: '_1:1',
        width: 426.6666666666667,
        height: 233,
        y: 233,
        x: 426.6666666666667,
        className: '',
        cssTransition: ''
      },
      {
        value: 0.4856893431983711,
        id: '_1:2',
        width: 426.6666666666667,
        height: 233,
        y: 233,
        x: 853.3333333333334,
        className: '',
        cssTransition: ''
      }
    ],
    [
      {
        value: 0.4582624980848786,
        id: '_2:0',
        width: 426.6666666666667,
        height: 233,
        y: 466,
        x: 0,
        className: '',
        cssTransition: ''
      },
      {
        value: 0.546459383301849,
        id: '_2:1',
        width: 426.6666666666667,
        height: 233,
        y: 466,
        x: 426.6666666666667,
        className: '',
        cssTransition: ''
      },
      {
        value: 0.8705959130806717,
        id: '_2:2',
        width: 426.6666666666667,
        height: 233,
        y: 466,
        x: 853.3333333333334,
        className: '',
        cssTransition: ''
      }
    ],
    []
  ])
})
// arrayToSort
it("return$ the 'x' and 'y' for an element in a two dimensional array", () => {
  const grid = [
    [
      {
        value: 0.2815573094694832,
        id: '_0',
        width: 426.6666666666667,
        height: 233,
        y: 0,
        x: 0,
        className: 'next-cell',
        cssTransition: ''
      },
      {
        value: 0.37146601907188415,
        id: '_1',
        width: 426.6666666666667,
        height: 233,
        y: 0,
        x: 426.6666666666667,
        className: '',
        cssTransition: ''
      },
      {
        value: 0.8205904663779915,
        id: '_2',
        width: 426.6666666666667,
        height: 233,
        y: 0,
        x: 853.3333333333334,
        className: '',
        cssTransition: ''
      }
    ],
    [
      {
        value: 0.7665721538191019,
        id: '_0',
        width: 426.6666666666667,
        height: 233,
        y: 233,
        x: 0,
        className: '',
        cssTransition: ''
      },
      {
        value: 0.9664640387238694,
        id: '_1',
        width: 426.6666666666667,
        height: 233,
        y: 233,
        x: 426.6666666666667,
        className: '',
        cssTransition: ''
      },
      {
        value: 0.013962289131554506,
        id: '_2',
        width: 426.6666666666667,
        height: 233,
        y: 233,
        x: 853.3333333333334,
        className: '',
        cssTransition: ''
      }
    ],
    [
      {
        value: 0.6566456648342944,
        id: '_0',
        width: 426.6666666666667,
        height: 233,
        y: 466,
        x: 0,
        className: '',
        cssTransition: ''
      },
      {
        value: 0.34144409545466603,
        id: '_1',
        width: 426.6666666666667,
        height: 233,
        y: 466,
        x: 426.6666666666667,
        className: '',
        cssTransition: ''
      },
      {
        value: 0.5127416118340873,
        id: '_2',
        width: 426.6666666666667,
        height: 233,
        y: 466,
        x: 853.3333333333334,
        className: '',
        cssTransition: ''
      }
    ],
    []
  ]
  expect(cellCoordinatesFromArrayIndex(4, grid)).toEqual({
    colIndex: 1,
    rowIndex: 1
  })
  expect(cellCoordinatesFromArrayIndex(8, grid)).toEqual({
    colIndex: 2,
    rowIndex: 2
  })
})

// matrix
it("returns a two dimensional array (aka 'grid matrixi`) from a single dimensional array + rows and columns", () => {
  const a = [
    0.05709839095489899,
    0.06876443182090153,
    0.06442455835629723,
    0.2295478291582318,
    0.7233633469924847,
    0.6233133203441312,
    0.23138065938341246,
    0.8500213932402951,
    0.4603262441754872
  ]
  const protoGrid = [
    [0.05709839095489899],
    [0.06876443182090153],
    [0.06442455835629723],
    [0.2295478291582318],
    [0.7233633469924847],
    [0.6233133203441312],
    [0.23138065938341246],
    [0.8500213932402951],
    [0.4603262441754872],
    []
  ]

  expect(matrix(a)).toEqual(protoGrid)
})
