import React, {Component} from 'react';
import '../CollectionDetail/CollectionDetail.css';
import axios from 'axios';
import {Card} from 'reactstrap';


class PublicCollection extends Component{
    constructor(){
        super();
        this.state = {
            cards: [],
            input: ""
          };
    }
    componentDidMount() {
        this.getCards();
      }
    
      getCards = () => {
        axios
          .get(`/api/cards/${this.props.match.params.collection_id}`)
          .then(cards => this.setState({ cards: cards.data }))
          .catch(err => console.log(err));
      }
      updateCards = cards => {
        this.setState({ cards: cards });
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
            // <div key={i}>
            //   <div>{e.name}</div>
            // </div>;
          })
    
        return (
          <div className="collection-home">
                <input
                className="inputSearch"
                placeholder="Search"
                onChange={event => this.handleInput(event.target.value)}
                />
            <div className="card-wrapper"> {cardSearch} </div>
        </div>
    )
}
}
export default PublicCollection;