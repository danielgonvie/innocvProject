import React, { Component } from "react";
import AuthService from "../../services/AuthService";
import "./Login.scss";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }

  state = {
    username: "",
    password: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  };

  handleLogin = e => {
    const { setUser, history } = this.props;
    e.preventDefault();
    this.authService.login(this.state).then(
      user => {
        setUser(user);
        history.push("/");
      },
      error => {
        console.error(error);
      }
    );
  };

  render() {
    const { username, password } = this.state;
    //Multi-language
    let text1;
    let text2;
    let text3;
    
    if (this.props.lang === true){
      text1 = "Username"
      text2 = "Password"
      text3 = "LOGIN"
    } else{
      text1 = "Nombre de usuario"
      text2 = "Contraseña"
      text3 = "ACCESO"
    }

    return (
      <div className="login-container">
        <h1 className="login-title">{text3}</h1>
        <form className="login-form" onSubmit={this.handleLogin}>
          <div className="login-param">
            <label>{text1}</label>
            <input
              className="login-field"
              type="text"
              name="username"
              value={username}
              onChange={this.handleChange}
              required
              placeholder={text1}
            />
          </div>
          <div className="login-param">
            <label>{text2}</label>
            <input
              className="login-field"
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              required
              placeholder={text2}
            />
          </div>
          <input className="submit-button" type="submit" value={text3} />
        </form>
      </div>
    );
  }
}
