import React, { Component } from "react";
import axios from "axios";
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

  deleteCard = (collection_id, card_id) => {
    console.log(this.props.card);
    axios.delete(`/api/cards/${collection_id}/${card_id}`).then(cards => {
      this.props.updateCards(cards.data);
    });
  };

  render() {
    return (
      <div>
        <div
          data-cy-cards
          className={`card-info ${this.state.rotate}`}
          onClick={this.rotateCard}
        >
          <div className="card-face front">
            <img className="image-source" alt="?" src={this.props.card.image} />
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
        <button
          onClick={() =>
            this.deleteCard(
              this.props.card.collection_id,
              this.props.card.card_id
            )
          }
        >
          Delete this card
        </button>
      </div>
    );
  }
}
