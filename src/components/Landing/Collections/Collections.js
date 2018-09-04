import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter, CardText, Button } from "reactstrap";
import { connect } from "react-redux";
import { selectCollection } from "../../../ducks/reducer";
import "./Collections.css";
import EditCollection from "../EditCollection/EditCollection";

class Collections extends Component {
  render() {
    return (
      <div data-cy-collections className="cardDisplay">
        <Card>
          <CardHeader>{this.props.name}</CardHeader>
          {this.props.proPic ? 
          <img height={50} width={50} style={{borderRadius:"50%"}}src={this.props.proPic} alt="userpic"/> : null}
          <p>{this.props.userName ? this.props.userName : null}</p>
          <p>{this.props.city ? this.props.city : null}</p>
          <p>{this.props.state ? this.props.state : null}</p>
          <CardBody>
            <div className="collections">
              <Link to={`/collection/${this.props.collId}`}>
                <img
                  className="collectionImage"
                  onClick={() => this.props.selectCollection(this.props.collId)}
                  // style={{ height: 50, width: 50 }}
                  alt="alt"
                  src={this.props.image}
                />
              </Link>
            </div>
            <CardText>{this.props.description}</CardText>
          </CardBody>
          <CardFooter>
            <EditCollection 
              key={this.props.collection_id}
              collId={this.props.collId}
              image={this.props.collection_pic}
              name={this.props.name}
              description={this.props.description}
              updateCollections={this.props.updateCollections}/>
          </CardFooter>
        </Card>
      </div>
    );
  }
}
const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { selectCollection }
)(Collections);
