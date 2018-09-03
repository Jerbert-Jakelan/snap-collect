import "./AddNewCollection.css";
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

class AddNewCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      categoryId: 2,
      collectionPic: "",
      modal: false,
      categories: []
    };
    this.onChange1 = this.onChange1.bind(this);
    this.onchange2 = this.onchange2.bind(this);
    this.updateNewCollection = this.updateNewCollection.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  async componentDidMount() {
    let categories = await axios.get("/api/categories");
    this.setState({ categories: categories.data });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  onChange1(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onchange2(val) {
    // console.log('this is val ', val)
    this.setState({
      categoryId: val
    });
  }

  updateNewCollection = e => {
    e.preventDefault();
    const { name, description, categoryId, collectionPic } = this.state;

    const formData = new FormData();
    formData.append("file", collectionPic);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("categoryId", categoryId);

    axios
      .post("/api/collections", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(collections => {
        this.props.updateCollections(collections.data);
      });
  };

  onFileDrop = file => {
    this.setState({ collectionPic: file[0] });
  };

  render() {
    let categories = this.state.categories.map(category => {
      return (
        <option
          key={category.category_id}
          name="categoryId"
          value={category.category_id}
        >
          {category.name}
        </option>
      );
    });

    return (
      <div>
        <hr />
        <Button
          className="collectionButton"
          size="sm"
          outline
          color="secondary"
          onClick={this.toggle}
        >
          Add New Collection
        </Button>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Create New Collection</ModalHeader>
          <ModalBody>
            <Form
              type="multipart/form-data"
              onSubmit={this.updateNewCollection}
              className="container"
              style={{ maxWidth: 600 }}
            >
              <FormGroup>
                <Label for="itemName">Collection Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="itemName"
                  placeholder="Enter item name"
                  value={this.state.name}
                  onChange={this.onChange1}
                />
              </FormGroup>

              <Label for="itemPrice">Choose Sport</Label>
              <select
                type="select"
                value={this.onchange2.val}
                onChange={e => this.onchange2(e.target.value)}
              >
                {categories}
              </select>

              <FormGroup>
                <Label for="description">Description Area</Label>
                <Input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Optional...."
                  value={this.state.description}
                  onChange={this.onChange1}
                />
              </FormGroup>

              <FormGroup>
                <Label for="file">File</Label>
                <Dropzone id="file" onDrop={this.onFileDrop}>
                  <img
                    alt="preview"
                    style={{ width: "199px", height: "198px" }}
                    src={
                      this.state.collectionPic.preview &&
                      this.state.collectionPic.preview
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

export default AddNewCollection;
