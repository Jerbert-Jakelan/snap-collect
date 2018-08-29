import React, { Component } from 'react';
import axios from 'axios';

class CardForm extends Component {
  state = {
    name: '',
    cardImage: null,
    team: '',
    year: ''
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleFileUpload = e => {
    this.setState({ file: e.target.files });
  };

  submitFile = e => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("file", this.state.file[0]);
    formData.append("name", this.state.name);
    formData.append("team", this.state.team);
    formData.append("year", this.state.year);
    formData.append("collection", this.props.collectionId);
    
    axios.post(`/api/cards`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(cards => {
        console.log(cards);
        // this.props.updateCards(cards.data);
        this.setState({file: null, name: '', team: '', year: ''});
        console.log('Success!');
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitFile}>
          <input 
            type="text"
            name="name"
            onChange={this.handleChange} />
          <input 
            type="text"
            name="team"
            onChange={this.handleChange} />
          <input 
            type="text"
            name="year"
            onChange={this.handleChange} />
          <input
            label="Card Image"
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={this.handleFileUpload} />
          <button type="submit">Create</button>
        </form>
      </div>
    );
  }
}

export default CardForm;