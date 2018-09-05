import React from "react";
import { connect } from "react-redux";
import EditProfile from "../EditProfile/EditProfile";
import "./ProfileLanding.css";

const ProfileLanding = props => {
  return (
    <div className="profileText">
      <div className="avatar" style={{ height: 75, width: 75 }}>
        <img
          className="avatarImg"
          src={props.user.profile_pic}
          alt="user pic"
        />
      </div>
      <EditProfile />
      <div className="profileText2">
        <h2>{props.user.name}</h2>
        <h3>
          {props.user.city}, {props.user.state}{" "}
        </h3>
        {/* <h3>{props.user.state}</h3> */}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  null
)(ProfileLanding);
