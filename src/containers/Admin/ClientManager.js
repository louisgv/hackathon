import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';

import { fetchClient, updateClient } from '../../actions/clients';
import type from '../../styles/type';

class ClientManager extends Component {
  componentDidMount() {
    this.props.dispatch(fetchClient(this.props.params.id));
  }

  updateClient(update) {
    this.props.dispatch(updateClient(this.props.params.id, update));
  }

  render() {
    const { client } = this.props;
    return (
      <div>
        <div className={css(type.title, styles.title)}>{client.name}</div>
        <div className={css(styles.wrapper)}>
          <div className={css(styles.left)}>
            <div className={css(type.subHeading)}>Personal Info</div>
          </div>
          <div className={css(styles.right)}>
          </div>
        </div>


        <input
          placeholder="Name"
          value={client.name}
          onChange={e => this.updateClient({name: e.target.value})}
        />
        <input
          placeholder="Email"
          disabled={true}
          value={client.email}
        />
        <input
          placeholder="Phone"
          value={client.phone}
          onChange={e => this.updateClient({phone: e.target.value})}
        />
        <div onClick={() => this.updateClient({status: 'approved'})}>Do The CoSign Thing</div>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginBottom: 32
  },
  wrapper: {
    display: 'flex',
    paddingLeft: 32,
    paddingRight: 32,
    boxSizing: 'border-box'
  },

  left: {
    flex: 1,
    paddingRight: 64,
    boxSizing: 'border-box'
  },

  right: {
    width: 384
  }
});

function select(state) {
  return {
    client: state.clients[state.router.params.id] || {}
  };
}
export default connect(select)(ClientManager);

// removing updating email, because the previous email was verified and we need to have one when cosigning
