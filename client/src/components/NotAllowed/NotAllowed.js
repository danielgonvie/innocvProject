import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NotAllowed.scss";

export default class NotAllowed extends Component {
  render() {
    //Multi-language
    let text1;
    let text2;
    let text3;
    let text4;
    let text5;

    if (this.props.lang === true) {
      text1 = "Who are you?";
      text2 = "You are not supposed to be here!";
      text3 = "Maybe if I knew you...";
      text4 = "Nevermind, ";
      text5 = "go away!";
    } else {
      text1 = "¿Quien eres?";
      text2 = "No deberías estar aquí!";
      text3 = "A lo mejor, si te conociese..";
      text4 = "Da igual, ";
      text5 = "vete!";
    }

    return (
      <div className="not-allowed-panel">
        <img
          className="not-allowed-gif"
          src="https://media0.giphy.com/media/3oFzmfqgb0Nv1vfncA/giphy.gif?cid=790b76111d5c099e52be50e3f9b40a90cdb56ae56e2c07fe&rid=giphy.gif"
          alt="Suspicious"
        ></img>
        <h2 className="not-allowed-title">{text1} </h2>
        <p className="not-allowed-text">{text2}</p>

        <p className="not-allowed-text">{text3}</p>
        <p className="not-allowed-text">
          {text4}
          <Link to="/">{text5}</Link>
        </p>
      </div>
    );
  }
}
