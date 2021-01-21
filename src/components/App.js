import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Keypad from './Keypad';
import Bookshelf from './Bookshelf';
import Room from './Room';
import Door from './Door';
import Radio from './Radio';
import Storage from './Storage';
import Car from './Car';
import GasCap from './GasCap';
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
              <Keypad {...props} passcode='1224' /> )}/>
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
              path="**/radio"
              render={(props) => (
              <Radio {...props} /> )}/>
            <Route
              path="**/storage"
              render={(props) => (
              <Storage {...props} /> )}/>
            <Route
              path="**/car"
              render={(props) => (
              <Car {...props} /> )}/>
            <Route
              path="**/gascap"
              render={(props) => (
              <GasCap {...props} /> )}/>
            <Route
              path="**/dashboard"
              render={(props) => (
              <Dashboard {...props} /> )}/>
          </Switch>
        </BrowserRouter>)
  }
}

export default App;
