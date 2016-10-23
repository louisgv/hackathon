import React, { Component } from 'react';
import { css } from 'aphrodite';
import type from '../styles/type';
import { connect } from 'react-redux';
import moment from 'moment';

import { addPayment } from '../actions/clients';
import InputLabel from './InputLabel';
import buttons from '../styles/buttons';

class PaymentHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      paymentAmount: null
    };
  }

  submitPayment() {
    const {paymentAmount} = this.state;
    if (!paymentAmount) {
      return;
    }
    this.setState({paymentAmount: null});
    this.props.dispatch(addPayment(this.props.client._id, paymentAmount));
  }

  render() {
    const { payment_history, monthly_home_payment } = this.props;
    return (
      <div>
        <div className={css(type.subHeading)}>Payment History</div>
        {payment_history.length ? payment_history.map( ( payment ) => (
        <div key={payment._id}>
          <div style={{width: '30%', display: 'inline-block'}}>{moment(payment.paid_on).format('MMM Do, YYYY')}</div>
          <div style={{height: 30, background: '#ddd', marginBottom: 5, width: '70%', display: 'inline-block'}}>
            <div style={{
              width: `${(payment.amount / monthly_home_payment) > 1 ? 100 : (payment.amount / monthly_home_payment) * 100}%`,
              background: 'green',
              height: 30}}></div>
          </div>
        </div>
        ))
        :
        <div>NO PAYMENTS MADE</div>}
        <div>
          <div className={css(type.subHeading)}>Make a Payment</div>
          <InputLabel
            label="Amount"
            value={this.state.paymentAmount}
            handleChange={(val) => this.setState({paymentAmount: val})}
            handleEnter={() => this.submitPayment()}/>
          <div
            onClick={() => this.submitPayment()}
            className={css(buttons.large)}
          >Submit</div>
        </div>
      </div>
    );
  }
}

function select(state) {
  let client = state.clients[Object.keys(state.clients)[0]];
  return {
    payment_history: client ? client.payment_history : {},
    monthly_home_payment: client ? client.monthly_home_payment : {}
  };
}

export default connect(select)(PaymentHistory);
