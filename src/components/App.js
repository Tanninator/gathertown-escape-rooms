import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Keypad from './Keypad';
import Bookshelf from './Bookshelf';
import Dashboard from './Dashboard';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route
              path="**/keypad"
              render={(props) => (
              <Keypad {...props} passcode='2114' /> )}/>
            <Route
              path="**/bookshelf"
              render={(props) => (
              <Bookshelf {...props} /> )}/>
            <Route
              path="**/dashboard"
              render={(props) => (
              <Dashboard {...props} /> )}/>
          </Switch>
        </BrowserRouter>)
  }
}

export default App;
