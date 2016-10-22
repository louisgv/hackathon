import React, {Component} from 'react';
import {css} from 'aphrodite';
import type from '../styles/type';

class ClientInfo extends Component {
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
        <div className={css(type.subHeading)}>Personal Information</div>
        <ul>
          <li>Name: {client.name}</li>
          <li>Email: {client.email}</li>
          <li>Phone: {client.phone}</li>
          <li>Race: {client.race}</li>
          <li>Name: {client.name}</li>
        </ul>
      </div>
    );
  }
}

export default ClientInfo;
