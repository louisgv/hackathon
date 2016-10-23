import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import colors from '../../styles/colors';

class Admin extends Component {
  render() {
    return (
      <div style={{borderTop: `1px solid ${colors.border}`}}>
        <Header path={this.props.location.pathname}/>
        {this.props.children}
      </div>
    );
  }
}

export default connect()(Admin);
