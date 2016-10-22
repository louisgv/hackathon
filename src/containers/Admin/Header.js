import React from 'react';
import {StyleSheet, css} from 'aphrodite';

export default () => (
  <div>
    <div className={css(styles.container)}>
      <div className={css(styles.nav)}>
        <a href="/admin" className={css(styles.links)}>Clients</a>
        <a className={css(styles.links)}>Data</a>
        <a className={css(styles.links)}>Account</a>
      </div>
    </div>
  </div>
);

const styles = StyleSheet.create({
  container: {
    background: '#F1F1F1',
    padding: '10px 0'
  },
  nav: {
    width: '80%',
    margin: '0 auto'
  },
  links: {
    marginRight: '50px',
    textDecoration: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    color: '#0E0E0E'
  }
});
