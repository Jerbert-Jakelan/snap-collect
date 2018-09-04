import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  Button
} from "reactstrap";
import { connect } from "react-redux";
import Switch from "react-switch";
import axios from "axios";
import { selectCollection } from "../../../ducks/reducer";
import "./Collections.css";
import EditCollection from "../EditCollection/EditCollection";

class Collections extends Component {
  state = {
    checked: true
  };

  componentDidMount() {
    this.setState({ checked: !this.props.priv });
  }

  handleChange = checked => {
    this.setState({ checked }, async () => {
      let collections = await axios.put(
        `/api/collections/${this.props.collId}/private`,
        { private: !this.state.checked }
      );
      this.props.updateCollections(collections.data);
    });
  };

  render() {
    let toggleSwitch =
      this.props.match.path !== "/PublicCollection" ? (
        <Switch
          // className="toggleSwitch"
          onChange={this.handleChange}
          checked={this.state.checked}
          id="normal-switch"
        />
      ) : null;


    let editButton = this.props.match.path !== '/PublicCollection' ?
      <EditCollection 
        key={this.props.collection_id}
        collId={this.props.collId}
        image={this.props.collection_pic}
        name={this.props.name}
        description={this.props.description}
        updateCollections={this.props.updateCollections}/> :
        null

    return (
      <div data-cy-collections className="cardDisplay">
        <Card>
          <div className="toggleSwitch">
            <CardHeader className="cardHeadPubCol">
              {this.props.name}
              {toggleSwitch}
            </CardHeader>
          </div>
          <div className="pubColFullCard">
            {this.props.proPic ? (
              <img
                className="avatarPubPic"
                // height={50}
                // width={50}
                // style={{ borderRadius: "50%" }}
                src={this.props.proPic}
                alt="userpic"
              />
            ) : null}
            <div className="pubColUserDetails">
              <p>{this.props.userName ? this.props.userName : null}</p>
              <p>{this.props.city ? this.props.city : null}</p>
              <p>{this.props.state ? this.props.state : null}</p>
            </div>
          </div>
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
<<<<<<< HEAD
            <EditCollection
              key={this.props.collection_id}
              collId={this.props.collId}
              image={this.props.collection_pic}
              name={this.props.name}
              description={this.props.description}
              updateCollections={this.props.updateCollections}
            />
=======
            {editButton}
>>>>>>> master
          </CardFooter>
        </Card>
      </div>
    );
  }
}
const mapStateToProps = state => state;

export default withRouter(
  connect(
    mapStateToProps,
    { selectCollection }
  )(Collections)
);
