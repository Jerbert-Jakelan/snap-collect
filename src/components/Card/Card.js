import React, { Component } from "react";
import { Button } from "reactstrap";
import axios from "axios";
import "./Card.css";
import CardEdit from "../CardEdit/CardEdit";

export default class Card extends Component {
  deleteCard = (collection_id, card_id) => {
    axios.delete(`/api/cards/${collection_id}/${card_id}`).then(cards => {
      this.props.updateCards(cards.data);
    });
  };

  render() {
    let deleteButton =
      this.props.collectionId === this.props.userId ? (
        <Button
          outline
          size="sm"
          color="danger"
          onClick={() =>
            this.deleteCard(
              this.props.card.collection_id,
              this.props.card.card_id
            )
          }
        >
          Delete
        </Button>
      ) : null;

    let editButton =
      this.props.collectionId === this.props.userId ? (
        <CardEdit
          className="cardEditButton"
          id={this.props.card.card_id}
          getCards={this.props.getCards}
        />
      ) : null;

    return (
      <div data-cy-cards className="card-info">
        <img className="image-source" alt="?" src={this.props.card.image} />
        <div className="card-overlay">
          <div className="player-info">
            <h3 className="backH2">{this.props.card.name}</h3>
            <h4 className="backH3Team">{this.props.card.team}</h4>
            <h4 className="backH3">{this.props.card.year}</h4>
            <hr className="cardHr" />
            <div className="cardEditButton">
              {editButton}
              {deleteButton}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
