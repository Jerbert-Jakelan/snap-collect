import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import CollectionDetail from "./components/CollectionDetail/CollectionDetail";
import PubCollections from "./components/PubCollections/PubCollections";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/dashboard" component={Landing} exact />
        <Route path="/publiccollections" component={PubCollections} />
        <Route path="/collection/:collection_id" component={CollectionDetail} />
      </Switch>
    );
  }
}

export default Routes;
