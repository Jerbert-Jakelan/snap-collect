import React, { Component } from "react";
import "./Landing.css";
import AddNewCollection from "./AddNewCollection/AddNewCollection";
import axios from "axios";
import { connect } from "react-redux";
import { Button, Card, CardText, CardTitle } from "reactstrap";
import { setUser } from "../../ducks/reducer";
import ProfileLanding from "./ProfileLanding/ProfileLanding";
import { Link, Redirect } from "react-router-dom";
import Collections from "./Collections/Collections";

class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: [],
      collection: [],
      redirect: false
    };
  }

  componentDidMount = async () => {
    let user = await axios.get("/api/getProfile");
    console.log(user);
    if(user.data.message) {
      this.setState({redirect: true});
    } else {
      this.props.setUser(user.data[0]);
      this.getCollections();
    }
  };

  getCollections = () => {
    axios.get("/api/collections").then(payload => {
      this.setState({
        collection: payload.data
      });
    });
  };
  updateCollections = collection => {
    this.setState({ collection });
  };
  render() {
    if(this.state.redirect) {
      return <Redirect to="/"/>
    }
    const { collection } = this.state;
    let looper2 = collection.map((e, i) => {
      return (
        <Collections
          index={i}
          key={e.collection_id}
          collId={e.collection_id}
          image={e.collection_pic}
          name={e.name}
          description={e.description}
          priv={e.private}
          updateCollections={this.updateCollections}
        />
      );
    });
    return (
      <div>
        <div className="desk-top-wrapper-view">
          <div className="pro-div">
             <ProfileLanding />
          </div>
          <hr className="hrLanding" />
          <div className="card-div">
            <Card className="cardLanding">
            <CardTitle className="no-show-on-mobile">Explore Public Collections</CardTitle>
              <CardTitle className="no-show-on-desktop">Search | Explore | Find</CardTitle>
              <CardText className="only-viewable-desktop">
              Search cards by city, state, user name or description.
              </CardText>
              <Link to="/PublicCollection">
                <Button className="pubColBtn" outline>
                Public Collections
                </Button>
              </Link>{" "}
            </Card>
          </div>
        </div>
          <hr className="hrLanding" />
          <hr className="hrLanding2" />
          <div className="col-div">
            <h3 className="myCollections">My Collections</h3>
            <AddNewCollection updateCollections={this.updateCollections} />       
            <div className="collection-wrapper">{looper2}</div>
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;
export default connect(
  mapStateToProps,
  { setUser }
)(Avatar);
