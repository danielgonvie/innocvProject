import React, { Component } from "react";
import { slide as Menu } from "react-burger-menu";
import "./Sidebar.scss";
import { Link } from "react-router-dom";
import AuthService from "../../services/AuthService";

export default class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.authService = new AuthService();
    this.state = {
      user: this.props.user
    };
  }


  render() {
    let navbar = <React.Fragment></React.Fragment>;
    if (this.state.user !== undefined && this.state.user !== null) {
      navbar = (
        <React.Fragment>
          <h1>Hola {this.state.user.name}</h1>
          <Link onClick={e => this.props.logout(e)} to="/">
            <h2>Logout</h2>
          </Link>
        </React.Fragment>
      );
    } else {
      navbar = (
        <React.Fragment>
          <div >
            <Link className="sidebar-link" to="/login">
              <h2 className="sidebar-option">Login</h2>
            </Link>
            <Link className="sidebar-link" to="/signup">
              <h2 className="sidebar-option">SignUp</h2>
            </Link>
          </div>
        </React.Fragment>
      );
    }

    return (
      <div className="mobile-navbar">
        <div className="navbar-container">
        <Link className="logo-link" to="/">
          <img
            className="navbar-logo"
            src="https://www.innocv.com/wp-content/themes/innocv-twenty//images/innocv_logo_vertical.svg"
            alt="Logo"
          ></img>
        </Link>
        </div>
        <Menu>
        {navbar}
        <div className="sidebar-footer">
        <h3> Made by <img className="github-logo" src="images/github.svg" alt="github logo"></img>danielgonvie</h3>
        </div></Menu>
      </div>
    );
  }
}
