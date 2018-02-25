function displayGrid(): void {
  while (CONTAINER.firstChild) {
    CONTAINER.removeChild(CONTAINER.firstChild)
  }
  const cellWidth = CONTAINER.clientWidth / COLS
  const cellHeight = CONTAINER.clientHeight / ROWS
  const grid = this.getMatrix(a, COLS)
  const gridXY = this.getMatrixXYValues(grid, cellWidth, cellHeight)
  // Make the basic grid container
  const grid = document.createElement('ul')
  CONTAINER.appendChild(grid)
  gridXY.forEach(row => {
    row.forEach(cell => {
      const listItem = document.createElement('li')
      listItem.id = containerId + cell.id
      const cellElement = grid.appendChild(listItem)
      const cellColour = 255 - Math.ceil(255 * cell.value)
      cellElement.style.background = `rgb(${cellColour},${cellColour},${cellColour})`
      cellElement.style.width = cellWidth.toString() + 'px'
      cellElement.style.height = cellHeight.toString() + 'px'
      cellElement.style.top = cell.y + 'px'
      cellElement.style.left = cell.x + 'px'
    })
  })
  // Make the controls
  makeControlsDisplay(selectionSort, showWorking)
  enableShowWorkingToggleControl(config)
}
function makeControlsDisplay(
  selectionSort: HTMLElement,
  showWorking: boolean
): void {
  const controls = document.createElement('div')
  controls.className = 'hidden'
  controls.id = 'controls'
  // makeSpeedControls(controls)
  makeShowWorkingToggleControl(controls, showWorking)
  selectionSort.appendChild(controls)
  Rx.Observable.fromEvent(selectionSort, 'click') // eslint-disable-line no-undef
    .subscribe(event => {
      window.requestAnimationFrame(() => {
        if (controls.className === 'hidden') {
          controls.className = 'active'
        } else if (controls.className === 'active') {
          controls.className = 'hidden'
        }
      })
    })
}

function makeShowWorkingToggleControl(
  controls: HTMLElement,
  showWorking: boolean
): void {
  const showWorkingToggle = document.createElement('i')
  // controls.className = 'hidden'
  showWorkingToggle.classList.add('fa')
  if (showWorking) {
    showWorkingToggle.classList.add('fa-eye')
  } else {
    showWorkingToggle.classList.add('fa-eye-slash')
  }
  showWorkingToggle.id = 'show-working-toggle'
  controls.appendChild(showWorkingToggle)
}

function enableShowWorkingToggleControl(config) {
  const showWorkingToggle = document.getElementById('show-working-toggle')
  Rx.Observable.fromEvent(showWorkingToggle, 'click') // eslint-disable-line no-undef
    .subscribe(event => {
      event.stopPropagation()
      toggleShowWorking(config)
      if (config.SHOW_WORKING) {
        window.requestAnimationFrame(() => {
          event.target.classList.remove('fa-eye-slash')
          event.target.classList.add('fa-eye')
        })
      } else {
        window.requestAnimationFrame(() => {
          event.target.classList.remove('fa-eye')
          event.target.classList.add('fa-eye-slash')
        })
      }
    })
  // body
}

function toggleShowWorking(config: config): void {
  config.SHOW_WORKING = !config.SHOW_WORKING
  config.CLICK = getClick(config.SHOW_WORKING, config.FPS, config.ACCELLERATION)
  clearShowWorkingCellsDisplay(config.COLS, config.ROWS, config.CONTAINER_ID)
}

function setCurrentCellDisplayToActive(
  i: number,
  containerId: string,
  showWorking: boolean
): void {
  if (!showWorking) {
    return
  }
  this.setCellDisplay(i, 'add', 'active', containerId)
}

function clearActiveCellsDisplay(
  _1: number,
  _2: number,
  containerId: string,
  showWorking: boolean
): void {
  if (!showWorking) {
    return
  }
  setCellDisplay(_1, 'remove', 'active', containerId, showWorking)
  setCellDisplay(_2, 'remove', 'active-min', containerId, showWorking)
  setCellDisplay(_2, 'remove', 'active', containerId, showWorking)
  setCellDisplay(_1, 'remove', 'active-min', containerId, showWorking)
}

function swapActiveCellsDisplay(
  _1: number,
  _2: number,
  containerId: string,
  showWorking: boolean
): void {
  if (!showWorking) {
    return
  }
  setCellDisplay(_1, 'remove', 'active', containerId, showWorking)
  setCellDisplay(_2, 'remove', 'active-min', containerId, showWorking)
  setCellDisplay(_2, 'add', 'active', containerId, showWorking)
  setCellDisplay(_1, 'add', 'active-min', containerId, showWorking)
}

function setNewCellColour(movingCell: Object, newValue: number): Object {
  // movingCell.style.opacity = newValue / 100
  // movingCell.style.background = `rgba(0,0,0,${newValue})`
  const newColour = 255 - Math.ceil(255 * newValue)
  movingCell.style.background = `rgb(${newColour},${newColour},${newColour})`
  return movingCell
}

