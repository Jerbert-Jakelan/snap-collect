import React, { Component } from "react";
import "./Landing.css";
import AddNewCollection from "./AddNewCollection/AddNewCollection";
import axios from "axios";
import { connect } from "react-redux";
import { Button, Card, CardTitle } from "reactstrap";
import { setUser } from "../../ducks/reducer";
import ProfileLanding from "./ProfileLanding/ProfileLanding";
import { Link } from "react-router-dom";
import Collections from "./Collections/Collections";

class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: [],
      collection: []
    };
  }

  componentDidMount = async () => {
    let user = await axios.get("/api/getProfile");
    this.props.setUser(user.data[0]);
    this.getCollections();
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
        <ProfileLanding />
        {/* <div className="container"> */}
        {/* <Row> */}
        {/* <Col> */}
        <hr className="hrLanding" />
        <Card className="cardLanding">
          <CardTitle>Search | Explore | Find</CardTitle>
          {/* <CardText>
            Search cards by city, state, user name or description.
          </CardText> */}
          <Link to="/PublicCollection">
            <Button className="pubColBtn" outline>
              Public Collections
            </Button>
          </Link>{" "}
        </Card>
        {/* </Col> */}
        {/* </Row> */}
        {/* </div> */}
        <hr className="hrLanding" />
        <h3 className="myCollections">My Collections</h3>
        <AddNewCollection updateCollections={this.updateCollections} />
        <div className="harlan-test">{looper2}</div>
      </div>
    );
  }
}

const mapStateToProps = state => state;
export default connect(
  mapStateToProps,
  { setUser }
)(Avatar);
