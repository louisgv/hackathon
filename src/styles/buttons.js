import { StyleSheet } from 'aphrodite';

import colors from './colors';

const button = {
  display: 'inline-block',
  background: colors.primary,
  color: 'white',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  textDecoration: 'none',
  border: 'none',
  '-webkitAppearance': 'none',
  ':focus': {
    outline: 'none',
    boxShadow: '0 2px 4px rgba(0, 255, 67, 0.32)'
  },
  ':hover': {
    boxShadow: '0 0 3px rgba(0,0,0,0.08),0 3px 6px rgba(0,0,0,0.16)'
  }
};

export default StyleSheet.create({
  xlarge: {
    ...button,
    background: 'white',
    border: `2px solid ${colors.primary}`,
    color: colors.primary,
    alignSelf: 'center',
    fontSize: 20,
    height: 54,
    lineHeight: '54px',
    paddingLeft: 24,
    paddingRight: 24,
    borderRadius: 4,
    boxShadow: 'none',
    ':focus': {
      boxShadow: 'none'
    },
    ':hover': {
      boxShadow: 'none',
      background: colors.primary,
      color: 'white'
    }
  },
  large: {
    ...button,
    alignSelf: 'center',
    fontSize: 16,
    height: 40,
    lineHeight: '36px',
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 4
  },
  small: {
    ...button,
    fontSize: 12,
    lineHeight: '24px',
    height: 24,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 2
  },
  secondary: {
    ...button,
    background: 'white',
    color: colors.secondary,
    border: `2px solid ${colors.secondary}`
  },
  text: {
    textDecoration: 'none',
    fontSize: 12,
    cursor: 'pointer',
    color: colors.dark,
    ':focus': {
      outline: 'none'
    },
    ':hover': {
      color: 'black'
    }
  },
  disabled: {
    background: '#D8D8D8'
  }
});
