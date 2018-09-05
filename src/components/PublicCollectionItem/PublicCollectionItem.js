// import React, { Component } from "react";
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   CardText,
//   Button
// } from "reactstrap";
import { Link } from "react-router-dom";
import "./PublicCollectionItem.css";

// export default class PublicCollectionItem extends Component {
//   render() {
//     return (
//       <div data-cy-PublicProfile className="public-profile-wrapper">
//         <Card>
//           <div className="user-info">
//             <CardHeader>{this.props.name}</CardHeader>
//             <img className="avatar-img" src={this.props.proPic} alt="userpic" />
//             <p>{this.props.userName}</p>
//             <p>{this.props.city} </p>
//             <p>{this.props.state}</p>
//           </div>
//           <CardBody>
//             <div className="collections">
//               <Link to={`/collection/${this.props.collId}`}>
//                 <img
//                   className="collectionImage"
//                   onClick={() => this.props.selectCollection(this.props.collId)}
//                   alt="alt"
//                   src={this.props.image}
//                 />
//               </Link>
//             </div>
//             <CardText>{this.props.description}</CardText>
//           </CardBody>
//           <CardFooter />
//         </Card>
//       </div>
//     );
//   }
// }
/////////////////////////TEST CARD OF JUSTICE AND TRUTH////////////////////
import React, { Component } from "react";

export default class PublicCollectionItem extends Component {
  render() {
    return (
      <div>
        <div className="public-collection-wrap">
          <div className="public-collection-header">
            <h3> {this.props.name}</h3>
          </div>
          <div className="public-collection-image-wrap">
            <div className="overlay">
              <div className="description-wrapper">
                <p>{this.props.description}</p>
                <Link to={`/collection/${this.props.collId}`}>
                  <button className="view-collection">View Collection</button>
                </Link>
              </div>
            </div>
            <img
              className="collection-image"
              alt="alt"
              src={this.props.image}
            />
          </div>
          <div className="public-collection-user">
            <img className="avatar-img" src={this.props.proPic} alt="userpic" />
            <div>
              <h4>{this.props.userName}</h4>
              <h5>{this.props.city}</h5>
              <h5>{this.props.state}</h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
