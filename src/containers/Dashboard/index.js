import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchClients } from '../../actions/clients';

class Dashboard extends Component {
  componentDidMount() {
    this.props.dispatch(fetchClients());
  }

  render() {
    const { client } = this.props;
    return (
      <div>
        <div>dashbaord</div>
        <div>Welcome {client.name}</div>
      </div>
    );
  }
}

function select(state) {
  return {
    client: state.clients[Object.keys(state.clients)[0]] || {}
  };
}
export default connect(select)(Dashboard);
