import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Keypad from './Keypad';
import Bookshelf from './Bookshelf';
import Room from './Room';
import Door from './Door';
import RedDoor from './RedDoor';
import Radio from './Radio';
import Storage from './Storage';
import FloodedRoom from './FloodedRoom';
import Furnace from './Furnace';
import Coal from './Coal';
import Car from './Car';
import GasCap from './GasCap';
import Dashboard from './Dashboard';
import Inventory from './Inventory';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    const background = {
      backgroundColor: 'black',
      width: '100%',
      height: '100%'};

    return (
        <div style={background}>
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
              path="**/furnace"
              render={(props) => (
              <Furnace {...props} /> )}/>
            <Route
              path="**/reddoor"
              render={(props) => (
              <RedDoor {...props} /> )}/>
            <Route
              path="**/flooded_room"
              render={(props) => (
              <FloodedRoom {...props} /> )}/>
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
              path="**/coal"
              render={(props) => (
              <Coal {...props} /> )}/>
            <Route
              path="**/gascap"
              render={(props) => (
              <GasCap {...props} /> )}/>
            <Route
              path="**/dashboard"
              render={(props) => (
              <Dashboard {...props} /> )}/>
          </Switch>
        </BrowserRouter></div>)
  }
}

export default App;
