import React, { Component } from 'react';
import './Landing.css';
// import Collections from '../Collections/Collections';
import { Card, CardHeader, CardFooter, CardBody, CardText } from 'reactstrap';
import AddNewCollection from './AddNewCollection/AddNewCollection';
import EditProfile from './EditProfile/EditProfile';
import axios from 'axios';

class Avatar extends Component {
  constructor(props){
    super(props);
    this.state={
      profile:[],
      collection:[]
    }
  }
  componentDidMount = () => {
    this.getUser();
    this.getCollections();
  };
  getUser = () => {
  axios.get('/api/getProfile').then(res =>{
    this.setState({
        profile: res.data
    })
  })
  }
  getCollections = () => {
    axios.get('/api/collections').then(payload =>{
      this.setState({
          collection: payload.data
      })
    })
    }

  render() {
    const {profile, collection} = this.state

    let loop = profile.map((e,i) =>{  
    return (
      <ProfileLanding 
      index={i}
      key={e.user_id}
      image={e.profile_pic}
      name={e.name}
      city={e.city}
      state={e.state}
      />
    )})

    let looper2 = collection.map((e,i) =>{  
      return (
        <Collections
        index={i}
        key={e.collection_id}
        collId={e.collection_id}
        image={e.collection_pic}
        name={e.name}
        description={e.description}
        />
      )})

    return (
      <div>
           {loop}
           <AddNewCollection/>
           {looper2}
      </div>
     )
  }
}

const ProfileLanding = (props) =>  {
  return (
    <div>
       <div className="avatar" style={{height:50, width:50}} >
          <img src={props.image} alt="user pic" />
      </div>
      <EditProfile/>
      <h2>{props.name}</h2>
          <h3>{props.city}</h3>
          <h3>{props.state}</h3>
    </div>
  )
}

const Collections = (props) => {
    
  return (
    <div>
      <Card>
        <CardHeader>{props.name}</CardHeader>
        <CardBody>
          
          <div className="collections" >
            <img style={{height:50, width:50}} alt="alt" src={props.collection_pic}/>
          </div>
          <CardText>{props.description}</CardText>
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
      
    </div>
  );
}

//This is for user 


class Landing extends Component {
  render() {
    return (
      <div>
        <div id="user-profile">
          <Avatar/>
        </div>
      </div>
    )
  }
}
     

export default Landing;