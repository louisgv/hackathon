import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import colors from '../styles/colors';
import type from '../styles/type';

export default ({ label, value, handleChange, handleEnter }) => (
  <div className={css(styles.main)}>
    <div className={css(type.label, styles.label)}>{label}</div>
    <input
      className={css(styles.input)}
      value={value}
      onChange={e => handleChange(e.target.value)}
      onKeyPress={e => (!!handleEnter && e.key === 'Enter') && handleEnter()}
    />
  </div>
);

const styles = StyleSheet.create({
  main: {
    marginBottom: 16
  },
  label: {
    marginBottom: 4
  },
  input: {
    border: `1px solid ${colors.border}`,
    borderRadius: 4,
    height: 40,
    paddingLeft: 12,
    boxSizing: 'border-box',
    width: '100%',
    ':focus': {
      outline: 'none',
      border: `1px solid #C2C9D7`
    }
  }
});
