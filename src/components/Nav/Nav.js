import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
// import DeleteCollectionsBTN from "../Landing/DeleteCollectionBTN.js/DeleteCollectionBTN";
import { connect } from "react-redux";
import { setUser } from "../../ducks/reducer";

class Nav extends Component {
  render() {
    if (this.props.pathname === "/") {
      return null;
    }

    return (
      <div className="main-bar">
        <div className="dropdown">
          <button className="drop-btn">Menu</button>
          <div className="dropdown-content">
            <Link to="/dashboard" className="route">
              Dashboard
            </Link>
            <Link to="/PublicCollection" className="route">
              Public Collections
            </Link>
            <a
              onClick={() => this.props.setUser(false)}
              href={process.env.REACT_APP_LOGOUT_URL}
            >
              Log Out
            </a>
          </div>
        </div>
        <h2 className="header">Snap Collect</h2>
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(
  mapStateToProps,
  { setUser }
)(Nav);
