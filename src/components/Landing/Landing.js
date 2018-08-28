import React, { Component } from 'react';
import './Landing.css';
// import Collections from '../Collections/Collections';
import { Card, CardHeader, CardFooter, CardBody,
  CardTitle } from 'reactstrap';

//Hard coded example user profile data
var user = {
  basicInfo: {
    name: "The Babe",
    location: "New York, NY",
    photo: "http://3.bp.blogspot.com/-XHBaFcpD8lE/Vo3dK5IUcbI/AAAAAAAABQk/2-A8yiTrRj8/s1600/52T%2BRUTH%2BHOF.jpg",
    myCollections: ['http://3.bp.blogspot.com/-XHBaFcpD8lE/Vo3dK5IUcbI/AAAAAAAABQk/2-A8yiTrRj8/s1600/52T%2BRUTH%2BHOF.jpg', 'http://3.bp.blogspot.com/-XHBaFcpD8lE/Vo3dK5IUcbI/AAAAAAAABQk/2-A8yiTrRj8/s1600/52T%2BRUTH%2BHOF.jpg ', 'http://3.bp.blogspot.com/-XHBaFcpD8lE/Vo3dK5IUcbI/AAAAAAAABQk/2-A8yiTrRj8/s1600/52T%2BRUTH%2BHOF.jpg '],
    mySubscriptions: ['Bad News Bears group ', 'I hate Hockey group ', 'Collect Pokiemon group ']
  }
}

//This is for user picture
class Avatar extends Component {
  render() {
    var image = this.props.image,
        style = {
          width: this.props.width || 50,
          height: this.props.height || 50
        }; 
    
    if (!image) return null;
    return (
     <div className="avatar" style={style}>
           <img src={this.props.image} /> 
     </div>
    );
  }
}

// collection cards  under subscriptions
class Collections extends Component {
  render(){
   const style = {
      width:  50,
      height: 50
    };
    
  return (
    <div>
      <Card>
        <CardHeader></CardHeader>
        <CardBody>
          <CardTitle> My Collections</CardTitle>
          <div className="collections" >
            <img style={style} src={this.props.info.myCollections[0]}/>
            <img style={style} src={this.props.info.myCollections[1]}/>
            <img style={style} src={this.props.info.myCollections[2]}/>
          </div>
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
      
    </div>
  );
}
}

//This is for user 
class MainPanel extends Component {
  render() {
    var info = this.props.info;
    if (!info) return null;
    return (
     <div>
        <div className="top">
            <Avatar 
               image={info.photo} 
               width={100}
               height={100}
            /> 
            <h2>{info.name}</h2>
            <h3>{info.location}</h3>
          <hr />

        </div>

        <div className="subscriptions">
          <h4>My Subscriptions</h4>
          <p>{info.mySubscriptions[0]}</p>
          <p>{info.mySubscriptions[1]}</p>
          <p>{info.mySubscriptions[2]}</p>
        </div>
        <Collections info={user.basicInfo} />
      </div>
    );
  }
}

class Landing extends Component {
  render() {
    return (
      <div>
        <div id="user-profile">
          <MainPanel info={user.basicInfo} />
        </div>
      </div>
    )
  }
}
     

export default Landing;