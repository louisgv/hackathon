import React, { Component } from 'react';
import { css } from 'aphrodite';
import moment from 'moment';

import InputLabel from './InputLabel';
import colors from '../styles/colors';
import buttons from '../styles/buttons';
import type from '../styles/type';

class PaymentHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      paymentAmount: props.monthlyHomePayment || 0
    };
  }

  submitPayment() {
    const { paymentAmount } = this.state;
    if (!paymentAmount) {
      return;
    }
    this.setState({ paymentAmount: null });
    this.props.handleAddPayment(paymentAmount);
  }

  render() {
    const { paymentHistory } = this.props;
    return (
      <div
        style={{border: `1px solid ${colors.border}`, padding: '8px 16px 16px 16px', borderRadius: 4}}>
        <div className={css(type.subHeading)}>Payment History</div>
        {paymentHistory && paymentHistory.length ? paymentHistory.map((payment) => (
          <div key={payment._id} style={{display: 'flex'}}>
            <div style={{flex: 1}}>
              {moment(payment.paid_on).format('MMM Do, YYYY')}
            </div>
            <div style={{flex: 1}}>${payment.amount}</div>
          </div>
        ))
          :
          <div style={{textAlign: 'center', color: colors.light}}>No Payments</div>}
        <div style={{marginTop: 24}}>
          <InputLabel
            label="Make a payment"
            value={this.state.paymentAmount}
            handleChange={(val) => this.setState({paymentAmount: val})}
            handleEnter={() => this.submitPayment()}/>
          <div
            onClick={() => this.submitPayment()}
            className={css(buttons.large)}
          >Submit
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentHistory;
