import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, css} from 'aphrodite';

import {brandon} from '../../styles/type';
import layout from '../../styles/layout';
import Header from '../../components/Header';

class App extends Component {
  componentDidMount() {
    const classNames = document.getElementById('classNames').innerHTML;
    if (classNames) {
      StyleSheet.rehydrate();
    }
  }

  render() {
    const {user, loading} = this.props;
    return (
      <div className={css(styles.main, layout.main)}>
        <Header
          isLoggedIn={!!user._id}
          name={user.name}
          email={user.email}
          picture={user.picture}
          loading={loading}
        />
        {this.props.children}
      </div>
    );
  }
}


const styles = StyleSheet.create({
  main: {
    fontFamily: [brandon, 'sans-serif'],
    fontSize: 13,
    lineHeight: '24px',
    color: '#3c3c3c',
    '-webkitFontSmoothing': 'antialiased',
    'MozMacOsxFontSmoothing': 'antialiased'
  }
});

function select(state, dd) {
  return {
    user: state.app.currentUser ? state.users[state.app.currentUser] : {},
    location: dd.location.pathname,
    loading: !!Object.keys(state.app.pendingLoads).length
  };
}

export default connect(select)(App);
