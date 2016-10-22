import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';

import InputLabel from '../../components/InputLabel';
import SelectLabel from '../../components/SelectLabel';
import { fetchClient, updateClient } from '../../actions/clients';
import type from '../../styles/type';
import races from '../../constants/races';

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
            <div className={css(styles.section)}>
              <div className={css(type.subHeading, styles.heading)}>Personal Information</div>
              <InputLabel
                value={client.name}
                label="Name"
                handleChange={name => this.updateClient({name})}
              />
              <InputLabel
                value={client.email}
                label="Email Address"
                handleChange={email => this.updateClient({email})}
              />
              <InputLabel
                value={client.phone}
                label="Phone Number"
                handleChange={phone => this.updateClient({phone})}
              />
              <SelectLabel
                label="Race"
                value={client.race}
                options={races.map(race => ({label: race, value: race}))}
                handleChange={race => this.updateClient({race})}
              />
            </div>
            <div className={css(styles.section)}>
              <div className={css(type.subHeading, styles.heading)}>Home Information</div>
            </div>
          </div>
          <div className={css(styles.right)}>
          </div>
        </div>


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
  heading: {
    marginBottom: 8
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
  },

  section: {
    marginBottom: 40
  }
});

function select(state) {
  return {
    client: state.clients[state.router.params.id] || {}
  };
}
export default connect(select)(ClientManager);

// removing updating email, because the previous email was verified and we need to have one when cosigning
