import React, { Component } from 'react'
import AuthService from '../../services/AuthService'
import "./Signup.scss"
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
        history.push("/")
      },
      (error) => {
        console.error(error)
      }
    )
  }


  render() {
    const { username, password, name, birthdate } = this.state;
    return (
      <div className="signup-container">
      <h1 className="signup-title">SIGNUP</h1>
        <form className="signup-form" onSubmit={this.handleSignUp}>
          <div className="signup-param">
          <label>Username </label>
          <input className="signup-field" type="text" name="username" value={username} required onChange={this.handleChange} placeholder="Username"/>
          </div>
          <div className="signup-param">
          <label>Password </label>
          <input className="signup-field" type="password" value={password} pattern="{4,20}"name="password" required onChange={this.handleChange} placeholder="Password > 4 chracters"/>
          </div>
          <div className="signup-param">
          <label>Name </label>
          <input className="signup-field" type="text" value={name} pattern="[A-Za-z_ áéíóú]{1,10}" name="name" required onChange={this.handleChange} placeholder="Name"/>
          </div>
          <div className="signup-param">
          <label>Birthdate </label>
          <input className="signup-field" type="date" value={birthdate} pattern="20\d{2}(-|\/)((0[1-9])|(1[0-2]))(-|\/)((0[1-9])|([1-2][0-9])|(3[0-1]))(T|\s)(([0-1][0-9])|(2[0-3])):([0-5][0-9]):([0-5][0-9])" name="birthdate" required onChange={this.handleChange} />
          </div>
          <input className="submit-button" type="submit" value="SIGNUP"/> 
        </form>
      </div>
    )
  }
}
