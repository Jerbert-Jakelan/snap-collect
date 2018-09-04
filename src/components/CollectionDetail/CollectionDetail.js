import React, { Component } from "react";
import axios from "axios";
import CardForm from "../CardForm/CardForm";
import Cards from "../Card/Card";
import { Alert, Button, Collapse, CardBody, Card } from "reactstrap";
import { Link } from "react-router-dom";
import "./CollectionDetail.css";
import DeleteCollectionBTN from "../Landing/DeleteCollectionBTN.js/DeleteCollectionBTN";

class CollectionDetail extends Component {
  constructor() {
    super();
    this.state = {
      cards: [],
      dupMessage: "",
      visible: false,
      input: "",
      selectedCard: {},
      collapse: false
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.getCards();
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
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

  setSelectedCard = card => {
    this.setState({ selectedCard: card });
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
        return (
          <Cards
            updateCards={this.updateCards}
            key={e.card_id}
            card={e}
            setSelectedCard={this.setSelectedCard}
            getCards={this.getCards}
          />
        );
        // <div key={i}>
        //   <div>{e.name}</div>
        // </div>;
      });

    return (
      <div className="collection-home">
        <div>
          <Button
            color="primary"
            onClick={this.toggle}
            style={{ marginBottom: "1rem" }}
          >
            Toggle
          </Button>
          <Collapse isOpen={this.state.collapse}>
            <Card>
              <CardBody>
                <input
                  className="inputSearch"
                  placeholder="Search Collection"
                  onChange={event => this.handleInput(event.target.value)}
                />
              </CardBody>
            </Card>
          </Collapse>
        </div>
        <hr />
        <input
          className="inputSearch"
          placeholder="Search Collection"
          onChange={event => this.handleInput(event.target.value)}
        />
        <hr />

        <DeleteCollectionBTN
          className="deleteThisCard"
          id={this.props.match.params.collection_id}
        />

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
        <div className="toPubCollection">
          <h3>Explore ~ Find ~ Trade ~ Communicate</h3>
          <Link to="/PublicCollection">
            <Button>Explore Collections</Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default CollectionDetail;
