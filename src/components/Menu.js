import React, {Component, PropTypes} from 'react';
import {StyleSheet, css} from 'aphrodite';
import onClickOutside from 'react-onclickoutside';

import colors from '../styles/colors';

/*
 * Menu
 * Drop-down menu with a list of options
 *   - Does NOT maintain if open or closed.
 *   - Supports clicking outside to update closed
 */

class Menu extends Component {
  handleClickOutside(e) {
    if (this.props.handleClose) {
      this.props.handleClose(e);
    }
  }

  render() {
    const {options, top} = this.props;
    return (
      <div className={css(styles.main)}>
        {top}
        {options.map((option, i) => {
          if (option.href) {
            return (
              <a
                href={option.href}
                key={i}
                className={css(styles.option, option.section && styles.section)}>
                {option.label}
              </a>
            );
          }
          return (
            <div
              onClick={() => {
                if (option.handleClick) {
                  option.handleClick();
                }
              }}
              key={i}
              className={css(styles.option, option.section && styles.section)}>
              {option.label}
            </div>
          );
        })}
      </div>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    minWidth: 200,
    background: 'white',
    boxShadow: '0 1px 2px rgba(0,0,0,0.2), 0 0 8px rgba(0,0,0,0.08)'
  },
  option: {
    height: 40,
    paddingLeft: 16,
    paddingRight: 16,
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    fontSize: 15,
    cursor: 'pointer',
    textDecoration: 'none',
    color: colors.dark,
    ':hover': {
      background: '#EEEEEE'
    }
  },
  section: {
    borderTop: '1px solid #ececec'
  }
});

Menu.propTypes = {
  handleClose: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    href: PropTypes.string,
    handleClick: PropTypes.func
  }))
};

Menu.defaultProps = {
  options: []
};

export default onClickOutside(Menu);
