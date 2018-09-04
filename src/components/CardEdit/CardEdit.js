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
// import Dropzone from "react-dropzone";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../../ducks/reducer";

class CardEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      team: "",
      year: "",
      modal: false,
      card_id: ""
    };
    this.onChange = this.onChange.bind(this);
    this.updateCard = this.updateCard.bind(this);
    this.toggle2 = this.toggle2.bind(this);
  }

  toggle2() {
    // console.log("TOGGLE 2 FIRED")
    this.setState({
      modal: !this.state.modal
    });
  }

  onChange(e) {
    // console.log('this is state ', e)
    // console.log(e.target.value)
    this.setState({ [e.target.name]: e.target.value });
    // console.log(this.state);
  }

  updateCard = (e, id) => {
    // console.log("HIT");
    e.preventDefault();
    // console.log(this.state);
    let { name, team, year } = this.state;

    const formData = new FormData();

    // formData.append("name", name);
    // formData.append("team", team);
    // formData.append("year", year);

    console.log(id);
    axios
      .put(
        `/api/cards/update/${id}`,
        { name, team, year }
        // {
        //   headers: {
        //     "Content-Type": "multipart/form-data"
        //   }
        // }
      )
      .then(res => {
        console.log("*******", res);
        this.props.getCards();
      });
  };

  //   onFileDrop2 = file => {
  //     this.setState({ photo: file[0] });
  //   };

  render() {
    let { name, team, year } = this.state;
    return (
      <div>
        <Button outline size="sm" color="info" onClick={this.toggle2}>
          Update
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle2}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle2}>Update Your Card</ModalHeader>
          <ModalBody>
            <Form
              type="multipart/form-data"
              onSubmit={e => this.updateCard(e, this.props.id)}
              className="container"
              style={{ maxWidth: 600 }}
            >
              <FormGroup>
                <Label for="profileName">Player</Label>
                <Input
                  type="text"
                  name="name"
                  id="profileName"
                  placeholder="Enter name"
                  value={name}
                  onChange={this.onChange}
                />
              </FormGroup>

              <Label for="teamName">Team</Label>
              <Input
                type="text"
                name="team"
                id="teamName"
                placeholder="Enter team"
                value={team}
                onChange={this.onChange}
              />

              <Label for="stateName">Year</Label>
              <Input
                type="text"
                name="year"
                id="yearName"
                placeholder="Enter year"
                value={year}
                onChange={this.onChange}
              />

              {/* <FormGroup>
                <Label for="file1">Photo</Label>
                <Dropzone id="file1" onDrop={this.onFileDrop2}>
                  <img
                    alt="profilePic"
                    style={{ width: "199px", height: "198px" }}
                    src={this.state.photo.preview && this.state.photo.preview}
                  />
                </Dropzone>
              </FormGroup> */}

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
)(CardEdit);
