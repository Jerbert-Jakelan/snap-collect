import React, { Component } from "react";
import axios from "axios";
import { Button } from "reactstrap";
import Loader from "react-loader-spinner";
import "./CardForm.css";

class CardForm extends Component {
  state = {
    name: "",
    cardImage: null,
    team: "",
    year: "",
    loading: false
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFileUpload = e => {
    this.setState({ file: e.target.files });
  };

  submitFile = e => {
    e.preventDefault();
    this.setState({ loading: true });
    const formData = new FormData();

    formData.append("file", this.state.file[0]);
    formData.append("name", this.state.name);
    formData.append("team", this.state.team);
    formData.append("year", this.state.year);
    formData.append("collection", this.props.collectionId);

    axios
      .post(`/api/cards`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(result => {
        this.props.resolveSearch(result.data);
        this.setState({
          file: null,
          name: "",
          team: "",
          year: "",
          loading: false
        });
        console.log("Success!");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    let createBtn = this.state.loading ? (
      <Loader type="Oval" color="#00BFFF" height="50" width="50" />
    ) : (
      <Button outline color="danger" type="submit">
        Create
      </Button>
    );

    return (
      <div className="form-contain">
        <form className="search-form" onSubmit={this.submitFile}>
          <input
            className="collect-input"
            data-cy-card-name-input
            type="text"
            required
            name="name"
            placeholder="Name"
            onChange={this.handleChange}
            value={this.state.name}
          />
          <input
            className="collect-input"
            data-cy-card-team-input
            required
            type="text"
            name="team"
            placeholder="Team"
            onChange={this.handleChange}
            value={this.state.team}
          />
          <input
            className="collect-input"
            data-cy-card-year-input
            required
            type="text"
            name="year"
            placeholder="Year"
            onChange={this.handleChange}
            value={this.state.year}
            maxLength="10"
          />
          <input
            className="collect-input"
            required
            label="Card Image"
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={this.handleFileUpload}
          />
          {createBtn}
        </form>
      </div>
    );
  }
}

export default CardForm;
