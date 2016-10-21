import React, {Component} from 'react';
import {css} from 'aphrodite';
import {Link} from 'react-router';

import form from '../../styles/form';
import buttons from '../../styles/buttons';
import type from '../../styles/type';
import ProgressBar from '../../components/ProgressBar';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      error: '',
      loading: false
    };
    this.handleSubmit = this._handleSubmit.bind(this);
  }

  render() {
    const s = this.state;
    return (
      <div>
        {s.loading && <ProgressBar />}
        <div style={{padding: '32px 16px', boxSizing: 'border-box'}}>
          <div
            className={css(type.subHeading)}
            style={{textAlign: 'center', marginBottom: 8}}>
            Create your account!
          </div>
          <form className={css(form.main)} onSubmit={this.handleSubmit}>
            {s.error &&
            <div className={css(form.error)} dangerouslySetInnerHTML={{__html: s.error}}/>
            }
            <div>First Name</div>
            <input
              className={css(form.input, s.firstName && form.inputGood)}
              placeholder="First Name"
              value={s.firstName}
              onChange={e => this.setState({firstName: e.target.value})}
            />
            <div>Last Name</div>
            <input
              className={css(form.input, s.lastName && form.inputGood)}
              placeholder="Last Name"
              value={s.lastName}
              onChange={e => this.setState({lastName: e.target.value})}
            />
            <div>Email</div>
            <input
              name="email"
              className={css(form.input, s.email && form.inputGood)}
              type="email"
              placeholder="Email Address"
              value={s.email}
              onChange={e => this.setState({email: e.target.value})}
            />
            <div>Password</div>
            <input
              name="password"
              className={css(form.input, s.password && form.inputGood)}
              type="password"
              placeholder="Password"
              value={s.password}
              onChange={e => this.setState({password: e.target.value})}
            />
            <input
              className={css(buttons.large)}
              type="submit"
              value="Create Account"
            />
            <Link
              className={css(buttons.text)}
              style={{marginTop: 8, textAlign: 'center'}}
              to="/login">
              Already have an account? Log in
            </Link>
          </form>
        </div>
      </div>
    );
  }

  _handleSubmit(e) {
    e.preventDefault();
    this.setState({loading: true, error: ''});
    const newUser = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    };
    let error = '';

    if (!newUser.first_name) {
      error += 'What is your first name?<br/>';
    }
    if (!newUser.last_name) {
      error += 'What is your last name?<br/>';
    }
    if (!newUser.last_name) {
      error += 'Please provide an email<br/>';
    }
    if (!newUser.password) {
      error += 'Please provide a password<br/>';
    } else if (newUser.password.length < 6) {
      error += 'Your password must be at least 6 characters long<br/>';
    }
    if (error) {
      return this.setState({loading: false, error});
    }

    newUser.reports = JSON.parse(localStorage.getItem('reports'));

    fetch('/register', {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(res => {
        if (res.status > 200) {
          throw res.statusText;
        }
        return res.json();
      })
      .then(user => {
        if (!user || !user._id) {
          return this.setState({loading: false, error: 'Something went wrong. Please try again'});
        }
        window.location.href = '/';
      })
      .catch(error => {
        this.setState({loading: false, error});
      });
  }
}

export default Signup;
