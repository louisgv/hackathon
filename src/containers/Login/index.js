import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { css } from 'aphrodite';
import { Link } from 'react-router';

import form from '../../styles/form';
import buttons from '../../styles/buttons';
import type from '../../styles/type';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false
    };
  }

  componentDidMount() {
    this.refs.email.focus();
  }

  _handleSubmit(e) {
    e.preventDefault();
    this.setState({ error: '', loading: true });
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    let newError = '';
    if (!user.email) {
      newError += 'Please provide your email address<br/>';
    }
    if (!user.password) {
      newError += 'Please provide your password<br/>';
    }
    if (newError) {
      return this.setState({ loading: false, error: newError });
    }
    fetch(`/login`, {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => {
        if (res.status > 200) {
          throw res.statusText;
        }
        return res.json();
      })
      .then(user => {
        if (!user || !user._id) {
          return this.setState({
            error: 'We were unable to log you in. Please try again',
            loading: false
          });
        }
        if (user.role === 'admin') {
          return window.location.href = '/admin';
        }
        window.location.href = '/';
      })
      .catch(error => this.setState({ error, loading: false }));
  }

  render() {
    const s = this.state;
    return (
      <div style={{position: 'relative'}}>
        <div style={{padding: '32px 16px', boxSizing: 'border-box'}}>
          <form className={css(form.main)} onSubmit={e => this._handleSubmit(e)}>
            {s.error &&
            <div className={css(form.error)} dangerouslySetInnerHTML={{__html: s.error}}/>
            }
            <div
              className={css(type.subHeading)}
              style={{textAlign: 'center', marginBottom: 16}}>
              Log in!
            </div>
            <input
              ref="email"
              className={css(form.input, form.inputLarge)}
              type="email"
              name="email"
              value={s.email}
              placeholder="Email"
              onChange={e => this.setState({email: e.target.value})}
            />
            <input
              className={css(form.input, form.inputLarge)}
              type="password"
              name="password"
              value={s.password}
              placeholder="Password"
              onChange={e => this.setState({password: e.target.value})}
            />
            <input className={css(buttons.large)} type="submit" value="Log in"/>
            <Link
              className={css(buttons.text)}
              style={{marginTop: 8, textAlign: 'center'}}
              to="/signup">
              Need to create an account? Click here.
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
