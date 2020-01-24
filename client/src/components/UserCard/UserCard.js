import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./UserCard.scss";

export default class UserCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user
    };
  }

  render() {
    return (
      <div className="usercard-container">
        <div className="name-card">
        <Link className="name-link" to={"/users/" + this.props.user._id}>
        <h3>{this.props.user.name}</h3>
        </Link>
        </div>
        <div className="delete-card">
        <img className="delete-img" src="images/cross.svg" alt="delete"></img>
        </div>
      </div>
    );
  }
}
