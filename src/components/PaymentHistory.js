import React, { Component } from 'react';
import { css } from 'aphrodite';
import type from '../styles/type';
import { connect } from 'react-redux';

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
    this.props.dispatch(addPayment(this.props.client._id, paymentAmount));
  }

  render() {
    const { client } = this.props;
    return (
      <div style={{minWidth: '50%'}}>
        <div className={css(type.subHeading)}>Payment History</div>
        {
          client.paymentHistory && client.paymentHistory.length ?
            <ul>
              client.paymentHistory.forEach( ( payment ) => <li>payment.amount</li> )
            </ul>
            :
            <div>NO PAYMENTS MADE</div>
        }
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
  return {
    client: state.clients[Object.keys(state.clients)[0]] || {}
  };
}

export default connect(select)(PaymentHistory);
