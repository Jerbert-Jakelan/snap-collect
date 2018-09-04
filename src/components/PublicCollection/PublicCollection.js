import React, { Component } from "react";
import "../CollectionDetail/CollectionDetail.css";
import axios from "axios";
import Collections from "../Landing/Collections/Collections";

class PublicCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      publicCollection: [],
      input: ""
    };
  }

  componentDidMount = async () => {
    this.getAllPublicCollections();
  };

  getAllPublicCollections = () => {
    axios.get("/api/getAllPublicCollections").then(payload => {
      this.setState({
        publicCollection: payload.data
      });
    });
  };

  handleInput = val => {
    this.setState({
      input: val.toLowerCase()
    });
  };

  render() {
    console.log(this.state);
    const { input, publicCollection } = this.state;
    let collectionSearch = publicCollection
      .filter(
        e =>
          e.city.toLowerCase().includes(input) ||
          e.state.toLowerCase().includes(input) ||
          e.name.toLowerCase().includes(input) ||
          e.user_name.toLowerCase().includes(input) ||
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
            userName={e.user_name}
            proPic={e.profile_pic}
            city={e.city}
            state={e.state}
          />
        );
      });

    return (
      <div className="collection-home">
        <input
          className="inputSearch"
          placeholder="Search"
          onChange={event => this.handleInput(event.target.value)}
        />
        <div className="card-wrapper"> {collectionSearch} </div>
      </div>
    );
  }
}
export default PublicCollection;
