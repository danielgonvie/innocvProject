import React, { Component } from "react";
import "./SearchBar.scss";

export default class SearchBar extends Component {
  render() {
    return (
      <div className="searchbar-component">
        <input
          className="searchbar-field"
          placeholder="Search users..."
          onChange={this.props.search}
          onKeyDown={this.props.onkey}
          type="text"
        ></input>
      </div>
    );
  }
}
