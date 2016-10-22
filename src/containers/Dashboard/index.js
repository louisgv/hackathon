import React, { Component } from 'react';
import { connect } from 'react-redux';
import colors from '../../styles/colors';

import ClientInfo from '../../components/ClientInfo';
import PaymentHistory from '../../components/PaymentHistory';
import { fetchClients } from '../../actions/clients';

class Dashboard extends Component {
  componentDidMount() {
    this.props.dispatch(fetchClients());
  }

  render() {
    const { client } = this.props;
    return (
      <div style={{margin: '30px 50px'}}>
        <div style={{textAlign: 'center', fontSize: 30, lineHeight: '72px'}}>Welcome <span style={{color: colors.primary}}> {client.name}</span></div>
        <div style={{display: 'flex'}}>
          <ClientInfo client={ client ? client : '' }/>
          <PaymentHistory client={client}/>
        </div>
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
