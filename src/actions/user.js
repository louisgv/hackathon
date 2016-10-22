import fetch from 'isomorphic-fetch';

import {USER_UPDATED, RECEIVED_CLIENT} from '../constants/actionTypes';

export function updateUser(update) {
  return dispatch => {
    return new Promise((resolve) => {

      fetch('/api/user', {
        method: 'put',
        credentials: 'same-origin',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(update)
      })
        .then(res => res.json())
        .then(user => {
          dispatch({
            type: USER_UPDATED,
            user
          });
          resolve(user);
        });

    });
  };
}

export function fetchClientFromUser() {
  return (dispatch, getState) => {
    fetch(`/api/client`, { credentials: 'same-origin' })
      .then(res => res.json())
      .then(client => {
        dispatch({
          type: RECEIVED_CLIENT,
          client
        });
      });
  };
}
