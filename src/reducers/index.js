import {combineReducers} from 'redux';
import {routerStateReducer} from 'redux-router';

import app from './app';
import users from './users';

export default combineReducers({
  router: routerStateReducer,
  app,
  users
});
