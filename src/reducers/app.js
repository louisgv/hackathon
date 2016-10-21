import update from 'react-addons-update';

import {
  LOG_USER_IN,
  FETCHING_COURSES,
  RECEIVED_COURSES,
  FETCHING_REPORTS,
  RECEIVED_REPORTS
} from '../constants/actionTypes';

const initialState = {
  currentUser: null,
  tempFlash: {},
  pendingLoads: {}
};


export default function (state = initialState, action) {
  const pendingLoads = Object.assign({}, state.pendingLoads);
  switch (action.type) {
    case LOG_USER_IN:
      return update(state, {$merge: {currentUser: action.user._id}});
    case FETCHING_COURSES:
      return update(state, {pendingLoads: {$merge: {courses: true}}});
    case RECEIVED_COURSES:
      delete pendingLoads.courses;
      return update(state, {$merge: {pendingLoads}});
    case FETCHING_REPORTS:
      return update(state, {pendingLoads: {$merge: {reports: true}}});
    case RECEIVED_REPORTS:
      delete pendingLoads.reports;
      return update(state, {$merge: {pendingLoads}});
    default:
      return state;
  }
}
