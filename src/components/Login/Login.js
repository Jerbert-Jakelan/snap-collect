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
      <div>
        <h1>Snap Collect</h1>
        <h2>Logging in gives you acccess to the goods</h2>
        <li className="list">Use this field for point 1</li>
        <li className="list">Obviously this is where point 2 sits</li>
        <li className="list">Bob Ross is a God</li>
        <a href={process.env.REACT_APP_LOGIN}>Login</a>
      </div>
    );
  }
}
