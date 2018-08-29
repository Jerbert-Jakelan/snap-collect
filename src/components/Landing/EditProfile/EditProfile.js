import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Dropzone from 'react-dropzone'
import axios from 'axios';


class EditProfile extends Component {
  constructor(props){
    super(props);
    this.state={
      name:'',
      city:'',
      state: '',
      photo:'',
      modal: false
    }
    this.onChange1=this.onChange1.bind(this);
    this.onChange2=this.onChange2.bind(this);
    this.onChange3=this.onChange3.bind(this);
    this.updateProfile=this.updateProfile.bind(this);
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
onChange2(e){
    // console.log('this is e ', e)
    this.setState({[e.target.city]: e.target.value});
  }
onChange3(e){
    // console.log('this is e ', e)
    this.setState({[e.target.state]: e.target.value});
  }


updateProfile = async(e) => {
  e.preventDefault();
const { name, city, state, photo} = this.state;
axios.post(`/api/profile/update`, { name, city, state, photo})
}


onFileDrop = (file) => {
  this.setState({photo: file[0]});
}

  render() {
    return (
        <div>
        <Button outline size='sm' color="info" onClick={this.toggle}>Update</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Create New Collection</ModalHeader>
          <ModalBody>
      <Form type="multipart/form-data" onSubmit={this.addProduct} className="container" style={{maxWidth:600}}>
        <FormGroup>
          
          <Label for="itemName">Name</Label>
          <Input type="text"
           name="name" 
           id="ProfileName" 
           placeholder="Enter name" 
           value={this.state.name}
           onChange={this.onChange1} 
           />
        </FormGroup>

        <Label for="city">City</Label>
        <Input type="text"
           name="city" 
           id="cityName" 
           placeholder="Enter city" 
           value={this.state.city}
           onChange={this.onChange2} 
           />
           
        <Label for="state">State</Label>
        <Input type="text"
           name="state" 
           id="StateName" 
           placeholder="Enter state" 
           value={this.state.state}
           onChange={this.onChange3} 
           />
        
        {/* <FormGroup>
          <Label for="description">Description Area</Label>
            <Input type="textarea" 
            name="description" 
            id="description" 
            placeholder="Optional...." 
            value={this.state.description}
            onChange={this.onChange1}
            />
        </FormGroup> */}

        <FormGroup>
            <Label for="file">Photo</Label>
              <Dropzone id="file" onDrop={this.onFileDrop}  >
              <img style={{width: '199px', height: '198px'}} src={this.state.photo.preview && this.state.photo.preview} />
              </Dropzone>
        </FormGroup>
     
        <Button  onClick={ () =>this.updateProfile(this.props.id)} type="submit">Submit</Button>
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

export default EditProfile;