import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';
import {Link} from 'react-router';

import Menu from './Menu';

import colors from '../styles/colors';
import type from '../styles/type';
import buttons from '../styles/buttons';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    };
  }

  render() {
    const {name, email, isLoggedIn, picture} = this.props;
    return (
      <div className={css(styles.header)}>
        <Link to="/">OneSpace Hack</Link>
        {isLoggedIn &&
        <div>
          <div
            className="accountButton"
            onClick={() => this.setState({menuOpen: !this.state.menuOpen})}>
            <div
              className={css(styles.profilePicture)}
              style={{backgroundImage: `url("${picture || '/default-profile-picture.svg'}")`}}
            />
          </div>
          {this.state.menuOpen &&
          <div className={css(styles.menu)}>
            <Menu
              handleClose={(e) => {
                let el = e.target;
                let isButton = false;

                while (el.parentNode && !isButton) {
                  if(el.className.indexOf('accountButton') >= 0) {
                    isButton = true;
                  } else {
                    el = el.parentNode;
                  }
                }
                if (!isButton) {
                  this.setState({menuOpen: false});
                }
              }}
              options={[
                {label: 'Profile', href: '/account/profile'},
                {label: 'Account Settings', href: '/account/settings'},
                {label: 'Password', href: '/account/password'},
                {label: 'Sign out', href: '/logout', section: true}
              ]}
              top={(
                <div className={css(styles.menuTop)}>
                  <div
                    className={css(styles.profilePicture, styles.profilePictureLarge)}
                    style={{backgroundImage: `url("${picture || '/default-profile-picture.svg'}")`}}
                  />
                  <div style={{marginTop: 8, marginBottom: -6}} className={css(type.subHeading)}>{name}</div>
                  <div style={{color: '#999999'}}>{email}</div>
                </div>
              )}
            />
          </div>
          }
        </div>
        }
        {!isLoggedIn &&
        <div className={css(styles.right)}>
          <Link to="/login" className={css(buttons.text)} style={{marginRight: 16}}>Log in</Link>
          <Link to="/signup" className={css(buttons.small)}>Sign up</Link>
        </div>
        }
      </div>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    height: 56,
    paddingLeft: 16,
    paddingRight: 16,
    boxSizing: 'border-box',
    background: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
    borderBottom: `1px solid ${colors.divider}`
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    color: colors.dark,
    textDecoration: 'none',
    position: 'relative'
  },
  logo: {
    backgroundImage: 'url("/logo.svg")',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    height: 24,
    width: 88
  },
  url: {
    marginLeft: 8,
    backgroundImage: 'url("/teachok.svg")',
    fontSize: 0,
    width: 76,
    height: 16,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
  },
  menu: {
    position: 'absolute',
    right: 8,
    top: 58,
    ':before': {
      position: 'absolute',
      top: -13,
      right: 16,
      content: '"▲"',
      color: 'white',
      fontSize: 16,
      lineHeight: '14px',
      textShadow: '0 -1px 1px rgba(0,0,0,0.12)'
    }
  },
  menuTop: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    borderBottom: '1px solid #ececec'
  },
  profilePicture: {
    height: 32,
    width: 32,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '50%',
    cursor: 'pointer'
  },
  profilePictureLarge: {
    width: 80,
    height: 80
  },
  right: {
    display: 'flex',
    alignItems: 'center'
  },
  rightExtra: {
    display: 'none',
    '@media (min-width: 650px)': {
      display: 'flex'
    }
  },
  circle: {
    position: 'absolute',
    top: -8,
    left: -1,
    fontSize: 28,
    color: 'white'
  }
});

export default Header;
