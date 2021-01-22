import React from 'react';
import Button from 'react-bootstrap/Button';
import lockedDoor from '../images/door/lockedDoor.jpg';
import openDoor from '../images/door/openDoor.jpg';
import db from '../firebase.js';
import { config } from '../config.js';
import axios from 'axios';

class Door extends React.Component {
  constructor(props) {
    super(props)
    this.state = {open: false, inventory: [], keyName: 'placeholder', x: null, y: null, puzzleId: this.props.match.params.puzzleId }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    db.collection(this.state.puzzleId).doc(this.props.match.params.doorId).get().then((doc) => { this.setState({open: doc.data().open, keyName: doc.data().keyName, x: doc.data().x, y: doc.data().y}) })
    db.collection(this.state.puzzleId).doc("inventory").get().then((doc) => { this.setState({inventory: doc.data().items}) })
  }

  setDisplayRoute() {
    if (this.state.open) {
      return openDoor
    } else {
      return lockedDoor
    }
  }

  hasKey() {
    return this.state.inventory.includes(this.state.keyName)
  }

  open() {
    if (this.hasKey()) {
      db.collection(this.state.puzzleId).doc(this.props.match.params.doorId).set({open: true}, {merge: true})
      this.setState({open: true})
      this.removeImpassableTile()
    }
  }

  removeImpassableTile() {
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
      buf[this.state.y * mapData.dimensions[0] + this.state.x] = 0x00;
      if (this.state.keyName === 'Bathroom Key') {
        buf[41 * mapData.dimensions[0] + 24] = 0x00;
        buf[42 * mapData.dimensions[0] + 24] = 0x00;
        buf[43 * mapData.dimensions[0] + 24] = 0x00;
      }
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

  buttonText() {
    return this.hasKey() ? 'Open Door' : "You don't have the key" 
  }

  render() {
    const bookshelfStyle = {
      backgroundColor: 'black',
      width: '100%',
      height: '100%'};

    const enterStyle = {
      position: 'absolute',
      top: '375px',
      left: this.hasKey() ? '445px' : '410px'};

    return (
      <div style={bookshelfStyle}>
        <img src={this.setDisplayRoute()} align="center" className="door center" alt="door" />
        { this.state.open ? <div /> : <Button size="lg" style={enterStyle} variant={this.hasKey() ? 'primary' : 'secondary'} id='button' onClick={() => { this.open()} }> { this.buttonText() } </Button>}
      </div>
    );
  }
}

export default Door;
