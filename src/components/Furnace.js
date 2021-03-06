import React from 'react';
import Button from 'react-bootstrap/Button';
import firebase from 'firebase/app';
import 'firebase/firestore';
import fireOn from '../images/furnace/gaslamp.mp3';
import smelt from '../images/furnace/litfuse.mp3';
import offFurnace from '../images/furnace/warm-furnace.png';
import onFurnace from '../images/furnace/hot-furnace.png';
import key from '../images/key/key.jpeg';
import db from '../firebase.js';

class Furnace extends React.Component {
  constructor(props) {
    super(props)
    this.state = {running: false, inventory: [], hasIngot: false, hasMould: false, hasCoal: false, done: false, empty: false, puzzleId: this.props.match.params.puzzleId}
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    db.collection(this.state.puzzleId).doc("furnace").get().then((doc) => { this.setState({running: doc.data().running, hasIngot: doc.data().hasIngot, hasMould: doc.data().hasMould, hasCoal: doc.data().hasCoal, done: doc.data().done, empty: doc.data().empty}) })
    db.collection(this.state.puzzleId).doc("inventory").get().then((doc) => { this.setState({inventory: doc.data().items}) })
  }

  hasCoal() {
    return this.state.inventory.includes("Coal")
  }

  hasMould() {
    return this.state.inventory.includes('Key Mould')
  }

  hasIngot() {
    return this.state.inventory.includes('Bronze Ingot')
  }

  turnOn() {
    if (this.state.running) { alert('Furnace is already running!') }
    if (!this.state.hasCoal) { alert('Need to add coal first!') }
    else {
      db.collection(this.state.puzzleId).doc("furnace").set({running: true}, {merge: true})
      this.setState({running: true})
      const audioEl = document.getElementById("igniteSound")
      audioEl.play()
      alert('Started the furnace!')
    }
  }

  addCoal() {
    console.log(this.hasCoal())
    if (this.state.running) { alert('Furnace is already running!') }
    else if (!this.hasCoal()) { alert('Need coal to add coal!') }
    else {
      db.collection(this.state.puzzleId).doc("furnace").set({hasCoal: true}, {merge: true})
      this.setState({hasCoal: true}) 
      db.collection(this.state.puzzleId).doc("inventory").update({ items: firebase.firestore.FieldValue.arrayRemove("Coal") })
      alert('Added the coal')
    }
  }

  addIngot() {
    if (this.state.hasIngot) { alert('You already added the bronze ingot!') }
    if (!this.hasIngot()) { alert('You need the bronze ingot!') }
    else {
      db.collection(this.state.puzzleId).doc("furnace").set({hasIngot: true}, {merge: true})
      this.setState({hasIngot: true})
      alert('Added the ingott')
    }
  }

  addMould() {
    if (this.state.hasMould) { alert('You already added the key mould!') }
    if (!this.hasMould()) { alert('You need the key mould!') }
    else {
      db.collection(this.state.puzzleId).doc("furnace").set({hasMould: true}, {merge: true})
      this.setState({hasMould: true})
      alert('Added the mould')
    }
  }

  smeltKey() {
    if (!this.state.hasCoal) { alert('Need to start the furnace first!') }
    else if (!this.state.hasIngot) { alert('Needs bronze ingot') }
    else if (!this.state.hasMould) { alert('Needs key mould') }
    else {
      db.collection(this.state.puzzleId).doc("furnace").set({done: true}, {merge: true})
      this.setState({done: true})
      const audioEl = document.getElementById("smeltSound")
      audioEl.play()
    }
  }

  takeKey() {
    db.collection(this.state.puzzleId).doc("inventory").update({ items: firebase.firestore.FieldValue.arrayUnion("Car Key") })
    db.collection(this.state.puzzleId).doc("furnace").set({empty: true}, {merge: true})
    this.setState({empty: true})
  }

  furnaceImage() {
    return this.state.running ? onFurnace : offFurnace
  }

  furnace() {
    const onStyle = {
      position: 'absolute',
      top: '175px',
      left: '245px'};

    const coalStyle = {
      position: 'absolute',
      top: '275px',
      left: '245px'};

    const ingotStyle = {
      position: 'absolute',
      top: '375px',
      left: '245px'};

    const mouldStyle = {
      position: 'absolute',
      top: '475px',
      left: '245px'};

    const smeltStyle = {
      position: 'absolute',
      top: '375px',
      left: '845px'};

    if (this.state.done) {
      return( this.state.empty ? <h1 style={{color: 'white'}}>You took the key</h1> : <img src={key} onClick={() => { this.takeKey()} } align="center" alt="key" />)
    } else {
      return(
        <div>
          <img src={this.furnaceImage()} align="center" className="car center" alt="car" />
          <Button size="lg" style={onStyle} id='button' onClick={() => { this.turnOn() } }> Turn On </Button>
          <Button size="lg" style={coalStyle} id='button' onClick={() => { this.addCoal() } }> Add Coal </Button>
          <Button size="lg" style={ingotStyle} id='button' onClick={() => { this.addIngot() } }> Add Bronze Ingot </Button>
          <Button size="lg" style={mouldStyle} id='button' onClick={() => { this.addMould() } }> Add Key Mould</Button>
          <Button size="lg" style={smeltStyle} id='button' onClick={() => { this.smeltKey() } }> Smelt Key</Button>
        </div>);
    }
  }

  render() {
    const bookshelfStyle = {
      backgroundColor: 'black',
      width: '100%',
      height: '100%'};

    return (
      <div style={bookshelfStyle}>
        <audio className="audio-element" id="igniteSound">
          <source src={fireOn}></source>
        </audio>
        <audio className="audio-element" id="smeltSound">
          <source src={smelt}></source>
        </audio>
        { this.furnace() }
      </div>
    );
  }
}

export default Furnace;
