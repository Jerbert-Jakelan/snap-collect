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
      modal: false,
      user_id: ''
    }
    this.onChange=this.onChange.bind(this);
    this.updateProfile=this.updateProfile.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.onFileDrop2 = this.onFileDrop2.bind(this);
}

toggle2() {
    this.setState({
      modal: !this.state.modal
    });
  }

onChange(e){
  // console.log('this is state ', this.state)
  this.setState({[e.target.name]: e.target.value});
}


updateProfile = (e) => {
  console.log('HIT')
  e.preventDefault();
const { name, city, state, photo, user_id} = this.state;
axios.put(`/api/profile/update`, { name, city, state, photo})
}


onFileDrop2 = (file) => {
  this.setState({photo: file[0]});
}

  render() {
    return (
        <div>
        <Button outline size='sm' color="info" onClick={this.toggle2}>Update</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle2} className={this.props.className}>
          <ModalHeader toggle={this.toggle2}>Update Your Profile</ModalHeader>
          <ModalBody>
      <Form type="multipart/form-data" onSubmit={this.updateProfile} className="container" style={{maxWidth:600}}>
        <FormGroup>
          
          <Label for="profileName">Name</Label>
          <Input type="text"
           name="name" 
           id="profileName" 
           placeholder="Enter name" 
           value={this.state.name}
           onChange={this.onChange} 
           />
        </FormGroup>

        <Label for="cityName">City</Label>
        <Input type="text"
           name="city" 
           id="cityName" 
           placeholder="Enter city" 
           value={this.state.city}
           onChange={this.onChange} 
           />
           
        <Label for="stateName">State</Label>
        <Input type="text"
           name="state" 
           id="stateName" 
           placeholder="Enter state" 
           value={this.state.state}
           onChange={this.onChange} 
           />

        <FormGroup>
            <Label for="file1">Photo</Label>
              <Dropzone id="file1" onDrop={this.onFileDrop2}  >
              <img alt="profilePic" style={{width: '199px', height: '198px'}} src={this.state.photo.preview && this.state.photo.preview} />
              </Dropzone>
              <Button type="button">Add Files</Button>
        </FormGroup>
     
        <Button  type="submit">Submit</Button>
      </Form>
      </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle2}>Cancel</Button>
          </ModalFooter>
        </Modal>
        </div>
    )
  }
}

export default EditProfile;