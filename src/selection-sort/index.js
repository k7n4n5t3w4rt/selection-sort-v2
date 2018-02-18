/* eslint-env browser */

export function selectionSortFactory(D: {}): {} {
  function run(a: []) /*: void */ {
    loop(a, 0)
  }

  function loop(a /*: Array<Object> */, i /*: number */) /*: null | void */ {
    // reloadPageIfFinishedLooping(a.length, i)
    if (config.LOOP && i === a.length) {
      return reloadIfFinishedLooping(config.RELOAD_INTERVAL)
    }
    D.setCellDisplay(
      i,
      'add',
      'active',
      config.CONTAINER_ID,
      config.SHOW_WORKING
    )
    findMinIndex(a, i).then(minIndex => {
      // If this one is already in the right position
      // jump to the next cell and return out
      if (minIndex === i) {
        skipToNextLoop(a, i, minIndex)
        return null
      }
      swapAndLoopAgain(a, i, minIndex)
    })
  }

  function setReload(reloadInterval /*: number */) /*: void */ {
    if (thereAreMultipleAlgorithmsOnView()) {
      config.FINISH_COUNTER.ALGORITHMS.forEach(algorithm => {
        setTimeout(() => {
          algorithm.run()
        }, reloadInterval)
      })
    } else {
      setTimeout(() => {
        run()
      }, reloadInterval)
    }
  }

  function thereAreMultipleAlgorithmsOnView() /*: boolean */ {
    if (
      config.FINISH_COUNTER &&
      config.FINISH_COUNTER.ALGORITHMS &&
      config.FINISH_COUNTER.ALGORITHMS.length > 1
    ) {
      return true
    }
    return false
  }

  function allAlgorithmsHaveFinished() /*: boolean */ {
    if (!thereAreMultipleAlgorithmsOnView()) {
      return true
    }
    if (thereAreMultipleAlgorithmsOnView()) {
      ++config.FINISH_COUNTER.COUNT
      if (
        config.FINISH_COUNTER.COUNT === config.FINISH_COUNTER.ALGORITHMS.length
      ) {
        config.FINISH_COUNTER.COUNT = 0
        return true
      }
    }
    return false
  }

  function reloadIfFinishedLooping(reloadInterval /*: number */) /*: void */ {
    if (allAlgorithmsHaveFinished()) {
      setReload(reloadInterval)
    }
  }

  function skipToNextLoop(
    a /*: Array<Object> */,
    i /*: number */,
    minIndex /*: number */
  ) /*: void */ {
    D.setCurrentCellDisplayToActive(i, config.CONTAINER_ID, config.SHOW_WORKING)
    setTimeout(() => {
      D.clearActiveCellsDisplay(
        i,
        minIndex,
        config.CONTAINER_ID,
        config.SHOW_WORKING
      )
      loop(a, ++i)
    }, config.CLICK * 1) // eslint-disable-line no-undef
  }

  function swapAndLoopAgain(
    a /*: Array<Object> */,
    i /*: number */,
    minIndex /*: number */
  ) /*: void */ {
    setTimeout(() => {
      D.swapCells(
        a,
        i,
        minIndex,
        config.CONTAINER_ID,
        config.CONSTANT_TRANSITION_SPEED,
        config.MAX_SECONDS_TRANSITION_INTERVAL,
        config.COLS,
        config.ROWS
      )
        .then(() => {
          D.swapActiveCellsDisplay(
            i,
            minIndex,
            config.CONTAINER_ID,
            config.SHOW_WORKING
          )
          return swapArrayElements(a, i, minIndex)
        })
        .then(a => {
          setTimeout(() => {
            D.clearActiveCellsDisplay(
              i,
              minIndex,
              config.CONTAINER_ID,
              config.SHOW_WORKING
            )
            ++i
          }, config.CLICK * 1) // eslint-disable-line no-undef
          setTimeout(() => {
            loop(a, i)
          }, config.CLICK * 2) // eslint-disable-line no-undef
        })
        .catch(e => {
          console.error(e)
          throw new Error(e)
        })
    }, config.CLICK * 1) // eslint-disable-line no-undef
  }

  function findMinIndex(
    a /*: Array<Object> */,
    j /*: number */
  ) /*: Promise<number> */ {
    let minValue = a[j].value
    let minIndex = j
    return new Promise(resolve => {
      const intervalID = setInterval(() => {
        D.setCellDisplay(
          j,
          'remove',
          'actively-looking',
          config.CONTAINER_ID,
          config.SHOW_WORKING
        )
        ++j
        if (j >= a.length) {
          clearInterval(intervalID)
          D.setCellDisplay(
            minIndex,
            'remove',
            'min',
            config.CONTAINER_ID,
            config.SHOW_WORKING
          )
          D.setCellDisplay(
            minIndex,
            'remove',
            'actively-looking',
            config.CONTAINER_ID,
            config.SHOW_WORKING
          )
          D.setCellDisplay(
            minIndex,
            'add',
            'active-min',
            config.CONTAINER_ID,
            config.SHOW_WORKING
          )
          return resolve(minIndex)
        }
        D.setCellDisplay(
          j,
          'add',
          'actively-looking',
          config.CONTAINER_ID,
          config.SHOW_WORKING
        )
        if (a[j].value < minValue) {
          D.setCellDisplay(
            minIndex,
            'remove',
            'min',
            config.CONTAINER_ID,
            config.SHOW_WORKING
          )
          minValue = a[j].value
          minIndex = j
          D.setCellDisplay(
            minIndex,
            'add',
            'min',
            config.CONTAINER_ID,
            config.SHOW_WORKING
          )
        }
      }, config.CLICK * 1) // eslint-disable-line no-undef
    })
  }

  function swapArrayElements(
    a /*: Array<Object> */,
    i /*: number */,
    minIndex /*: number */
  ) /*: Array<Object> */ {
    const tmpValue = a[i].value
    a[i].value = a[minIndex].value
    a[minIndex].value = tmpValue
    return a
  }

  return {
    run,
    loop,
    skipToNextLoop,
    swapAndLoopAgain,
    findMinIndex,
    swapArrayElements,
    setReload,
    allAlgorithmsHaveFinished
  }
}
