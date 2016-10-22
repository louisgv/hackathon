import React, { Component } from 'react';

class Admin extends Component {
  render() {
    return (
      <div>
        Admin
        {this.props.children}
      </div>
    );
  }
}

export default Admin;
