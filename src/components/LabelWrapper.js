import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import type from '../styles/type';

export default ({ label, children }) => (
  <div className={css(styles.main)}>
    <div className={css(type.label, styles.label)}>{label}</div>
    {children}
  </div>
);

const styles = StyleSheet.create({
  main: {
    marginBottom: 16
  },
  label: {
    marginBottom: 4
  }
});
