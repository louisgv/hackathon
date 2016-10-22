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
      .then(invite => this.setState({ invite }));
  }

  render() {
    const { invite, accepted } = this.state;
    if (accepted) {
      return <div>Thanks, we will be in touch soon!</div>;
    }
    return (
      <div className={css(styles.main)}>
        <div style={{textAlign: 'center', fontSize: 40, lineHeight: '72px'}}>Hello {invite.client_name}!</div>
        <div className={css(type.heading)} style={{textAlign: 'center', marginBottom: '50px'}}>Welcome to The Situation.</div>
        <div className={css(buttons.large)} onClick={this.acceptInvitation}>ACCEPT INVITE</div>
      </div>
    );
  }

  acceptInvitation() {
    this.setState({ accepted: true });
    fetch(`/api/invite/${this.inviteId}/accept`, { method: 'put' });
  }
}

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 400,
    margin: '100px auto'
  }
});

export default InviteInfo;
