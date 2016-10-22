import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';

class Invite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      landlordName: '',
      landlordEmail: '',
      landlordPhone: '',
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      error: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    const s = this.state;
    if (s.inviteSent) {
      return <div>Invite Sent!!</div>;
    }
    return (
      <div>
        <div>Invite a tenant</div>
        {s.error && <div style={{color: 'red'}}>{s.error}</div>}
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Landlord Name"
            value={s.landlordName}
            onChange={e => this.setState({landlordName: e.target.value})}
          />
          <input
            placeholder="Landlord Email"
            value={s.landlordEmail}
            onChange={e => this.setState({landlordEmail: e.target.value})}
          />
          <input
            placeholder="Landlord Phone"
            value={s.landlordPhone}
            onChange={e => this.setState({landlordPhone: e.target.value})}
          />
          <input
            placeholder="Client Name"
            value={s.clientName}
            onChange={e => this.setState({clientName: e.target.value})}
          />
          <input
            placeholder="Client Email"
            value={s.clientEmail}
            onChange={e => this.setState({clientEmail: e.target.value})}
          />
          <input
            placeholder="Client Phone"
            value={s.clientPhone}
            onChange={e => this.setState({clientPhone: e.target.value})}
          />
        </form>
      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    const invite = {
      landlord_name: this.state.landlordName,
      landlord_email: this.state.landlordEmail,
      landlord_phone: this.state.landlordPhone,
      client_name: this.state.clientName,
      client_email: this.state.clientEmail,
      client_phone: this.state.clientPhone
    };
    if (!this.isValidInvite(invite)) {
      return this.setState({ error: 'Please fill out all fields' });
    }
    this.setState({ error: null, inviteSent: true });
    fetch('/api/invite', {
      method: 'post',
      body: JSON.stringify(invite)
    });
  }

  /* Ensure no fields are empty */
  isValidInvite(invite) {
    return !Object.keys(invite).find(v => !invite[v]);
  }
}

export default Invite;
