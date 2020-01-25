import React, { Component } from 'react'
import AuthService from '../../services/AuthService';
import "./Login.scss"

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }

  state = {
    username: '',
    password: ''
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({...this.state, [name]:value})
  }

  handleLogin = (e) => {
    const { setUser, history } = this.props;
    e.preventDefault()
    this.authService.login(this.state)
    .then(
      (user) => {
        setUser(user)
        history.push("/")
      },
      (error) => {
        console.error(error)
      }
    )
  }

  render() {
    const { username, password } = this.state;
    return (

      <div className="login-container">
        <h1 className="login-title">LOGIN</h1>
        <form className="login-form" onSubmit={this.handleLogin}>
          <div className="login-param">
          <label>Username</label>
          <input className="login-field" type="text" name="username" value={username} onChange={this.handleChange} required placeholder="Username"/>
          </div>
          <div className="login-param">
          <label>Password</label>
          <input className="login-field" type="password" name="password" value={password} onChange={this.handleChange} required placeholder="Password"/>
          </div>
          <input className="submit-button" type="submit" value="LOGIN"/>
        </form>
        </div>
    )
  }
}

