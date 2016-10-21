import fetch from 'isomorphic-fetch';

import {USER_UPDATED} from '../constants/actionTypes';

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
