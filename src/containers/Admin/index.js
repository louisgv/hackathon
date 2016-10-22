import React, { Component } from 'react';

class Admin extends Component {
  render() {
    return (
      <div>
        <div>Admin Console</div>
        {this.props.children}
      </div>
    );
  }
}

export default Admin;
