import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import {StyleSheet, css} from 'aphrodite';

import buttons from '../../styles/buttons';
import type from '../../styles/type';


class InviteInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invite: {}
    };
    this.inviteId = window.location.pathname.split('/')[2];
    this.acceptInvitation = this.acceptInvitation.bind(this);
  }

  componentDidMount() {
    fetch(`/api/invite/${this.inviteId}`)
      .then(res => res.json())
      .then(invite => this.setState({ invite }))
      .then(this.renderAnimation());
  }

  render() {
    const { invite, accepted } = this.state;
    if (accepted) {
      return <div>Thanks, we will be in touch soon!</div>;
    }
    return (
      <div className={css(styles.main)}>
        <div style={{width: '1100px', margin: '0 auto', border: '1px solid #CCC', padding: 25, boxShadow:'1px 1px 10px #CCC', borderRadius: 10}}>
          <div className={css(styles.header)}>Invitation</div>
          <div style={{ width: '50%', display: 'inline-block', 'vertical-align': 'top' }}>
            <div style={{textAlign: 'left', fontSize: 28, fontWeight: 600}}>Hello {invite.client_name}!</div>
            <div style={{marginTop: '25px', fontSize: 22, width: '100%'}}>OOP is dedicated to preventing clients from losing their homes in time of need.</div>
          </div>
          <div style={{textAlign: 'center', marginBottom: '40px', display: 'inline-block', width: '50%', marginTop:'10%'}}>
            <div style={{fontSize: 24, fontWeight: 600}}>How It Works</div>
            <div style={{fontSize: 22, fontWeight: 400}}>OOP takes on responsibility of your payments for an agreed upon time frame.</div>
            <div style={{width: '100%'}}>
              <div style={{textAlign: 'center', fontSize: 24, marginTop: '70px', position: 'relative'}}>
                <div style={{display: 'inline-block', marginRight: '7%'}}>Tenant</div>
                <div style={{display: 'inline-block', marginLeft: '7%'}}>OOP</div>
                <div style={{marginTop: '15%'}}>Landlord</div>
                <div ref="pointerlink" className={css(styles.pointerLine, styles.animate)}></div>
              </div>
            </div>
          </div>
          <div style={{float: 'left', marginTop: '-17%', width: '35%', fontSize: '22px', fontWeight: '300'}}>
            <div>Once this invitation has been accepted, you will be contacted by a CoC professional to complete the sign up process. </div>
          </div>
          <div style={{width: '100%', textAlign: 'center', clear: 'both'}}>
            <div className={css(buttons.large)} onClick={this.acceptInvitation}>ACCEPT INVITE</div>
          </div>
        </div>
      </div>
    );
  }

  acceptInvitation() {
    this.setState({ accepted: true });
    fetch(`/api/invite/${this.inviteId}/accept`, { method: 'put' });
  }

  renderAnimation(){
    this.refs.pointerlink.className += ' animate';
  }
}

const keyframes = {
  'from': {
    opacity: 0,
    transform: `translate3d(0, 2000px, 0) scale(-0.01)`
  },
  'to': {
    opacity: 1,
    transform: 'none',
  }
};

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    margin: '25px auto'
  },
  header:{
    width: '100%',
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 400,
    marginBottom:'5%',
    borderBottom: '1px solid #CCC',
    paddingBottom: 10
  },
  pointerLine: {
    border: '1px solid green !important',
    width: '90px !important',
    position: 'absolute',
    top: '75%',
    transform: 'rotate(45deg)',
    'transform-origin': '100%',
    '-webkit-animation-fill-mode': 'forwards',
    display: 'inline-block',
    right: '50%'
  },
  animate: {
    animationName: {
      '0%': {
        transform: 'rotate(45deg)',
        'transform-origin': '100%'
      },
      '100%': {
        transform: 'rotate(135deg)',
        'transform-origin': '100%'
      },
    },
    animationDuration: '3.2s'
  }
});

export default InviteInfo;
