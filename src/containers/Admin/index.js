import React, { Component } from 'react';
import {connect} from 'react-redux';

import Header from './Header';

class Admin extends Component {
  render() {
    return (
      <div>
        <Header path={this.props.location.pathname} />
        {this.props.children}
      </div>
    );
  }
}

export default connect()(Admin);
