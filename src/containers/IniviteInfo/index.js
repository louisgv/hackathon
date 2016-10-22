import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';

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
      <div>
        <div>Client would be able to "accept" invite here</div>
        <div>Hello {invite.client_name}!</div>
        <div>Welcome to The Situation.</div>
        <div onClick={this.acceptInvitation}>ACCEPT</div>
      </div>
    );
  }

  acceptInvitation() {
    this.setState({ accepted: true });
    fetch(`/api/invite/${this.inviteId}/accept`, { method: 'put' });
  }
}

export default InviteInfo;
