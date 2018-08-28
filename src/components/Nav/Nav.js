import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

export default class Nav extends Component {
  render() {
    console.log(this.props);
    if (this.props.pathname === "/login") {
      return null;
    }
    return (
      <div className="main-bar">
        <div className="dropdown">
          <button className="drop-btn">Menu</button>
          <div className="dropdown-content">
            <Link to="/" className="route">
              Dashboard
            </Link>
          </div>
        </div>
        <h2 className="header">Snap Collect</h2>
      </div>
    );
  }
}
