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
    if (this.state.rotate.length < 1) {
      this.setState({ rotate: "rotate" });
    } else {
      this.setState({ rotate: "" });
    }
  };

  deleteCard() {}

  render() {
    return (
      <div>
        <div
          data-cy-cards
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
        <button onClick={() => console.log("chopsticks")}>
          Delete this card
        </button>
      </div>
    );
  }
}
