import React, { Component } from 'react'
import AuthService from '../../services/AuthService';
import "./Login.scss"
import { Link } from 'react-router-dom';

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
        history.push("/users")
      },
      (error) => {
        console.error(error)
      }
    )
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className="">
      <Link  className="" to="/">
      <h1 className="">⇠ Volver</h1>
      </Link>
      <div className="">
        <h1 className="">Login User</h1>
        
        <form className="" onSubmit={this.handleLogin}>
          <label className="">Username: </label>
          <input className="" type="text" name="username" value={username} onChange={this.handleChange}/>
          <label className="" >Password: </label>
          <input className="" type="password" name="password" value={password} onChange={this.handleChange}/>
          <div className="">
          <input className="" type="submit" value="Login"/>
          </div>
        </form>
        </div>
      
      </div>
    )
  }
}

