import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
// import DeleteCollectionsBTN from "../Landing/DeleteCollectionBTN.js/DeleteCollectionBTN";
import { connect } from "react-redux";
import { setUser } from "../../ducks/reducer";

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      isOpened: false
    };
  }

  render() {
    if (this.props.pathname === "/") {
      return null;
    }

    return (
      <div className="main-bar">
        <div className="dropdown">
          <button className="drop-btn hamburger">
            <label>&#9776;</label>
          </button>
          <div className="dropdown-content">
            <Link to="/dashboard" className="route">
              Dashboard
            </Link>
            <Link to="/PublicCollection" className="route">
              Public Collections
            </Link>
            <Link to="/MeetTheDevSquad" className="route">
              Meet The Dev Team
            </Link>
            <a
              onClick={() => this.props.setUser(false)}
              href={process.env.REACT_APP_LOGOUT_URL}
            >
              Log Out
            </a>
          </div>
        </div>
        <h2 className="header">Snap Collector</h2>
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(
  mapStateToProps,
  { setUser }
)(Nav);
