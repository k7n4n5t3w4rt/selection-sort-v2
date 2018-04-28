import React from 'react'
import ReactDOM from 'react-dom'
import SelectionSort from './SelectionSort.js'
import {
  swapArrayElements,
  click,
  cols,
  rows,
  arrayToSort
} from './SelectionSort.js'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<SelectionSort />, div)
})

// arrayToSort
it('creates an array of random numerical values between 0 and 1', () => {
  expect(Array.isArray(arrayToSort(10, 10))).toBeTruthy()
  expect(arrayToSort(10, 10).length).toEqual(100)
})

// swapArrayElements
it('swaps two array elements', () => {
  const array1 = [0, 5, 2, 3, 4, 1]
  const array2 = [0, 1, 2, 3, 4, 5]
  expect(swapArrayElements(array1, 1, 5)).toEqual(array2)
})

// click
it('returns a value for click', () => {
  expect(click(500)).toEqual(500)
  expect(click()).toEqual(1000)
})
// cols
it('returns a value for cols', () => {
  expect(cols(10)).toEqual(10)
  expect(cols()).toEqual(5)
})
// rows
it('returns a value for rows', () => {
  expect(rows(10)).toEqual(10)
  expect(rows()).toEqual(5)
})
