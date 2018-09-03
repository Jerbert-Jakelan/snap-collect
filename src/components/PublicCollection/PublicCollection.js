import React, {Component} from 'react';
import '../CollectionDetail/CollectionDetail.css';
import axios from 'axios';
import {Card} from 'reactstrap';


class PublicCollection extends Component{
    constructor(props){
        super(props);
        this.state = {
          users:[],
          collection:[],
          input:''
        }
        this.updateCollections = this.updateCollections.bind(this)
      }

      componentDidMount = async() => {
        this.getCollections();
        this.getUsers();
      };

      getUsers = () => {
        axios.get('/api/getProfile')
        .then(res => {
          this.setState({
            users:res.data
          })
        })
      }
    
      getCollections = () => {
        axios.get('/api/collections').then(payload =>{
          this.setState({
              collection: payload.data
          })
        })
        }

      updateCollections = collection => {
        this.setState({collection});
      }

    handleInput = (val) => {
        this.setState({
          input: val.toLowerCase()
        });
      }
    
      render() {
        const { input } = this.state;
        let collectionSearch = this.state.collection
          .filter(
            e =>
              e.name.toLowerCase().includes(input) ||
              e.description.toLowerCase().includes(input)
          )
          .map((e, i) => {
            return <Card index={i} updateCollections={this.updateCollections} key={e.collection_id} card={e} />;
          })
    
        return (
          <div className="collection-home">
                <input
                className="inputSearch"
                placeholder="Search"
                onChange={event => this.handleInput(event.target.value)}
                />
            <div className="card-wrapper"> {collectionSearch} </div>
        </div>
    )
}
}
export default PublicCollection;