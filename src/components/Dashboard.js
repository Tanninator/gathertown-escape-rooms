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
    alert('Flags reset!')
  }

  lockDoors() {
    axios.get('https://gather.town/api/getMap', {
      params: {
        apiKey: config.API_KEY,
        spaceId: config.ROOM_ID,
        mapId: config.MAP_ID,
      }
    })
    .then(result => {
      let mapData = result.data;

    let buf = Uint8Array.from(Buffer.from(mapData.collisions, "base64"));
    buf[this.state.y * mapData.dimensions[0] + this.state.x] = 0x00;
    mapData.collisions = new Buffer(buf).toString("base64");

      return axios.post("https://gather.town/api/setMap", {
        apiKey: config.API_KEY,
        spaceId: config.ROOM_ID,
        mapId: config.MAP_ID,
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
