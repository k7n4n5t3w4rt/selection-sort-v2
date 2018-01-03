import React from 'react';
import ReactDOM from 'react-dom';
import SelectionSort from './SelectionSort.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SelectionSort />, div);
});
