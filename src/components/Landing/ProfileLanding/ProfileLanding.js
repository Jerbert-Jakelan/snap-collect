import React from 'react';
import {connect} from 'react-redux';
import EditProfile from '../EditProfile/EditProfile';

const ProfileLanding = (props) =>  {
  return (
    <div>
       <div className="avatar" style={{height:50, width:50}} >
          <img src={props.user.profile_pic} alt="user pic" />
      </div>
      <EditProfile/>
      <h2>{props.user.name}</h2>
          <h3>{props.user.city}</h3>
          <h3>{props.user.state}</h3>
    </div>
  )
}

const mapStateToProps = state => {
  return state;
} 

export default connect(mapStateToProps, null)(ProfileLanding);