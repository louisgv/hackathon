import React from 'react';
import {StyleSheet, css} from 'aphrodite';

import colors from '../styles/colors';

export default () =>
  <div className={css(styles.progress)}>
    <div className={css(styles.fill)}/>
  </div>;

const styles = StyleSheet.create({
  progress: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 4,
    display: 'block',
    width: '100%',
    backgroundColor: colors.primaryLight,
    borderRadius: 2,
    backgroundClip: 'padding-box',
    margin: 0,
    overflow: 'hidden'
  },
  fill: {
    backgroundColor: colors.primary,
    ':before': {
      content: '""',
      position: 'absolute',
      backgroundColor: 'inherit',
      top: 0,
      left: 0,
      bottom: 0,
      willChange: 'left, right',
      animationName: {
        '0%': {
          left: '-35%',
          right: '100%'
        },
        '60%': {
          left: '100%',
          right: '-90%'
        },
        '100%': {
          left: '100%',
          right: '-90%;'
        }
      },
      animationDuration: '3.2s',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'cubic-bezier(0.65, 0.815, 0.735, 0.395)'
    },
    ':after': {
      content: '""',
      position: 'absolute',
      backgroundColor: 'inherit',
      top: 0,
      left: 0,
      bottom: 0,
      willChange: 'left, right',
      animationName: {
        '0%': {
          left: '-200%',
          right: '100%'
        },
        '60%': {
          left: '107%',
          right: '-8%'
        },
        '100%': {
          left: '107%',
          right: '-8%'
        }
      },
      animationDuration: '3.2s',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
      animationDelay: '1.15s'
    }
  }
});
