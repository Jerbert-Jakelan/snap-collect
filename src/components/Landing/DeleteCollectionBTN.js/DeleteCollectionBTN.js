import React, { Component } from "react";
import axios from "axios";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

class DeleteCollectionsBTN extends Component {
  handleDeleteCollection = id => {
    axios
      .delete(`/api/collections/${id}`)
      // .then(() => this.props.getCollections())
      .catch(err => console.log(err));
  };
  render() {
    console.log(this.props.id);
    return (
      <div className="deleteCollectionButton">
        <Link to="/dashboard">
          <Button onClick={() => this.handleDeleteCollection(this.props.id)}>
            Delete Entire Collection
          </Button>
        </Link>
      </div>
    );
  }
}
export default DeleteCollectionsBTN;
