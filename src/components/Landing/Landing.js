import React, { Component } from 'react';
import './Landing.css';

var user = {
  basicInfo: {
    name: "The Babe",
    location: "New York, NY",
    photo: "http://3.bp.blogspot.com/-XHBaFcpD8lE/Vo3dK5IUcbI/AAAAAAAABQk/2-A8yiTrRj8/s1600/52T%2BRUTH%2BHOF.jpg",
    myCollections: ['Baseball ', 'Football ', 'Basketball '],
    mySubscriptions: ['Bad News Bears group ', 'I hate Hockey group ', 'Collect Pokiemon group ']
  }
}

class Avatar extends React.Component {
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

class MainPanel extends React.Component {
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

      </div>
    );
  }
}

class Landing extends Component {
  render() {
    return (
      <div id="user-profile">
        <MainPanel info={user.basicInfo} />
      </div>
    )
  }
}
     

export default Landing;