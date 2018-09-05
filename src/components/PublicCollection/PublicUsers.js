import React, { Component } from "react";
import axios from "axios";
import "./PublicUsers.css";
import PublicUsersView from "./PublicUsersView";
// import "../CollectionDetail/CollectionDetail.css";

class PublicUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      input: ""
    };
  }

  componentDidMount = () => {
    this.getUsers();
  };

  getUsers = () => {
    axios.get("/api/getAllUsers").then(res => {
      this.setState({
        users: res.data
      });
    });
  };

  handleInput = val => {
    this.setState({
      input: val.toLowerCase()
    });
  };

  render() {
    const { input } = this.state;
    console.log(this.state);
    let usersSearch = this.state.users
      .filter(e => {
        return (
          e.name.toLowerCase().includes(input) ||
          e.city.toLowerCase().includes(input) ||
          e.state.toLowerCase().includes(input)
        );
      })
      .map((e, i) => {
        return (
          <PublicUsersView
            index={i}
            key={e.user_id}
            name={e.name}
            pic={e.profile_pic}
            city={e.city}
            state={e.state}
          />
        );
      });

    return (
      <div className="collection-home">
        <input
          className="inputSearch"
          placeholder=" public users search"
          onChange={event => this.handleInput(event.target.value)}
        />
        <div className="card-wrapper"> {usersSearch} </div>
      </div>
    );
  }
}
export default PublicUsers;
