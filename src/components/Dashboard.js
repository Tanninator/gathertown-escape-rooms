import React from 'react';
import db from '../firebase.js'
import axios from 'axios';
import { config1, config2, config3 } from '../config.js';

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = { x: 30, y: 29, puzzleId: this.props.match.params.puzzleId }
  }

  getConfig(id){
    switch(id) {
      case 'puzzle':
        return config1;
      case 'mansion2':
        return config2;
      case 'mansion3':
        return config3;
      default:
        return null
    }
  }

  reset() {
    const puzzleId = this.props.match.params.puzzleId
    db.collection(puzzleId).doc("bookshelf").set({takenToggle: false}, {merge: true})
    db.collection(puzzleId).doc("room").set({offToggle: false}, {merge: true})
    db.collection(puzzleId).doc("door").set({open: false}, {merge: true})
    db.collection(puzzleId).doc("redDoor").set({open: false}, {merge: true})
    db.collection(puzzleId).doc("atticDoor").set({open: false}, {merge: true})
    db.collection(puzzleId).doc("keypad").set({openFlag: false, emptyFlag: false}, {merge: true})
    db.collection(puzzleId).doc("bathroomKeypad").set({openFlag: false, emptyFlag: false}, {merge: true})
    db.collection(puzzleId).doc("car").set({running: false, hasGas: false}, {merge: true})
    db.collection(puzzleId).doc("storage").set({taken: false}, {merge: true})
    db.collection(puzzleId).doc("flooded").set({taken: false}, {merge: true})
    db.collection(puzzleId).doc("furnace").set({done: false, empty: false, hasCoal: false, hasIngot: false, hasMould: false, running: false}, {merge: true})
    db.collection(puzzleId).doc("techlock").set({open: false, takenIngot: false, takenMould: false}, {merge: true})
    db.collection(puzzleId).doc("morseconsole").set({fullValue: "", connected: false}, {merge: true})

    db.collection(puzzleId).doc("inventory").set({items: []}, {merge: true})
    this.lockDoorsAndWindows()
    this.lockRedDoor()
    alert('Flags reset!')
  }

  lockDoorsAndWindows() {
    var config = this.getConfig(this.state.puzzleId)

    axios.get('https://cors-anywhere.herokuapp.com/https://gather.town/api/getMap', {
      params: {
        apiKey: config.API_KEY,
        spaceId: config.ROOM_ID,
        mapId: config.MANSION_ID,
      }
    })
    .then(result => {
      let mapData = result.data;

    let buf = Uint8Array.from(Buffer.from(mapData.collisions, "base64"));
    buf[this.state.y * mapData.dimensions[0] + this.state.x] = 0x01;
    buf[41 * mapData.dimensions[0] + 24] = 0x01;
    buf[42 * mapData.dimensions[0] + 24] = 0x01;
    buf[43 * mapData.dimensions[0] + 24] = 0x01;
    buf[23 * mapData.dimensions[0] + 49] = 0x01;
    buf[33 * mapData.dimensions[0] + 57] = 0x01;
    buf[34 * mapData.dimensions[0] + 57] = 0x01;
    buf[35 * mapData.dimensions[0] + 57] = 0x01;
    buf[17 * mapData.dimensions[0] + 28] = 0x01;
    mapData.collisions = new Buffer(buf).toString("base64");

      return axios.post("https://cors-anywhere.herokuapp.com/https://gather.town/api/setMap", {
        apiKey: config.API_KEY,
        spaceId: config.ROOM_ID,
        mapId: config.MANSION_ID,
        mapContent: mapData
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  lockRedDoor() {
    var config = this.getConfig(this.state.puzzleId)

    axios.get('https://cors-anywhere.herokuapp.com/https://gather.town/api/getMap', {
      params: {
        apiKey: config.API_KEY,
        spaceId: config.ROOM_ID,
        mapId: config.MIRROR_ID,
      }
    })
    .then(result => {
      let mapData = result.data;
      let buf = Uint8Array.from(Buffer.from(mapData.collisions, "base64"));
      buf[19 * mapData.dimensions[0] + 56] = 0x01;
      mapData.collisions = new Buffer(buf).toString("base64");

      return axios.post("https://cors-anywhere.herokuapp.com/https://gather.town/api/setMap", {
        apiKey: config.API_KEY,
        spaceId: config.ROOM_ID,
        mapId: config.MIRROR_ID,
        mapContent: mapData
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <div>
        <button onClick={() => { this.reset()} }> RESET all flags </button>
      </div>
    );
  }
}

export default Dashboard;
