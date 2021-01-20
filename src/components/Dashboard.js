import React from 'react';
import db from '../firebase.js'
import axios from 'axios';
import { config } from '../config.js';

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = { x: 30, y: 29 }
  }

  reset() {
    db.collection("puzzle").doc("bookshelf").set({takenToggle: false}, {merge: true})
    db.collection("puzzle").doc("room").set({offToggle: false}, {merge: true})
    db.collection("puzzle").doc("door").set({open: false}, {merge: true})
    db.collection("puzzle").doc("keypad").set({openFlag: false, emptyFlag: false}, {merge: true})
    db.collection("puzzle").doc("inventory").set({items: []}, {merge: true})
    this.lockDoorsAndWindows()
    alert('Flags reset!')
  }

  lockDoorsAndWindows() {
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

  render() {
    return (
      <div>
        <button onClick={() => { this.reset()} }> RESET all flags </button>
      </div>
    );
  }
}

export default Dashboard;
