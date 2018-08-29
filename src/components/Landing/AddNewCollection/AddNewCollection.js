import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Dropzone from 'react-dropzone'
import axios from 'axios';


class AddNewCollection extends Component {
  constructor(props){
    super(props);
    this.state={
      name:'',
      description:'',
      categoryId:'',
      collectionPic:'',
      modal: false
    }
    this.onChange1=this.onChange1.bind(this);
    this.onchange2=this.onchange2.bind(this);
    this.updateNewCollection=this.updateNewCollection.bind(this);
    this.toggle = this.toggle.bind(this);
}

toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

onChange1(e){
  this.setState({[e.target.name]: e.target.value});
}
onchange2(val){ 
  // console.log('this is val ', val)
  this.setState({
    categoryId: val
  })
}

updateNewCollection = (e) => {
  e.preventDefault();
const { name, description, categoryId, collectionPic} = this.state;
 axios.post('/api/collections', { name, description, categoryId, collectionPic})
}

onFileDrop = (file) => {
  this.setState({collectionPic: file[0]});
}

  render() {

    return (
        <div>
        <Button outline color="danger" onClick={this.toggle}>Add New</Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Create New Collection</ModalHeader>
          <ModalBody>
            <Form type="multipart/form-data" onSubmit={this.updateNewCollection} className="container" style={{maxWidth:600}}>
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
              onChange={(e) => this.onchange2(e.target.value)}>
                <option name="categoryId" value={parseInt(2)}>Baseball</option>
                <option name="categoryId" value="3">Football</option>
                <option name="categoryId" value="6">Soccer</option>
                <option name="categoryId" value="5">Basketball</option>
                <option name="categoryId" value="4">Hockey</option>
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
                    <Dropzone id="file" onDrop={this.onFileDrop}  >
                    <img alt="preview" style={{width: '199px', height: '198px'}} src={this.state.collectionPic.preview && this.state.collectionPic.preview} />
                    </Dropzone>
              </FormGroup>
     
            <Button  type="submit">Submit</Button>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default AddNewCollection;