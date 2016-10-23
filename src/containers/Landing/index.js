import React, { Component } from 'react';
import { Link } from 'react-router';
import { StyleSheet, css } from 'aphrodite';

import colors from '../../styles/colors';
import buttons from '../../styles/buttons';
import type from '../../styles/type';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onButton: false
    };
  }

  render() {
    return (
      <div className={css(styles.main)}>
        <div style={{maxWidth: 1150, margin: '40px auto 0', padding: 16}}>
          {/*<div className={css(type.heading)}>Collect $$$. Don't evict.</div>*/}
          <div style={{textAlign: 'center', fontSize: 40, lineHeight: '72px'}}>
            Collect payments. Avoid evictions.
          </div>
          <div
            className={css(type.heading, styles.colorSwitch)}
            style={{textAlign: 'center', color: this.state.onButton ? colors.primary : colors.dark}}>
            Be the good landlord.
          </div>
          <div style={{textAlign: 'center', margin: '48px 0'}}>
            <Link
              to="/invite"
              onMouseEnter={() => this.setState({onButton: true})}
              onMouseLeave={() => this.setState({onButton: false})}
              className={css(buttons.xlarge)}>
              Invite a Client
            </Link>
          </div>
        </div>
        <div className={css(styles.fold)}>
          <div className={css(styles.foldItem)}>
            <div className={css(styles.foldItemHeader)}>Collect Payments</div>
            <div className={css(styles.foldItemContent)}>
              Get paid for months already missed and don't worry about future missed payments because you'll get a lump sum.
            </div>
          </div>
          <div className={css(styles.foldItem)}>
            <div className={css(styles.foldItemHeader)}>Avoid Evictions</div>
            <div className={css(styles.foldItemContent)}>
              You will not have to spend the time and money evicting people from their homes.
            </div>
          </div>
          <div className={css(styles.foldItem)}>
            <div className={css(styles.foldItemHeader)}>Be the good landlord</div>
            <div className={css(styles.foldItemContent)}>
              You get paid, people have homes... Be the good guy.
            </div>
          </div>
        </div>
        {/*<img src="http://www.dummyimage.com/400x400" style={{float: 'right', marginLeft: 24}}/>*/}
      </div>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    boxSizing: 'border-box'
  },
  fold: {
    borderTop: '1px solid gray',
    background: '#f5f5f5'
  },
  foldItem: {
    padding: 56,
    borderBottom: '1px solid gray'
  },
  foldItemHeader: {
    fontSize: 40,
    lineHeight: '72px'
  },
  foldItemContent: {
    fontSize: 24,
    lineHeight: '32px'
  },
  colorSwitch: {
    transition: 'all 0.32s ease'
  }
});

export default Landing;
