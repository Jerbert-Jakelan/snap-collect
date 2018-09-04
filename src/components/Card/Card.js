import React, { Component } from "react";
import axios from "axios";
import "./Card.css";
import CardEdit from "../CardEdit/CardEdit";

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
            <div className="cardBackDiv">
              <h2 className="backH2">Player: {this.props.card.name}</h2>
              <br />
              <h3 className="backH3Team">Team: {this.props.card.team}</h3>
              <br />
              <h3 className="backH3">Year: {this.props.card.year}</h3>
              <br />
              <hr className="cardHr" />
              <div className="cardEditButton">
                <CardEdit
                  className="cardEditButton"
                  id={this.props.card.card_id}
                  getCards={this.props.getCards}
                />
              </div>
            </div>
          </div>
          {/* <button>Edit Me</button> */}
        </div>
        <button
          className="deleteThisCard"
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
