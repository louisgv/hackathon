import update from 'react-addons-update';

import { RECEIVED_CLIENTS, RECEIVED_CLIENT, CLIENT_UPDATED } from '../constants/actionTypes';

export default function (state = {}, action) {
  switch (action.type) {
    case RECEIVED_CLIENTS:
      const clients = {};
      action.clients.forEach(client => clients[client._id] = client);
      return clients;
    case RECEIVED_CLIENT:
      return update(state, { $merge: { [action.client._id]: action.client } });
    case CLIENT_UPDATED:
      return update(state, { [action.id]: { $merge: action.update } });
    default:
      return state;
  }
}
