import React, { Component } from "react";
import axios from "axios";
import CardForm from "../CardForm/CardForm";
import Card from "../Card/Card";
import { Alert } from "reactstrap";
import "./CollectionDetail.css";
import DeleteCollectionBTN from "../Landing/DeleteCollectionBTN.js/DeleteCollectionBTN";
import { Link } from "react-router-dom";

class CollectionDetail extends Component {
  state = {
    cards: [],
    dupMessage: "",
    visible: false,
    input: ""
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
    this.setState({ cards: cards });
  };

  resolveSearch = result => {
    if (result.message) {
      this.setState({ dupMessage: result.message, visible: true });
    } else {
      this.setState({ cards: result });
    }
  };

  onDismiss = () => {
    this.setState({ visible: false });
  };

  handleInput(val) {
    this.setState({
      input: val.toLowerCase()
    });
  }

  render() {
    const { input } = this.state;
    let cardSearch = this.state.cards
      .filter(
        e =>
          e.name.toLowerCase().includes(input) ||
          e.team.toLowerCase().includes(input) ||
          e.year.toLowerCase().includes(input)
      )
      .map((e, i) => {
        return <Card updateCards={this.updateCards} key={e.card_id} card={e} />;
        <div key={i}>
          <div>{e.name}</div>
        </div>;
      });

    // let cards = this.state.cards.map(card => {
    // });

    return (
      <div className="collection-home">
        <hr />
        {/* {cardSearch} */}
        <hr />
        <input
          className="inputSearch"
          placeholder="Search"
          onChange={event => this.handleInput(event.target.value)}
        />
        <hr />

        <DeleteCollectionBTN id={this.props.match.params.collection_id} />

        <Alert
          color="warning"
          isOpen={this.state.visible}
          toggle={this.onDismiss}
        >
          {this.state.dupMessage}
        </Alert>
        <CardForm
          collectionId={this.props.match.params.collection_id}
          resolveSearch={this.resolveSearch}
        />
        <div className="card-wrapper"> {cardSearch} </div>
      </div>
    );
  }
}

export default CollectionDetail;
