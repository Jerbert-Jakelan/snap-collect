import React, { Component } from "react";
import Routes from "./Routes";
import Nav from "./components/Nav/Nav";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Routes />
      </div>
    );
  }
}

export default App;