function setCellDisplay(
  i: number,
  action: string,
  className: string,
  containerId: string,
  showWorking: boolean
): void {
  if (!showWorking) {
    return
  }
  const currentCell = getElementById(containerId + '_' + i)
  window.requestAnimationFrame(() => {
    if (action === 'add') {
      currentCell.classList.add(className)
    } else if (action === 'remove') {
      currentCell.classList.remove(className)
    }
  })
}

function clearCellDisplay(
  i: number,
  className: string,
  containerId: string
): void {
  const currentCell = getElementById(containerId + '_' + i)
  if (!currentCell) {
    throw new Error('Element ' + containerId + '_ ' + i + ' does not exist.')
  }
  currentCell.classList.remove(className)
}

function random(max: number) {
  const min = 0
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

function swapCells(
  a: Array<Object>,
  _2: number,
  _1: number,
  containerId: string,
  constantTransitionSpeed: boolean,
  maxSecondsTransitionInterval: number,
  cols: number,
  rows: number
): Promise<Array<Object>> {
  const _1CellData = a[_1]
  const _2CellData = a[_2]
  const _1Cell = getElementById(containerId + _1CellData.id) || {}
  const _2Cell = getElementById(containerId + _2CellData.id) || {}
  if (!_1Cell.id || !_2Cell.id) {
    console.error(
      'There was a problem getting the DOM elements we want to swap...'
    )
  }
  const transitionSpeed = this.getTransitionSpeed(
    _1CellData.x,
    _1CellData.y,
    _2CellData.x,
    _2CellData.y,
    containerId,
    constantTransitionSpeed,
    maxSecondsTransitionInterval,
    cols,
    rows
  )
  return Promise.all([
    this.moveCell(_1Cell, _2CellData.x, _2CellData.y, transitionSpeed).then(
      _1Cell => {
        this.moveCellBackQuickly(_1Cell, _1CellData.x, _1CellData.y)
        this.setNewCellColour(_1Cell, _2CellData.value)
      }
    ),
    this.moveCell(_2Cell, _1CellData.x, _1CellData.y, transitionSpeed).then(
      _2Cell => {
        this.moveCellBackQuickly(_2Cell, _2CellData.x, _2CellData.y)
        this.setNewCellColour(_2Cell, _1CellData.value)
      }
    )
  ]).then(() => a)
}

function moveCell(
  movingCell: HTMLElement,
  newX: number,
  newY: number,
  transitionSpeed: number
): Object {
  if (!movingCell.id) {
    throw new Error('movingCell() called without an element to move')
  }
  return new Promise(resolve => {
    movingCell.addEventListener(
      'transitionend',
      function(e) {
        // eslint-disable-line no-unused-vars
        movingCell.style.zIndex = '1'
        movingCell.removeEventListener('transitionend', resolve)
        return resolve(movingCell)
      },
      false
    )
    requestAnimationFrame(() => {
      movingCell.style.transition = `left ${transitionSpeed}s linear, top ${transitionSpeed}s linear`
      movingCell.style.top = `${newY}px`
      movingCell.style.left = `${newX}px`
      movingCell.style.zIndex = '2'
    })
  })
}

function getTransitionSpeed(
  currentX: number,
  currentY: number,
  newX: number,
  newY: number,
  containerId: string,
  constantTransitionSpeed: boolean,
  maxSecondsTransitionInterval: number,
  cols: number,
  rows: number
): number {
  if (constantTransitionSpeed) {
    return maxSecondsTransitionInterval
  }
  const selectionSort = getGridContainer(containerId)
  const cellWidth = Math.ceil(selectionSort.clientWidth / cols)
  const cellHeight = Math.ceil(selectionSort.clientHeight / rows)
  const x = newX - currentX
  const y = newY - currentY
  const distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
  const maxX = cols * cellWidth
  const maxY = rows * cellHeight
  const maxDistance = Math.sqrt(Math.pow(maxX, 2) + Math.pow(maxY, 2))
  const distanceFraction = distance / maxDistance

  return maxSecondsTransitionInterval * distanceFraction
}

function moveCellBackQuickly(
  movingCell: Object,
  oldX: number,
  oldY: number
): Object {
  movingCell.style.transition = ''
  movingCell.style.top = oldY + 'px'
  movingCell.style.left = oldX + 'px'
  return movingCell
}

function getClick(
  SHOW_WORKING: boolean,
  FPS: number,
  ACCELLERATION: number
): number {
  if (!SHOW_WORKING) {
    return 0
  }
  return 1000 / 2 / ACCELLERATION
}

function clearShowWorkingCellsDisplay(
  COLS: number,
  ROWS: number,
  containerId: string
): void {
  for (let i = 0; i < COLS * ROWS; ++i) {
    clearCellDisplay(i, 'active', containerId)
    clearCellDisplay(i, 'active-min', containerId)
    clearCellDisplay(i, 'actively-looking', containerId)
    clearCellDisplay(i, 'min', containerId)
  }
}

export default {
  displayGrid,
  setCurrentCellDisplayToActive,
  clearActiveCellsDisplay,
  swapActiveCellsDisplay,
  setNewCellColour,
  getMatrix,
  getMatrixXYValues,
  setCellDisplay,
  random,
  swapCells,
  moveCell,
  getTransitionSpeed,
  moveCellBackQuickly,
  getClick,
  clearShowWorkingCellsDisplay,
  toggleShowWorking,
  enableShowWorkingToggleControl
}