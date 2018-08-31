import React, { Component } from "react";
import axios from "axios";
import { Button } from "reactstrap";

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
        <Button onClick={() => this.handleDeleteCollection(this.props.id)}>
          Delete Entire Collection
        </Button>
      </div>
    );
  }
}
export default DeleteCollectionsBTN;
