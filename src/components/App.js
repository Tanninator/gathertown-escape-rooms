import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Keypad from './Keypad';
import Bookshelf from './Bookshelf';
import Room from './Room';
import Door from './Door';
import Dashboard from './Dashboard';
import Inventory from './Inventory';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Inventory />
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
              path="**/door"
              render={(props) => (
              <Door {...props} /> )}/>
            <Route
              path="**/room"
              render={(props) => (
              <Room {...props} /> )}/>
            <Route
              path="**/dashboard"
              render={(props) => (
              <Dashboard {...props} /> )}/>
          </Switch>
        </BrowserRouter>)
  }
}

export default App;
