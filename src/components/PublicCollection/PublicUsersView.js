import React, { Component } from "react";
import "./PublicUsersView.css";
import "../CollectionDetail/CollectionDetail.css";

class PublicUsersView extends Component {
  render() {
    let { name, city, state, pic } = this.props;
    return (
      <div className="profileText">
        <div className="avatarPubDiv" style={{ height: 75, width: 75 }}>
          <img className="avatarPubPic" src={pic} alt="user pic" />
        </div>

        <div className="profileText2">
          <h2>{name}</h2>
          <h3>
            {city}, {state}{" "}
          </h3>
        </div>
      </div>
    );
  }
}
export default PublicUsersView;
