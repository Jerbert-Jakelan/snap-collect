import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import CollectionDetail from './components/CollectionDetail/CollectionDetail';
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Landing} exact />
        <Route path="/collection/:collection_id" component={CollectionDetail} />
        <Route path="/login" component={Login} />
      </Switch>
    );
  }
}

export default Routes;
