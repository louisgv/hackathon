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
            Prevent evictions. Save money.
          </div>
          <div
            className={css(type.heading, styles.colorSwitch)}
            style={{textAlign: 'center', color: this.state.onButton ? colors.primary : colors.dark}}>
            Help end homelessness.
          </div>
          <div style={{textAlign: 'center', margin: '48px 0'}}>
            <Link
              to="/invite"
              onMouseEnter={() => this.setState({onButton: true})}
              onMouseLeave={() => this.setState({onButton: false})}
              className={css(buttons.xlarge)}>
              Invite a Tenant
            </Link>
            <a href="#more"className={css(buttons.xlarge, buttons.secondary)} style={{marginLeft: 16}}>Learn More</a>
          </div>
        </div>
        <div className={css(styles.fold)}>
          <div className={css(styles.foldItem)}>
            <div className={css(styles.foldItemHeader)}>Prevent evictions</div>
            <div className={css(styles.foldItemContent)}>
              You will not have to spend the time and money evicting people from their homes.
            </div>
          </div>
          <div className={css(styles.foldItem)}>
            <div className={css(styles.foldItemHeader)}>Save money</div>
            <div className={css(styles.foldItemContent)}>
              Get paid for missed months and don't worry about future missed payments because you'll get a lump sum.
            </div>
          </div>
          <div className={css(styles.foldItem)}>
            <div className={css(styles.foldItemHeader)}>Help end homelessness</div>
            <div className={css(styles.foldItemContent)}>
              You get paid, people have homes... Be the good guy.
            </div>
          </div>
        </div>
        <div id="more" className={css(styles.more)}>
          <div className={css(styles.moreHeader)}>An ounce of prevention is worth a pound of cure.</div>
          <div style={{marginTop: 32}}>Ounce of Prevention provides the financial resources to landlords to offset past due rent payments, allowing people to stay in their homes. Tenants pay what they can, when they can. Tenants win, Landlords win, and the public wins.</div>
          <div style={{marginTop: 32}}>It's expensive (<strong>$5,000+</strong>) and time consuming to evict a tenant. As a landlord, you want to collect rent and not worry about making that decision.</div>
          <div style={{marginTop: 32}}>It's tough to recover from losing your home. Tenants at risk need assistance to avoid falling into the vicious cycle that follows.</div>
          <div style={{marginTop: 32}}>Supporting homeless people is costly to the public (<strong>$15,000+ / year</strong>). Far more resources are required to support people without a solid foundation; preventative measures need to be taken to shut off the faucet pouring new people into homelessness.</div>
        </div>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    boxSizing: 'border-box'
  },
  more: {
    padding: 56,
    marginTop: 50,
    marginBottom: 300,
    fontSize: 20,
    lineHeight: '34px'
  },
  moreHeader: {
    fontSize: 50,
    lineHeight: '60px',
    textAlign: 'center',
    maxWidth: 800,
    margin: '0 auto'
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
