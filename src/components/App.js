import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Puzzle from './Puzzle';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route
              path="**/puzzle"
              render={(props) => (
              <Puzzle {...props} passcode='2114' /> )}/>
          </Switch>
        </BrowserRouter>)
  }
}

export default App;
