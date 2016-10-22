import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchClients } from '../../actions/clients';

class ClientList extends Component {
  componentDidMount() {
    this.props.dispatch(fetchClients());
  }

  render() {
    const { clients } = this.props;
    return (
      <div>
        <div>Clients:</div>
        {clients.map(client => (
          <Link to={`/admin/client/${client._id}`} key={client._id}>{client.name}</Link>
        ))}
      </div>
    );
  }
}

function select(state) {
  console.log(state);
  return {
    clients: Object.keys(state.clients).map(id => state.clients[id])
  };
}
export default connect(select)(ClientList);
