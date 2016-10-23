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

  getStarObjects(star_count) {
    let starsArray = [];
    for (var i = 0; i < star_count; i++) {
      starsArray.push({});
    }
    console.log('fp', star_count, starsArray)
    return starsArray;
  }

  render() {
    const { client } = this.props;
    const star_count = 13;
    const levels = [];
    for (var i = 0; i < Math.floor(star_count / 3); i++) {
      levels.push({star_count: 3});
    }
    if (star_count % 3) {
      levels.push({star_count: star_count % 3});
    }

    return (
      <div style={{margin: '30px 50px'}}>
        <div style={{textAlign: 'center', fontSize: 30, lineHeight: '72px'}}>Welcome <span style={{color: colors.primary}}> {client.name}</span></div>
        <div>
          {levels.map((level, i) => (
          <div key={i}>
            <div>{20 - i}</div>
            {this.getStarObjects(level.star_count).map(star => (
            <div style={{display: 'inline'}}>*</div>
            ))}
          </div>
          ))}
        </div>
        <PaymentHistory
          monthly_home_payment={client.monthly_home_payment}
          payment_history={client.payment_history}/>
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
