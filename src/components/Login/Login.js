import React, { Component } from "react";
import "./Login.css";
import { Button } from "reactstrap";
import CameraSvg from "../SVG/CameraSvg";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="landingMainDiv">
        <div className="landingDiv2">
          <h1 className="appName">Snap Collector</h1>
          <div className="imgDiv">
            <div className="loader">
              <CameraSvg/>
            </div>
          </div>
          <div className="appDescDiv">
            <p className="appDescription">
              The app that lets you scan your collections
            </p>
          </div>
          <hr className="hrLogin" />

          <div className="loginSeg">
            <div className="loginSegText">
              <h4 className="clickHereText">Register / Login</h4>
              <a href={process.env.REACT_APP_LOGIN}>
                <Button
                  style={{ color: "white", borderColor: "white" }}
                  outline
                  className="buttonLanding"
                >
                  Get Started
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
