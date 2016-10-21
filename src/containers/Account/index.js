import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import update from 'react-addons-update';

import colors from '../../styles/colors';
import {updateUser} from '../../actions/user';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: Object.assign({}, props.user),
      hasChanges: false,
      saving: false,
      saved: false
    };
    this.saveChanges = this._saveChanges.bind(this);
  }

  updateUser(u) {
    this.setState({user: update(this.state.user, {$merge: u})});
  }

  hasChanges() {
    const changedKey = Object.keys(this.state.user).find(key => key !== 'updatedAt' && typeof this.state.user[key] === 'string' && this.state.user[key] !== this.props.user[key]);
    return !!changedKey;
  }

  render() {
    const user = this.state.user;
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        user,
        handleSaveChanges: this.saveChanges,
        handleUpdateUser: update => this.updateUser(update),
        hasChanges: this.hasChanges(),
        saving: this.state.saving,
        saved: this.state.saved
      }));
    const pathname = this.props.location.pathname;
    return (
      <div className={css(styles.main)}>
        <div className={css(styles.card)} style={{flex: 1}}>
          {childrenWithProps}
        </div>
        <div className={css(styles.card, styles.links)} style={{width: 260}}>
          <Link
            to="/account/profile"
            className={css(styles.link, pathname === '/account/profile' && styles.linkSelected)}>
            Profile
          </Link>
          <Link
            to="/account/settings"
            className={css(styles.link, pathname === '/account/settings' && styles.linkSelected)}>
            Account
          </Link>
          <Link
            to="/account/password"
            className={css(styles.link, pathname === '/account/password' && styles.linkSelected)}>
            Password
          </Link>
        </div>
      </div>
    );
  }

  _saveChanges() {
    if (this.hasChanges()) {
      this.setState({saving: true});
      this.props.dispatch(updateUser(this.state.user))
        .then(() => {
          this.setState({saving: false, saved: true}, () => {
            setTimeout(() => {
              this.setState({saved: false});
            }, 1200);
          });
        });
    }
  }
}

const styles = StyleSheet.create({
  main: {
    background: colors.background,
    flex: 1,
    padding: '32px 16px',
    display: 'flex',
    alignItems: 'flex-start',
    marginLeft: -8,
    marginRight: -8
  },
  card: {
    background: 'white',
    borderRadius: 3,
    boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
    boxSizing: 'border-box',
    marginLeft: 8,
    marginRight: 8,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '100%',
    padding: 16,
    '@media (min-width: 650px)': {
      padding: 32
    }
  },
  links: {
    display: 'none',
    '@media (min-width: 650px)': {
      display: 'flex'
    }
  },
  link: {
    height: 40,
    lineHeight: '40px',
    textDecoration: 'none',
    color: colors.dark,
    paddingLeft: 32,
    boxSizing: 'border-box'
  },
  linkSelected: {
    background: '#EEEEEE'
  }
});

function select(state) {
  return {
    user: state.app.currentUser ? state.users[state.app.currentUser] : {}
  };
}
export default connect(select)(Account);
