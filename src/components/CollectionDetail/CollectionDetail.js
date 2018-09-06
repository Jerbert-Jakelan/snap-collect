import React, { Component } from "react";
import axios from "axios";
import CardForm from "../CardForm/CardForm";
import Cards from "../Card/Card";
import { Alert, Button, Collapse, CardBody, Card } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./CollectionDetail.css";
import SVG from '../SVG/camera.svg';
import Loader from "react-loader-spinner";

class CollectionDetail extends Component {
  constructor() {
    super();
    this.state = {
      cards: [],
      dupMessage: "",
      visible: false,
      input: "",
      selectedCard: {},
      collapse: false,
      collection: [],
      empty: false,
      loading: false
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.getCollection();
    this.getCards();
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  getCards = () => {
    axios
      .get(`/api/cards/${this.props.match.params.collection_id}`)
      .then(cards => {
        if(cards.data.length === 0) {
          this.setState({empty: true});
        } else {
          this.setState({ cards: cards.data })
        }
      })
      .catch(err => console.log(err));
  };

  getCollection = async () => {
    let collection = await axios.get(
      `/api/collections/${this.props.match.params.collection_id}`
    );
    this.setState({ collection: collection.data[0] });
  };

  updateCards = cards => {
    this.setState({ cards: cards });
  };

  setSelectedCard = card => {
    this.setState({ selectedCard: card });
  };

  resolveSearch = result => {
    this.updateLoading(false);
    if (result.message) {
      this.setState({ dupMessage: result.message, visible: true });
    } else {
      this.setState({ cards: result, empty: false });
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

  updateLoading = bool => {
    this.setState({loading: bool});
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
            collectionId={this.state.collection.user_id}
            userId={this.props.user.user_id}
          />
        );
      });

    let cardForm =
      this.props.user.user_id === this.state.collection.user_id ? (
        this.state.loading ? <Loader type="Oval" color="#00BFFF" height="50" width="50" /> :
        <CardForm
          collectionId={this.props.match.params.collection_id}
          resolveSearch={this.resolveSearch}
          updateLoading={this.updateLoading}
        />
      ) : null;

      if(this.state.empty) {
        return(
          <div className="collection-home">
            <Alert
              color="warning"
              isOpen={this.state.visible}
              toggle={this.onDismiss}
            >
              {this.state.dupMessage}
            </Alert>

            <hr />

            <input
              className="inputSearch"
              placeholder="Search Collection"
              onChange={event => this.handleInput(event.target.value)}
            />

            <hr />

            {cardForm}
  
            <div className="card-wrapper"> {cardSearch} </div>
            <div>
              <img src={SVG} alt="" style={{height: '100px'}}/>
              <p style={{color: 'white', marginTop: '10px'}}>There's nothing here!</p>
            </div>
  
          </div>
        );
      }

    return (
      <div className="collection-home">
        <Alert
          color="warning"
          isOpen={this.state.visible}
          toggle={this.onDismiss}
        >
          {this.state.dupMessage}
        </Alert>

        <hr />

        <input
          className="inputSearch"
          placeholder="Search Collection"
          onChange={event => this.handleInput(event.target.value)}
        />

        <hr />
        
        {cardForm}

        <div className="card-wrapper"> {cardSearch} </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  null
)(CollectionDetail);
