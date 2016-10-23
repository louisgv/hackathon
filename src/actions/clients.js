import fetch from 'isomorphic-fetch';

import {
  RECEIVED_CLIENTS,
  RECEIVED_CLIENT,
  CLIENT_UPDATED
} from '../constants/actionTypes';

export function fetchClients() {
  return dispatch => {
    fetch('/api/client', { credentials: 'same-origin' })
      .then(res => res.json())
      .then(clients => {
        console.log('res', clients);
        dispatch({
          type: RECEIVED_CLIENTS,
          clients
        });
      });
  };
}

export function fetchClient(id) {
  return (dispatch, getState) => {
    if (!getState().clients[id]) {
      fetch(`/api/client/${id}`, { credentials: 'same-origin' })
        .then(res => res.json())
        .then(client => {
          dispatch({
            type: RECEIVED_CLIENT,
            client
          });
        });
    }
  };
}

export function updateClient(id, update) {
  return dispatch => {
    dispatch({
      type: CLIENT_UPDATED,
      id,
      update
    });
    fetch(`/api/client/${id}`, {
      method: 'put',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(update)
    });
  };
}

export function addNote(id, note) {
  return dispatch => {
    fetch(`/api/client/${id}/note`, {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ note })
    })
      .then(res => res.json())
      .then(notes => {
        console.log(notes);
        dispatch({
          type: CLIENT_UPDATED,
          id,
          update: {notes}
        });
      });
  };
}

export function addPayment(id, amount) {
  return dispatch => {
    fetch(`/api/client/${id}/amount`, {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: amount
    })
      .then(res => res.json())
      .then(payment_history => {
        dispatch({
          type: CLIENT_UPDATED,
          id,
          update: {payment_history}
        });
      });
  };
}
