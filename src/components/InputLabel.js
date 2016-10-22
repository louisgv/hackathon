import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import colors from '../styles/colors';
import type from '../styles/type';

export default ({ label, value, handleChange }) => (
  <div className={css(styles.main)}>
    <div className={css(type.label, styles.label)}>{label}</div>
    <input
      className={css(styles.input)}
      value={value}
      onChange={e => handleChange(e.target.value)}
    />
  </div>
);

const styles = StyleSheet.create({
  main: {
    marginBottom: 16
  },
  label: {
    marginBottom: 2
  },
  input: {
    border: `1px solid ${colors.border}`,
    borderRadius: 2,
    height: 32,
    paddingLeft: 8,
    boxSizing: 'border-box',
    width: '100%',
    ':focus': {
      outline: 'none'
    }
  }
});
