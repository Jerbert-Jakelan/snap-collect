import React, { Component } from "react";
import axios from "axios";
import { Button } from "reactstrap";

class DeleteCollectionsBTN extends Component {
  handleDeleteCollection = id => {
    axios
      .delete(`/api/collections/${id}`)
      .then(collections => this.props.updateCollections(collections.data))
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div className="deleteCollectionButton">
        <Button
          outline
          size="sm"
          color="danger"
          onClick={() => this.handleDeleteCollection(this.props.id)}
        >
          Delete
        </Button>
      </div>
    );
  }
}
export default DeleteCollectionsBTN;
