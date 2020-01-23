import React, { Component } from 'react'
import AuthService from '../../services/AuthService'
import "./Signup.scss"
import { Link } from 'react-router-dom'
export default class SignUp extends Component {
  constructor(props) {
    super(props)
    this.authService = new AuthService();
  }

  state = {
    username: '',
    password: '',
    name: '',
    birthdate: '',
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({...this.state, [name]:value})
  }

  handleSignUp = (e) => {
    e.preventDefault()
    const { history, setUser } = this.props;
    this.authService.signup(this.state)
    .then(
      (user) => {
        setUser(user);
        history.push("/users")
      },
      (error) => {
        console.error(error)
      }
    )
  }


  render() {
    const { username, password, name, birthdate } = this.state;
    return (
      <div className="">
            <Link className="" to="/">
      <h1 className="">⇠ Volver</h1>
      </Link>
      <div className="">
      <h1 className="">SignUp</h1>
        <form className="" onSubmit={this.handleSignUp}>
          <label className="" >Username: </label>
          <input className="" type="text" name="username" value={username} required onChange={this.handleChange}/>
          <label className="">Password: </label>
          <input className="" type="password" value={password} name="password" required onChange={this.handleChange}/>
          <label className="">Name: </label>
          <input className="" type="text" value={name} name="name" required onChange={this.handleChange}/>
          <label className="">Birthdate: </label>
          <input className="" type="text" value={birthdate} name="birthdate" required onChange={this.handleChange}/>
          <input className="signup-button" type="submit" value="Create account"/> 
        </form>
      </div>
      </div>
    )
  }
}
