import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';

class Landing extends Component {
  render() {
    return (
      <div className={css(styles.main)}>
        landing
      </div>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    padding: 16,
    boxSizing: 'border-box'
  },
  learn: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingTop: 24,
    maxWidth: 1140,
    margin: 'auto'
  },
  messages: {
    flexBasis: 400,
    flexGrow: 1,
    background: '#F1F1F1',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
    paddingTop: 0,
    boxSizing: 'border-box',
    alignItems: 'flex-start',
    marginBottom: 24
  },
  about: {
    textAlign: 'center',
    flexGrow: 1
  },
  coin: {
    width: 32,
    height: 32,
    backgroundSize: 'contain',
    backgroundPosition: 'center'
  },
  reward: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 16
  },
  coinAmount: {
    fontSize: 16,
    marginLeft: 6
  }
});

export default Landing;
