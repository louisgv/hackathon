import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';
import type from '../styles/type';

class PaymentHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    };
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
      </div>
    );
  }
}

const styles = StyleSheet.create({

});

export default PaymentHistory;
