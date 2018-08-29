import React, { Component } from "react";
import axios from "axios";
import { Alert } from 'reactstrap';
import CardForm from "../CardForm/CardForm";
import "./CollectionDetail.css";

class CollectionDetail extends Component {
  state = {
    cards: [],
    dupMessage: '',
    visible: false
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

  resolveSearch = result => {
    if(result.message) {
      this.setState({dupMessage: result.message, visible: true});
    } else {
      this.setState({cards: result});
    }
  };

  onDismiss = () => {
    this.setState({ visible: false });
  }

  render() {
    let cards = this.state.cards.map(card => {
      return (
        <div key={card.card_id} className="card-info">
          <img alt="?" className="image-source" src={card.image} />
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
        <Alert color="warning" isOpen={this.state.visible} toggle={this.onDismiss}>
          {this.state.dupMessage}
        </Alert>
        <CardForm
          collectionId={this.props.match.params.collection_id}
          resolveSearch={this.resolveSearch}
        />
        <div className="card"> {cards} </div>
      </div>
    );
  }
}

export default CollectionDetail;
