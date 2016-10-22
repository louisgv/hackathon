import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import colors from '../styles/colors';
import type from '../styles/type';

export default ({ label, value, handleChange, options }) => (
  <div className={css(styles.main)}>
    <div className={css(type.label, styles.label)}>{label}</div>
    <select
      className={css(styles.input)}
      value={value}
      onChange={e => handleChange(e.target.value)}>
      {options.map((option, i) => (
        <option key={i} value={option.value}>{option.label}</option>
      ))}
    </select>
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
    background: 'white',
    width: '100%',
    ':focus': {
      outline: 'none'
    }
  }
});
