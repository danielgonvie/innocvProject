import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/AuthService";


import "./Navbar.scss";

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.authService = new AuthService();
    this.state = {
      user: this.props.user
    };
  }

  handleLogout = e => {
    const { history } = this.props;
    
    e.preventDefault();
    this.authService.logout(this.state).then(
      () => {
        this.setState({user :null})
        history.push("/users");
      },
      error => {
        console.error(error);
      }
    );
  };

  render() {

    let navbar = <React.Fragment></React.Fragment>;
    if (this.state.user !== undefined && this.state.user !== null) {
      navbar = (
            <React.Fragment>
            <h1>Hola {this.state.user.name}</h1>
            <Link
              onClick={e => this.handleLogout(e)}
              to="/users"
            >
              <h2>Logout</h2>
            </Link>
            </React.Fragment>
      );
    } else {
      navbar = (
        <React.Fragment>
          <div className="">
            <Link
              to="/login"
            >
              <h2>Login</h2>
            </Link>
            <Link
              to="/signup"
            >
              <h2>SignUp</h2>
            </Link>
          </div>
        </React.Fragment>
      );
    }

    return (
      <nav className="main-navbar">
          <Link
            to="/users"
          >
            <img className="navbar-logo" src="https://www.innocv.com/wp-content/themes/innocv-twenty//images/innocv_logo_vertical.svg" alt="Logo"></img>
          </Link>
        {navbar}
      </nav>
    );
  }
}
