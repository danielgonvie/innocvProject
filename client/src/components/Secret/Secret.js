import React, { Component } from "react";
import "./Secret.scss";
import { Link } from "react-router-dom";

export default class Secret extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    };
  }

  render() {
    return (
      <div className="secret-panel">
        <h1>Hey, welcome!</h1>
        <p>We were waiting for you, {this.props.user.name}</p>
        <img
          className="allowed-gif"
          src="https://media0.giphy.com/media/u4CY9BW4umAfu/giphy.gif?cid=790b76110913e499a138cc3331a858389b84cf6baa66c34d&rid=giphy.gif"
          alt="Party"
        ></img>
        <div className="allowed-jokes">
            <h2 className="jokes-title">Now you have access to all this bad jokes, congratulations!</h2>
            <p className="joke"> Why don’t they play poker in the jungle? Too many cheetahs!</p>
            <p className="joke"> What do you call a can opener that doesn't work? A can't opener!</p>
            <p className="joke"> You know what the loudest pet you can get is? A trumpet.</p>
            <p className="joke"> Why did the scarecrow win an award? He was outstanding in his field.</p>
            <p className="joke"> What did the buffalo say when his son left? Bison!</p>
            <p className="joke"> What do you call a fish with no eye? Fsh! </p>
            <p className="joke"> A communist joke isn’t funny… … unless everyone gets it. </p>
        </div>
        <h2 className="allowed-end">Now get back to <Link to="/"> WORK</Link></h2>
      </div>
    );
  }
}
