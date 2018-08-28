import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './components/Landing/Landing';
import CollectionDetail from './components/CollectionDetail/CollectionDetail';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Landing} exact />
        <Route path="/collection/:collection_id" component={CollectionDetail} />
      </Switch>
    );
  }
}

export default Routes;