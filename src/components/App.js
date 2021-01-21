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
import Inventory from './Inventory';
import Furnace from './Furnace';
import Coal from './Coal';
import TechLock from './TechLock';
import Car from './Car';
import GasCap from './GasCap';
import Dashboard from './Dashboard';

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
              path="**/:puzzleId/keypad/:keypadId"
              render={(props) => (
              <Keypad {...props}/> )}/>
            <Route
              path="**/:puzzleId/bookshelf"
              render={(props) => (
              <Bookshelf {...props} /> )}/>
            <Route
              path="**/:puzzleId/door/:doorId"
              render={(props) => (
              <Door {...props} /> )}/>
            <Route
              path="**/:puzzleId/room"
              render={(props) => (
              <Room {...props} /> )}/>
            <Route
              path="**/:puzzleId/furnace"
              render={(props) => (
              <Furnace {...props} /> )}/>
            <Route
              path="**/:puzzleId/techlock"
              render={(props) => (
              <TechLock {...props} /> )}/>
            <Route
              path="**/:puzzleId/reddoor"
              render={(props) => (
              <RedDoor {...props} /> )}/>
            <Route
              path="**/:puzzleId/flooded_room"
              render={(props) => (
              <FloodedRoom {...props} /> )}/>
            <Route
              path="**/:puzzleId/radio"
              render={(props) => (
              <Radio {...props} /> )}/>
            <Route
              path="**/:puzzleId/storage"
              render={(props) => (
              <Storage {...props} /> )}/>
            <Route
              path="**/:puzzleId/car"
              render={(props) => (
              <Car {...props} /> )}/>
            <Route
              path="**/:puzzleId/coal"
              render={(props) => (
              <Coal {...props} /> )}/>
            <Route
              path="**/:puzzleId/gascap"
              render={(props) => (
              <GasCap {...props} /> )}/>
            <Route
              path="**/:puzzleId/dashboard"
              render={(props) => (
              <Dashboard {...props} /> )}/>
          </Switch>
        </BrowserRouter></div>)
  }
}

export default App;
