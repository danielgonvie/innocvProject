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
          <h2>Hi {this.state.user.name}!</h2>
          <br></br>
          <Link onClick={e => this.props.logout(e)} to="/">
            <div className="sidebar-option">
              <h2 className="sidebar-title">Logout</h2>
              <img
                className="authentication-logo"
                src="/images/logout.svg"
                alt="Logo"
              ></img>
            </div>
          </Link>
        </React.Fragment>
      );
    } else {
      navbar = (
        <React.Fragment>
          <div>
            <Link className="sidebar-link" to="/login">
              <div className="sidebar-option">
                <h2 className="sidebar-title">Login</h2>
                <img
                  className="authentication-logo"
                  src="/images/login.svg"
                  alt="Logo"
                ></img>
              </div>
            </Link>
            <br></br>
            <Link className="sidebar-link" to="/signup">
              <div className="sidebar-option">
                <h2 className="sidebar-title">SignUp</h2>
                <img
                  className="authentication-logo"
                  src="/images/signup.svg"
                  alt="Logo"
                ></img>
              </div>
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
          <Link to="/secret">
            <h1 className="sidebar-top-secret-panel">Top Secret Panel</h1>
          </Link>
          <div className="sidebar-footer">
            <h3 className="credits">
              {" "}
              Made by{" "}
              <img
                className="github-logo"
                src="images/github.svg"
                alt="github logo"
              ></img>
              danielgonvie
            </h3>
          </div>
        </Menu>
      </div>
    );
  }
}
