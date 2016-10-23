import React, { Component } from 'react';
import { connect } from 'react-redux';

import colors from '../../styles/colors';
import PaymentHistory from '../../components/PaymentHistory';
import { fetchClients, addPayment } from '../../actions/clients';

class Dashboard extends Component {
  componentDidMount() {
    this.props.dispatch(fetchClients());
  }

  getStarObjects(completed) {
    var stars = [];
    for (let i = 0; i < 30; i++) {
      stars.push(<i key={i} className="fa fa-star" style={{
        fontSize: 13,
        color: i < completed ? colors.primary : colors.light,
        marginRight: 4,
        marginBottom: 4
      }}/>);
    }
    return stars;
  }

  render() {
    const { client } = this.props;
    return (
      <div style={{borderTop: `1px solid ${colors.border}`}}>
        <div style={{textAlign: 'center', fontSize: 30, lineHeight: '72px'}}>
          Welcome <span style={{color: colors.primary}}>{client.name}</span>
        </div>
        <div style={{display: 'flex', flexWrap: 'wrap', width: 242, margin: 'auto'}}>
          {this.getStarObjects(client.payment_stars)}
        </div>
        <div style={{display: 'flex', paddingTop: '32px', paddingRight: 40, paddingLeft: 40}}>
          <div style={{flex: 1}}></div>
          <div style={{flex: 1}}>
            <PaymentHistory
              handleAddPayment={amount => this.props.dispatch(addPayment(client._id, amount))}
              monthlyHomePayment={client.monthly_home_payment || 0}
              paymentHistory={client.payment_history || []}
            />
          </div>
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
