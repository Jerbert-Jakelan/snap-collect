import React, { Component } from "react";
import axios from "axios";
import CardForm from "../CardForm/CardForm";
import "./CollectionDetail.css";

class CollectionDetail extends Component {
  state = {
    cards: []
  };

  componentDidMount() {
    this.getCards();
  }

  getCards = () => {
    axios
      .get(`/api/cards/${this.props.match.params.collection_id}`)
      .then(cards => this.setState({ cards: cards.data }))
      .catch(err => console.log(err));
  };

  updateCards = cards => {
    this.setState({ cards });
  };

  render() {
    console.log(this.state.cards);
    let cards = this.state.cards.map(card => {
      return (
        <div key={card.card_id} className="card-info">
          <img className="image-source" src={card.image} />
          <h2>
            Player:
            {card.name}
          </h2>
          <h3>
            Year:
            {card.year}
          </h3>
        </div>
      );
    });
    return (
      <div>
        <CardForm
          collectionId={this.props.match.params.collection_id}
          updateCards={this.updateCards}
        />
        <div className="card"> {cards} </div>
      </div>
    );
  }
}

export default CollectionDetail;
