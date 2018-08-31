import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
// import DeleteCollectionsBTN from "../Landing/DeleteCollectionBTN.js/DeleteCollectionBTN";
import { connect } from "react-redux";

class Nav extends Component {
  render() {
    // if (this.props.pathname === "/") {
    //   return null;
    // }
    // if (this.props.pathname === `/collection/${this.props.selectedCollection}`) {
    //   return <DeleteCollectionsBTN id={this.props.selectedCollection}/>;
    // }
    console.log(this.props);
    return (
      <div className="main-bar">
        <div className="dropdown">
          <button className="drop-btn">Menu</button>
          <div className="dropdown-content">
            <Link to="/dashboard" className="route">
              Dashboard
            </Link>
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
  null
)(Nav);
