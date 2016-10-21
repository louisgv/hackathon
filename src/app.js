import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';

import {
  ReduxRouter,
  reduxReactRouter,
} from 'redux-router';
import { Provider } from 'react-redux';
import createHistory from 'history/lib/createBrowserHistory';

import routes from './containers/routes';
import reducer from './reducers';
const store = compose(
  applyMiddleware(
    thunkMiddleware
  ),
  reduxReactRouter({ createHistory })
)(createStore)(reducer, JSON.parse(document.getElementById('is').innerHTML));

const rootComponent = (
  <Provider store={store}>
    <ReduxRouter routes={routes(store)} />
  </Provider>
);
const mountNode = document.getElementById('app');
// First render to match markup from server
ReactDOM.render(rootComponent, mountNode);
