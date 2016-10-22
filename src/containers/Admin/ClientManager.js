import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchClient, updateClient } from '../../actions/clients';

class ClientManager extends Component {
  componentDidMount() {
    this.props.dispatch(fetchClient(this.props.params.id));
  }

  updateClient(update) {
    this.props.dispatch(updateClient(this.props.params.id, update));
  }

  render() {
    const { client } = this.props;
    return (
      <div>
        <div>Client page will Go here</div>
        <input
          placeholder="Name"
          value={client.name}
          onChange={e => this.updateClient({name: e.target.value})}
        />
        <input
          placeholder="Email"
          disabled={true}
          value={client.email}
        />
        <input
          placeholder="Phone"
          value={client.phone}
          onChange={e => this.updateClient({phone: e.target.value})}
        />
        <div onClick={() => this.updateClient({status: 'approved'})}>Do The CoSign Thing</div>
      </div>
    );
  }
}

function select(state) {
  return {
    client: state.clients[state.router.params.id] || {}
  };
}
export default connect(select)(ClientManager);

// removing updating email, because the previous email was verified and we need to have one when cosigning
