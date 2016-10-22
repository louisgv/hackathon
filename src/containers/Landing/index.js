import React, {Component} from 'react';
import {Link} from 'react-router';
import {StyleSheet, css} from 'aphrodite';

import buttons from '../../styles/buttons';
import type from '../../styles/type';

class Landing extends Component {
  render() {
    return (
      <div className={css(styles.main)}>
        <div>
          {/*<div className={css(type.heading)}>Collect $$$. Don't evict.</div>*/}
          <div className={css(type.heading)}>Lorem Ipsum.</div>
          <div className={css(type.heading)}>Dolor sit amet.</div>
          <div className={css(type.subHeading)} style={{margin: '32px 0'}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
          <Link to="/invite" className={css(buttons.xlarge)}>Invite a Client</Link>
        </div>
        <img src="http://www.dummyimage.com/400x400" style={{float: 'right', marginLeft: 24}}/>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    padding: 16,
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 1150,
    margin: '40px auto 0'
  }
});

export default Landing;
