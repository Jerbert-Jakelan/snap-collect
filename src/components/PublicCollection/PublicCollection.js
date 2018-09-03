import React, {Component} from 'react';
import '../CollectionDetail/CollectionDetail.css';
import axios from 'axios';
import {Card} from 'reactstrap';
import Collections from '../Landing/Collections/Collections'


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
        axios.get('/api/getAllUsers')
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
            return (
              <Collections
              index={i}
              key={e.collection_id}
              collId={e.collection_id}
              image={e.collection_pic}
              name={e.name}
              description={e.description}
              updateCollections={this.updateCollections}
              />
            )})
          
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