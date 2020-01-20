import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';

import './less/root';
import { store } from './redux.setup';
import { Provider as ReduxProvider } from 'react-redux';

const reactRoot = 'react-root';
const reactRootElement = document.getElementById(reactRoot);

ReactDOM.render(
  <ReduxProvider store={store}>
    <App.Connected />
  </ReduxProvider>,
  reactRootElement,
);
