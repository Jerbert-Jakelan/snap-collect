import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter, CardText, Button } from "reactstrap";
import { connect } from "react-redux";
import Switch from "react-switch";
import axios from 'axios';
import { selectCollection } from "../../../ducks/reducer";
import "./Collections.css";
import EditCollection from "../EditCollection/EditCollection";

class Collections extends Component {

  state = {
    checked: !this.props.priv
  }

  handleChange = async checked => {
    this.setState({ checked });
    let collections = await axios.put(`/api/collections/${this.props.collId}/private`, {private: !this.state.checked});
    this.props.updateCollections(collections.data);
  }

  render() {
    let toggleSwitch = this.props.match.path !== '/PublicCollection' ? 
      <Switch onChange={this.handleChange} checked={this.state.checked} id="normal-switch" /> :
      null

    return (
      <div data-cy-collections className="cardDisplay">
        <Card>
          <CardHeader>
            {this.props.name}
            {toggleSwitch}
          </CardHeader>
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

export default withRouter(connect(
  mapStateToProps,
  { selectCollection }
)(Collections));
