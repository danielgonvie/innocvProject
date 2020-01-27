import React, { Component } from "react";
import AuthService from "../../services/AuthService";
import "./Signup.scss";
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }

  state = {
    username: "",
    password: "",
    name: "",
    birthdate: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  };

  handleSignUp = e => {
    e.preventDefault();
    const { history, setUser } = this.props;
    this.authService.signup(this.state).then(
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
    const { username, password, name, birthdate } = this.state;

    //Multi-language
    let text1;
    let text2;
    let text3;
    let text4;
    let text5;
    let text6;
    let text7;

    if (this.props.lang === true) {
      text1 = "SIGNUP";
      text2 = "Username";
      text3 = "Password";
      text4 = "Name";
      text5 = "Password > 4 chracters";
      text6 = "Name up to 10 characters";
      text7 = "Birthdate";
    } else {
      text1 = "REGISTRO";
      text2 = "Nombre de usuario";
      text3 = "Contraseña";
      text4 = "Nombre";
      text5 = "Contraseña mayor de 4 caracteres";
      text6 = "Nombre de hasta 10 letras";
      text7 = "Fecha de nacimiento";
    }

    return (
      <div className="signup-container">
        <h1 className="signup-title">{text1}</h1>
        <form className="signup-form" onSubmit={this.handleSignUp}>
          <div className="signup-param">
            <label>{text2} </label>
            <input
              className="signup-field"
              type="text"
              name="username"
              value={username}
              required
              onChange={this.handleChange}
              placeholder={text2}
            />
          </div>
          <div className="signup-param">
            <label>{text3} </label>
            <input
              className="signup-field"
              type="password"
              value={password}
              pattern="{4,20}"
              name="password"
              required
              onChange={this.handleChange}
              placeholder={text5}
            />
          </div>
          <div className="signup-param">
            <label>{text4} </label>
            <input
              className="signup-field"
              type="text"
              value={name}
              pattern="[A-Za-z_ áéíóú]{1,10}"
              name="name"
              required
              onChange={this.handleChange}
              placeholder={text6}
            />
          </div>
          <div className="signup-param">
            <label>{text7} </label>
            <input
              className="signup-field"
              type="date"
              value={birthdate}
              pattern="20\d{2}(-|\/)((0[1-9])|(1[0-2]))(-|\/)((0[1-9])|([1-2][0-9])|(3[0-1]))(T|\s)(([0-1][0-9])|(2[0-3])):([0-5][0-9]):([0-5][0-9])"
              name="birthdate"
              required
              onChange={this.handleChange}
            />
          </div>
          <input className="submit-button" type="submit" value={text1} />
        </form>
      </div>
    );
  }
}
