import React, { Component } from 'react';
import './Landing.css';
import { Card, CardHeader, CardFooter, CardBody, CardText } from 'reactstrap';
import AddNewCollection from './AddNewCollection/AddNewCollection';
import axios from 'axios';
import {connect} from 'react-redux';
import {setUser} from '../../ducks/reducer';
import ProfileLanding from './ProfileLanding/ProfileLanding';

class Avatar extends Component {
  constructor(props){
    super(props);
    this.state={
      profile:[],
      collection:[]
    }
  }
  componentDidMount = () => {
    // this.getUser();
    this.getCollections();
  };
  // getUser = () => {
  // axios.get('/api/getProfileDefault').then(res =>{
  //   this.setState({
  //       profile: res.data
  //   })
  // })
  // }
  getCollections = () => {
    axios.get('/api/collections').then(payload =>{
      this.setState({
          collection: payload.data
      })
    })
    }
  updateCollections = collection => {
    this.setState({collection});
  }
  render() {
    const {collection} = this.state

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
           <ProfileLanding />
           <AddNewCollection
            updateCollections={this.updateCollections}/>
           {looper2}
      </div>
     )
  }
}

const Collections = (props) => {
  return (
    <div>
      <Card>
        <CardHeader>{props.name}</CardHeader>
        <CardBody>
          <div className="collections" >
            <img style={{height:50, width:50}} alt="alt" src={props.image}/>
          </div>
          <CardText>{props.description}</CardText>
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}

class Landing extends Component {
  async componentDidMount() {
    let user = await axios.get('/api/getProfile');
    this.props.setUser(user.data[0]);
  }
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

const mapStateToProps = state => state;
export default connect(mapStateToProps, {setUser})(Landing);