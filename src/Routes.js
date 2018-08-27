import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './components/Landing/Landing';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Landing} exact />
      </Switch>
    );
  }
}

export default Routes;