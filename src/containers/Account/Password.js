import React from 'react';
import {css} from 'aphrodite';
import fetch from 'isomorphic-fetch';

import form from '../../styles/form';
import type from '../../styles/type';
import buttons from '../../styles/buttons';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: '',
      newPassword: '',
      newPasswordC: '',
      error: null
    };
    this.updatePassword = this._updatePassword.bind(this);
  }

  render() {
    const {saving, saved, currentPassword, newPassword, newPasswordC, error} = this.state;
    const isReady = currentPassword && newPassword && newPasswordC;
    return (
      <div style={{position: 'relative'}}>
        <div
          style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 56}}>
          <div className={css(type.subHeading)}>Password</div>
          <div
            className={css(buttons.large, (!isReady && !saving && !saved) && buttons.disabled)}
            onClick={this.updatePassword}>
            {saving ?
              <i style={{fontSize: 18, lineHeight: '40px'}} className="fa fa-spinner fa-spin"/> :
              saved ? ( <i style={{fontSize: 18, lineHeight: '40px'}} className="fa fa-check"/>) :
                'Save changes'
            }
          </div>
        </div>
        {error &&
        <div
          style={{position: 'absolute', top: 48, width: '100%'}}
          className={css(form.error)}>
          {error}
        </div>
        }
        <div className={css(form.inline)}>
          <div className={css(form.inlineLabel)}>Current Password</div>
          <input
            type="password"
            className={css(form.inlineInput)}
            value={this.state.currentPassword}
            onChange={e => this.setState({currentPassword: e.target.value})}
          />
        </div>
        <div className={css(form.inline)}>
          <div className={css(form.inlineLabel)}>New Password</div>
          <input
            type="password"
            className={css(form.inlineInput)}
            value={this.state.newPassword}
            onChange={e => this.setState({newPassword: e.target.value})}
          />
        </div>
        <div className={css(form.inline)}>
          <div className={css(form.inlineLabel)}>Confirm New Password</div>
          <input
            type="password"
            className={css(form.inlineInput)}
            value={this.state.newPasswordC}
            onChange={e => this.setState({newPasswordC: e.target.value})}
          />
        </div>
      </div>
    );
  }

  _updatePassword() {
    this.setState({error: null});
    if (!this.state.currentPassword) {
      return this.setState({error: 'Please provide your current password'});
    }
    if (!this.state.newPassword || this.state.newPassword !== this.state.newPasswordC) {
      return this.setState({error: 'New passwords must match'});
    }
    this.setState({saving: true});
    fetch('/api/user/password', {
      method: 'put',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        currentPassword: this.state.currentPassword,
        newPassword: this.state.newPassword
      })
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error();
        }
        this.setState({
          saving: false,
          saved: true,
          currentPassword: '',
          newPassword: '',
          newPasswordC: ''
        }, () => {
          setTimeout(() => {
            this.setState({saved: false});
          }, 1200);
        });
      })
      .catch(() => this.setState({
        saving: false,
        error: 'Current password is incorrect. Please try again'
      }));
  }
}
