import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Dropzone from 'react-dropzone'
import axios from 'axios';


class AddNewCollection extends Component {
  constructor(props){
    super(props);
    this.state={
      name:'',
      price:'',
      description:'',
      categoryId:'',
      productImage:'',
      modal: false
    }
    this.onChange1=this.onChange1.bind(this);
    this.onchange2=this.onchange2.bind(this);
    this.updateProduct=this.updateProduct.bind(this);
    this.toggle = this.toggle.bind(this);
}

toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

onChange1(e){
  // console.log('this is e ', e)
  this.setState({[e.target.name]: e.target.value});
}
onchange2(val){ 
  // console.log('this is val ', val)
  this.setState({
    categoryId: val
  })
}

updateProduct = async(e) => {
  e.preventDefault();
const { name, price, description, categoryId, productImage} = this.state;
axios.post(`/api/product/update`, { name, price, description, categoryId, productImage})
}


onFileDrop = (file) => {
  this.setState({productImage: file[0]});
}

  render() {
  
    return (
        <div>
        <Button outline color="danger" onClick={this.toggle}>Add New</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Create New Collection</ModalHeader>
          <ModalBody>
      <Form type="multipart/form-data" onSubmit={this.addProduct} className="container" style={{maxWidth:600}}>
        <FormGroup>
          
          <Label for="itemName">Collection Name</Label>
          <Input type="text"
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
              <option name="categoryId" value="1">Baseball</option>
              <option name="categoryId" value="2">Football</option>
              <option name="categoryId" value="3">Soccer</option>
              <option name="categoryId" value="4">Basketball</option>
              <option name="categoryId" value="5">Hockey</option>
            </select>
        
        <FormGroup>
          <Label for="description">Description Area</Label>
            <Input type="textarea" 
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
              <img style={{width: '199px', height: '198px'}} src={this.state.productImage.preview && this.state.productImage.preview} />
              </Dropzone>
        </FormGroup>
     
        <Button  onClick={ () =>this.updateProduct(this.props.id)} type="submit">Submit</Button>
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