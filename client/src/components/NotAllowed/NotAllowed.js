import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NotAllowed.scss";

export default class NotAllowed extends Component {
  render() {
    return (
      <div className="not-allowed-panel">
        <img
          className="not-allowed-gif"
          src="https://media0.giphy.com/media/3oFzmfqgb0Nv1vfncA/giphy.gif?cid=790b76111d5c099e52be50e3f9b40a90cdb56ae56e2c07fe&rid=giphy.gif"
          alt="Suspicious"
        ></img>
        <h2 className="not-allowed-title">Who are you? </h2>
        <p className="not-allowed-text">You are not supposed to be here!</p>

        <p className="not-allowed-text">Maybe if I knew you...</p>
        <p className="not-allowed-text">
          Nevermind, <Link to="/">go away!</Link>
        </p>
      </div>
    );
  }
}
