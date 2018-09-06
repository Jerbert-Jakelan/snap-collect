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
import { connect } from "react-redux";
import { setUser } from "../../../ducks/reducer";
import "./EditProfile.css";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      city: "",
      state: "",
      photo: "",
      modal: false,
      user_id: ""
    };
  }

  toggle2 = () => {
    
    this.setState({
      modal: !this.state.modal
    });
  }

  onChange = (e) => {
 
    this.setState({ [e.target.name]: e.target.value });

  }

  updateProfile = e => {
  
    e.preventDefault();
  
    let { name, city, state, photo } = this.state;

    const formData = new FormData();

    formData.append("file", photo);
    formData.append("name", name);
    formData.append("city", city);
    formData.append("state", state);

    axios
      .put(`/api/profile/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(user => {
        this.props.setUser(user.data[0]);
      });
  };

  onFileDrop2 = file => {
    this.setState({ photo: file[0] });
  };

  render() {
    let { name, city, state } = this.state;
    return (
      <div className="editProfileMainDiv">
        <p className="pencil" onClick={this.toggle2}>
          <i class="fas fa-pencil-alt" />
        </p>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle2}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle2}>Update Your Profile</ModalHeader>
          <ModalBody>
            <Form
              type="multipart/form-data"
              onSubmit={this.updateProfile}
              className="container"
              style={{ maxWidth: 600 }}
            >
              <FormGroup>
                <Label for="profileName">Name</Label>
                <Input
                  cy-data-edit-name-input
                  type="text"
                  name="name"
                  id="profileName"
                  placeholder="Enter name"
                  value={name}
                  onChange={this.onChange}
                />
              </FormGroup>

              <Label for="cityName">City</Label>
              <Input
                cy-data-edit-city-input
                type="text"
                name="city"
                id="cityName"
                placeholder="Enter city"
                value={city}
                onChange={this.onChange}
              />

              <Label for="stateName">State</Label>
              <Input
                cy-data-edit-state-input
                type="text"
                name="state"
                id="stateName"
                placeholder="Enter state"
                value={state}
                onChange={this.onChange}
              />

              <FormGroup>
                <Label for="file1">Photo</Label>
                <Dropzone id="file1" onDrop={this.onFileDrop2}>
                  <img
                    alt="profilePic"
                    style={{ width: "199px", height: "198px" }}
                    src={this.state.photo.preview && this.state.photo.preview}
                  />
                </Dropzone>
            
              </FormGroup>

              <Button type="submit" onClick={this.toggle2}>
                Submit
              </Button>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle2}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { setUser }
)(EditProfile);
