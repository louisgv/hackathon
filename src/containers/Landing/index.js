import React, { Component } from 'react';
import { Link } from 'react-router';
import { StyleSheet, css } from 'aphrodite';

class Landing extends Component {
  render() {
    return (
      <div className={css(styles.main)}>
        <Link to="/invite">Invite a Client</Link>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    padding: 16,
    boxSizing: 'border-box'
  }
});

export default Landing;
