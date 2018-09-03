import React, { Component } from "react";

export default class PubCollections extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Public Collections Page</h1>
        <input placeholder="Search Collections" />
        <button>Search by image</button>
      </div>
    );
  }
}
