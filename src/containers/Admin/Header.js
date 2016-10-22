import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import colors from '../../styles/colors';

export default ({ path }) => (
  <div>
    <div className={css(styles.container)}>
      <div className={css(styles.nav)}>
        <a
          href="/admin"
          className={css(styles.links, (/(\/admin\/client).*/g.test(path) || path === '/admin') && styles.linksSelected)}>
          Clients
        </a>
        <a className={css(styles.links)}>Data</a>
        <a className={css(styles.links)}>Account</a>
      </div>
    </div>
  </div>
);


const styles = StyleSheet.create({
  container: {
    background: '#F1F1F1',
    paddingLeft: 40,
    paddingRight: 40,
    display: 'flex',
    alignItems: 'center',
    height: 40
  },
  nav: {
    display: 'flex',
    alignItems: 'center'
  },
  links: {
    paddingLeft: 16,
    paddingRight: 16,
    textDecoration: 'none',
    cursor: 'pointer',
    fontSize: 14,
    color: colors.dark,
    fontWeight: 600
  },
  linksSelected: {
    color: colors.primary
  }
});
