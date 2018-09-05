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
import { setUser } from "../../../ducks/reducer";

class EditCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      categoryId: 2,
      description: this.props.description,
      priv: null,
      modal: false,
      categories: []
    };
    this.onChange = this.onChange.bind(this);
    this.updateCollection = this.updateCollection.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onFileDrop = this.onFileDrop.bind(this);
  }

  async componentDidMount() {
    let categories = await axios.get("/api/categories");
    this.setState({ categories: categories.data });
  }

  toggle() {
    // console.log("TOGGLE 2 FIRED")
    this.setState({
      modal: !this.state.modal
    });
  }

  onChange(e) {
    // console.log('this is state ', e)
    // console.log(e.target.value)
    this.setState({ [e.target.name]: e.target.value });
    // console.log(this.state)
  }

  onchange2(val) {
    // console.log('this is val ', val)
    this.setState({
      categoryId: val
    });
  }

  updateCollection = e => {
    // console.log('HIT')
    e.preventDefault();
    // console.log(this.state)
    let { name, categoryId, description, priv } = this.state;

    axios
      .put(`/api/collections/${this.props.collId}`, {
        name,
        categoryId,
        description,
        priv
      })
      .then(collections => {
        console.log(collections);
        this.props.updateCollections(collections.data);
      });
  };

  onFileDrop = file => {
    this.setState({ photo: file[0] });
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
        <Button outline size="sm" color="info" onClick={this.toggle}>
          Edit
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Edit Collection</ModalHeader>
          <ModalBody>
            <Form
              type="multipart/form-data"
              onSubmit={this.updateCollection}
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
                  onChange={this.onChange}
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
                  onChange={this.onChange}
                />
              </FormGroup>

              {/* <FormGroup>
                <Label for="file">File</Label>
                <Dropzone id="file" onDrop={this.onFileDrop}>
                  <img
                    alt="preview"
                    style={{ width: "199px", height: "198px" }}
                    src={
                      this.props.image &&
                      this.props.image
                    }
                  />
                </Dropzone>
              </FormGroup> */}

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

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { setUser }
)(EditCollection);
