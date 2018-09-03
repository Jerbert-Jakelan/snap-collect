import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import CollectionDetail from './components/CollectionDetail/CollectionDetail';
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import PublicCollection from './components/PublicCollection/PublicCollection';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/dashboard" component={Landing} exact />
        <Route path="/PublicCollection" component={PublicCollection} exact/>
        <Route path="/collection/:collection_id" component={CollectionDetail} />
      </Switch>
    );
  }
}

export default Routes;
