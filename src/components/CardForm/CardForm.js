import "./CardForm.css";
import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import Dropzone from "react-dropzone";
import axios from "axios";


class CardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      cardImage: {},
      team: "",
      year: "",
      loading: false,
      modal: false,
    };
    this.onChange1 = this.onChange1.bind(this);
    this.createCard = this.createCard.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  onChange1(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  createCard = e => {
    e.preventDefault();
    this.props.updateLoading(true);
    const { name, year, team, cardImage } = this.state;

    const formData = new FormData();
    formData.append("file", cardImage);
    formData.append("name", name);
    formData.append("team", team);
    formData.append("year", year);
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
      })
      .catch(err => {
        console.log(err);
      });
  };

  onFileDrop = file => {
    this.setState({ cardImage: file[0] });
  };

  render() {
    return (
      <div>
        <Button
          className="collectionButton"
          size="sm"
          outline
          color="secondary"
          onClick={this.toggle}
        >
          Add Card
        </Button>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Add New Card</ModalHeader>
          <ModalBody>
            <Form
              type="multipart/form-data"
              onSubmit={this.createCard}
              className="container"
              style={{ maxWidth: 600 }}
            >
              <FormGroup>
                <Label for="itemName">Name</Label>
                <Input
                  cy-data-card-name-input
                  type="text"
                  name="name"
                  id="itemName"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={this.onChange1}
                />
              </FormGroup>

              <FormGroup>
                <Label for="itemName">Team</Label>
                <Input
                  cy-data-card-team-input
                  type="text"
                  name="team"
                  id="itemTeam"
                  placeholder="Team"
                  value={this.state.team}
                  onChange={this.onChange1}
                />
              </FormGroup>

              <FormGroup>
                <Label for="description">Year</Label>
                <Input
                  type="text"
                  name="year"
                  id="year"
                  placeholder="Year"
                  value={this.state.year}
                  onChange={this.onChange1}
                  maxLength="10"
                />
              </FormGroup>

              <FormGroup>
                <Label for="file">File</Label>
                <Dropzone id="file" onDrop={this.onFileDrop}>
                  <img
                    alt="preview"
                    style={{ width: "199px", height: "198px" }}
                    src={
                      this.state.cardImage.preview &&
                      this.state.cardImage.preview
                    }
                  />
                </Dropzone>
              </FormGroup>

              <Button type="submit" onClick={this.toggle}>
                Submit
              </Button>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default CardForm;
