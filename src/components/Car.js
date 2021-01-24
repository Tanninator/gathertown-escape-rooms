import React from 'react';
import Button from 'react-bootstrap/Button';
import car from '../images/car/car.png';
import carStart from '../images/car/car-start.mp3';
import db from '../firebase.js';
import { config1, config2, config3, config4 } from '../config.js';
import axios from 'axios';

class Car extends React.Component {
  constructor(props) {
    super(props)
    this.state = {running: false, inventory: [], hasGas: false, keyName: 'Car Key', puzzleId: this.props.match.params.puzzleId}
  }

  componentDidMount() {
    this.getData()
  }

  getConfig(id){
    switch(id) {
      case 'puzzle':
        return config1;
      case 'mansion2':
        return config2;
      case 'mansion3':
        return config3;
      case 'mansion4':
          return config4;
      default:
        return null
    }
  }

  getData() {
    db.collection(this.state.puzzleId).doc("car").get().then((doc) => { this.setState({running: doc.data().running, hasGas: doc.data().hasGas}) })
    db.collection(this.state.puzzleId).doc("inventory").get().then((doc) => { this.setState({inventory: doc.data().items}) })
  }

  playAudio() {
    const audioEl = document.getElementsByClassName("audio-element")[0]
    audioEl.play()
  }

  hasKey() {
    return this.state.inventory.includes(this.state.keyName)
  }

  turnOn() {
    if (this.hasKey() && this.state.hasGas) {
      db.collection(this.state.puzzleId).doc("car").set({running: true}, {merge: true})
      this.setState({running: true})
      this.openCarTiles()
      this.playAudio()
      alert('The car is running, hop in!')
    }
  }

  openCarTiles() {
    var config = this.getConfig(this.state.puzzleId)

    axios.get('https://powerful-coast-83273.herokuapp.com/https://gather.town/api/getMap', {
      params: {
        apiKey: config.API_KEY,
        spaceId: config.ROOM_ID,
        mapId: config.MANSION_ID,
      }
    })
    .then(result => {
      let mapData = result.data;
      let buf = Uint8Array.from(Buffer.from(mapData.collisions, "base64"));
      buf[33 * mapData.dimensions[0] + 57] = 0x00;
      buf[34 * mapData.dimensions[0] + 57] = 0x00;
      buf[35 * mapData.dimensions[0] + 57] = 0x00;
      mapData.collisions = new Buffer(buf).toString("base64");

      return axios.post("https://powerful-coast-83273.herokuapp.com/https://gather.town/api/setMap", {
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

  buttonText(hasKey) {
    if (this.hasKey() && !this.state.hasGas) {
      return 'No Gas'
    }
    if (!this.hasKey() && this.state.hasGas) {
      return 'No Key'
    }
    if (!this.hasKey() && this.state.hasGas) {
      return 'No Key & No Gas!'
    }
    return 'Start the engine!'
  }

  render() {
    const bookshelfStyle = {
      backgroundColor: 'black',
      width: '100%',
      height: '100%'};

    const enterStyle = {
      position: 'absolute',
      top: '375px',
      left: '445px'};

    return (
      <div style={bookshelfStyle}>
        <img src={car} align="center" className="car center" alt="car" />
        <audio className="audio-element">
          <source src={carStart}></source>
        </audio>
        <Button size="lg" style={enterStyle} variant={this.hasKey() && this.state.hasGas ? 'primary' : 'secondary'} id='button' onClick={() => { this.turnOn()} }> { this.buttonText() } </Button>
      </div>
    );
  }
}

export default Car;
