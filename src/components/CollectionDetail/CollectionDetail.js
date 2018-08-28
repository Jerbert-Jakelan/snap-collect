import React, { Component } from 'react';
import axios from 'axios';
import CardForm from '../CardForm/CardForm';

class CollectionDetail extends Component {
  state = {
    cards: []
  }

  componentDidMount() {
    this.getCards();
  }
  
  getCards = () => { 
    axios.get(`/api/cards/${this.props.match.params.collection_id}`)
      .then(cards => this.setState({cards: cards.data}))
      .catch(err => console.log(err));
  }

  updateCards = cards => {
    this.setState({cards});
  }

  render() {
    let cards = this.state.cards.map(card => {
      return <h2 key={card.card_id}>{card.name}</h2>
    });

    return (
      <div>
        <CardForm 
          collectionId={this.props.match.params.collection_id}
          updateCards={this.updateCards}/>
        {cards}
      </div>
    );
  }
}

export default CollectionDetail;