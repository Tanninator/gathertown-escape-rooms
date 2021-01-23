import React from 'react';
import morse from '../images/morse-console/morse-view.png';
import 'firebase/firestore';
import db from '../firebase.js'
import Button from 'react-bootstrap/Button';
import { config } from '../config.js';
import axios from 'axios';

class MorseMonitor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { fullValue: '', passcode: 'placeholder', inventory: [], connected: false, puzzleId: this.props.match.params.puzzleId, x: 56, y: 19 }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    db.collection(this.state.puzzleId).doc("morseconsole").get().then((doc) => { this.setState({fullValue: doc.data().fullValue, passcode: doc.data().passcode}) })
    db.collection(this.state.puzzleId).doc("inventory").get().then((doc) => { this.setState({inventory: doc.data().items}) })
  }

  removeImpassableTile() {
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
      buf[this.state.y * mapData.dimensions[0] + this.state.x] = 0x00;
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

  openLibrary() {
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
      buf[23 * mapData.dimensions[0] + 49] = 0x00;
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

  enter() {
    if (this.state.fullValue === this.state.passcode) {
      this.removeImpassableTile()
      this.openLibrary()
      alert('A click sounded, the door is open!')
    } else {
      db.collection(this.props.match.params.puzzleId).doc('morseconsole').set({fullValue: ''}, {merge: true})
      this.setState({fullValue: ''})
      alert('Wrong passcode!')
    }
  }

  clear() {
    db.collection(this.props.match.params.puzzleId).doc('morseconsole').set({fullValue: ''}, {merge: true})
    this.setState({fullValue: ''})
  }

  displayConsole() {
    const numOneStyle = {
      position: 'absolute',
      width: '310px',
      height: '260px',
      top: '550px',
      left: '85px'};

    const numTwoStyle = {
      position: 'absolute',
      width: '280px',
      height: '260px',
      top: '550px',
      left: '404px'};

    const displayStyle = {
      position: 'absolute',
      color: 'limegreen',
      height: '265px',
      width: '370px',
      top: '170px',
      left: '150px'};

    return(
      <div>
        <img src={morse} align="center" className="vault center" alt="vault" />
        <h2 style={displayStyle}>{this.state.fullValue}</h2>
        <Button style={numOneStyle} variant='success' id='enter' onClick={() => { this.enter()} }>Submit</Button>
        <Button style={numTwoStyle} variant='danger' id='clear' onClick={() => {this.clear()} }>Clear</Button>
        </div>)
  }

  render() {
    return (
      <div>
        { this.displayConsole() }
      </div>
    );
  }
}

export default MorseMonitor;
