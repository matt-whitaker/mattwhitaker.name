import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';

import { App } from './App';
import { store } from './redux.setup';

import './less/root';

const reactRoot = 'react-root';
const reactRootElement = document.getElementById(reactRoot);

ReactDOM.render(
  <ReduxProvider store={store}>
    <App.Connected />
  </ReduxProvider>,
  reactRootElement,
);
