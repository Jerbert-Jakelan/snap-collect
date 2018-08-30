import React, { Component } from "react";
import "./Login.css";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {};
  }

  //   userLogin = () => {
  //     axios.get("/login").then(res => {});
  //   };

  render() {
    return (
      <div className="landingMainDiv">
        <div className="landingDiv2">
          <h4>Welcome to</h4>
          <h1 className="appName">Snap Collect</h1>
          <div className="imgDiv">
            <img
              className="loginImg"
              src={require("./cam256x256.png")}
              alt=""
            />
          </div>
          <div className="appDescDiv">
            <p className="appDescription">
              The app that lets you scan your collections
            </p>
          </div>

          {/* <li className="list">Use this field for point 1</li>
          <li className="list">Obviously this is where point 2 sits</li>
          <li className="list">Bob Ross is a God</li> */}

          <hr className="hr" />
          <div className="loginSeg">
            <div className="loginSegText">
              <h4 className="clickHereText">Click here to sign up</h4>
              <h4 className="loginText">or log in</h4>
              <a href={process.env.REACT_APP_LOGIN}>
                <button classname="buttonLanding">Get Started</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
