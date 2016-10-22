import update from 'react-addons-update';

import {USER_UPDATED, RECEIVED_CLIENT, LOG_USER_IN} from '../constants/actionTypes';

export default function (state = {}, action) {
  switch (action.type) {
    case USER_UPDATED:
      return update(state, {[action.user._id]: {$set: action.user}});
    case RECEIVED_CLIENT:
      return update(state, { $merge: { [action.client._id]: action.client } });
    case LOG_USER_IN:
      return update(state, {[action.user._id]: {$set: action.user}});
    default:
      return state;
  }
}
