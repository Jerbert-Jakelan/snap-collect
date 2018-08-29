import React, { Component } from "react";
import "./Card.css";

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rotate: ""
    };
  }

  rotateCard = () => {
    console.log("this is the current state", this.state);
    if (this.state.rotate.length < 1) {
      this.setState({ rotate: "rotate" });
      console.log("State should update here", this.state);
    } else {
      this.setState({ rotate: "" });
    }
  };

  render() {
    return (
      <div
        className={`card-info ${this.state.rotate}`}
        onClick={this.rotateCard}
      >
        <div className="card-face front">
          <img alt="?" src={this.props.card.image} />
        </div>
        <div className="card-face back">
          <h2>
            Player:
            {this.props.card.name}
          </h2>
          <h3>
            Year:
            {this.props.card.year}
          </h3>
        </div>
      </div>
    );
  }
}
