import React from 'react';
import {StyleSheet, css} from 'aphrodite';

export default ({type}) => <span className={css(styles.loading, styles[type])}/>;

const styles = StyleSheet.create({
  loading: {
    display: 'inline-block',
    overflow: 'hidden',
    height: '1.3em',
    marginTop: '-0.3em',
    lineHeight: '1.5em',
    verticalAlign: 'text-bottom',
    ':after': {
      display: 'inline-table',
      whiteSpace: 'pre',
      textAlign: 'left'
    }
  },
  openCircle: {
    ':after': {
      content: '"◜\\a ◠\\a ◝\\a ◞\\a ◡\\a ◟"',
      animationName: {
        'to': {
          transform: 'translateY( -9.0em)'
        }
      },
      animationDuration: '0.6s',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'steps(6)'
    }
  },
  dots: {
    ':after': {
      content: '"⠋\\a ⠙\\a ⠹\\a ⠸\\a ⠼\\a ⠴\\a ⠦\\a ⠧\\a ⠇\\a ⠏"',
      animationName: {
        'to': {
          transform: 'translateY(-15.0em)'
        }
      },
      animationDuration: '1s',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'steps(10)'
    }
  }
});
