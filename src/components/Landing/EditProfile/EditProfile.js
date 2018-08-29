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
  // console.log("TOGGLE 2 FIRED")
    this.setState({
      modal: !this.state.modal,
      // city: '',
      // state: '',
      // name: ''
    });
  }

onChange(e){
  // console.log('this is state ', e)
  // console.log(e.target.value)
  this.setState({[e.target.name]: e.target.value});
  // console.log(this.state)
}

updateProfile = (e) => {
  // console.log('HIT')
  e.preventDefault();
  // console.log(this.state)
let { name, city, state, photo} = this.state;
console.log(name, city, state, photo)
axios.put(`/api/profile/update`, { name, city, state, photo:photo.preview})
}



onFileDrop2 = (file) => {
  this.setState({photo: file[0]});
}

  render() {
    let { name, city, state} = this.state;
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
           value={name}
           onChange={this.onChange} 
           />
        </FormGroup>

        <Label for="cityName">City</Label>
        <Input type="text"
           name="city" 
           id="cityName" 
           placeholder="Enter city" 
           value={city}
           onChange={this.onChange} 
           />
           
        <Label for="stateName">State</Label>
        <Input type="text"
           name="state" 
           id="stateName" 
           placeholder="Enter state" 
           value={state}
           onChange={this.onChange} 
           />

        <FormGroup>
            <Label for="file1">Photo</Label>
              <Dropzone id="file1" onDrop={this.onFileDrop2}  >
              <img alt="profilePic" style={{width: '199px', height: '198px'}} src={this.state.photo.preview && this.state.photo.preview} />
              </Dropzone>
              {/* <Button type="button">Add Files</Button> */}
        </FormGroup>
     
        <Button  type="submit" onClick={this.toggle2}>Submit</Button>
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