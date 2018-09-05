import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter, CardText } from "reactstrap";
import { connect } from "react-redux";
import Switch from "react-switch";
import axios from "axios";
import { selectCollection } from "../../../ducks/reducer";
import "./Collections.css";
import EditCollection from "../EditCollection/EditCollection";
import DeleteCollectionBTN from "../DeleteCollectionBTN/DeleteCollectionBTN";

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
          checked={this.state.checked}
          onChange={this.handleChange}
          onColor="#4ca1af"
          uncheckedIcon={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: 7,
                color: "white",
                paddingRight: 2
              }}
            >
              Private
            </div>
          }
          checkedIcon={<p className="togglePublic">Public</p>}
          className="react-switch"
          id="icon-switch"
        />
      ) : null;

    let editButton =
      this.props.match.path !== "/PublicCollection" ? (
        <EditCollection
          key={this.props.collection_id}
          collId={this.props.collId}
          image={this.props.collection_pic}
          name={this.props.name}
          description={this.props.description}
          updateCollections={this.props.updateCollections}
        />
      ) : null;

    let deleteButton =
      this.props.match.path !== "/PublicCollection" ? (
        <DeleteCollectionBTN
          className="deleteThisCard"
          id={this.props.collId}
          updateCollections={this.props.updateCollections}
        />
      ) : null;
    return (
      // <div data-cy-collections className="cardDisplay">
      //   <Card>
      //     <div className="toggleSwitch">
      //       <CardHeader className="cardHeadPubCol">
      //         {this.props.name}
      //         {toggleSwitch}
      //       </CardHeader>
      //     </div>
      //     <div className="pubColFullCard">
      //       {this.props.proPic ? (
      //         <img
      //           className="avatarPubPic"
      //           src={this.props.proPic}
      //           alt="userpic"
      //         />
      //       ) : null}
      //       <div className="pubColUserDetails">
      //         <p>{this.props.userName ? this.props.userName : null}</p>
      //         <p>{this.props.city ? this.props.city : null}</p>
      //         <p>{this.props.state ? this.props.state : null}</p>
      //       </div>
      //     </div>
      //     <CardBody>
      //       <div className="collections">
      //         <Link to={`/collection/${this.props.collId}`}>
      //           <img
      //             className="collectionImage"
      //             onClick={() => this.props.selectCollection(this.props.collId)}
      //             alt="alt"
      //             src={this.props.image}
      //           />
      //         </Link>
      //       </div>
      //       <CardText>{this.props.description}</CardText>
      //     </CardBody>
      //     <CardFooter>
      //       {editButton}
      //       {deleteButton}
      //     </CardFooter>
      //   </Card>
      // </div>
      <div>
        <div className="public-collection-wrap">
          <div className="collection-header">
            <div>
              <h5> {this.props.name}</h5>
            </div>
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
            {editButton}
            {deleteButton}
            {toggleSwitch}
          </div>
        </div>
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
