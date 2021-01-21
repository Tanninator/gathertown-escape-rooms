import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Button from 'react-bootstrap/Button';
import gastap from '../images/gas/gastap.png';
import db from '../firebase.js';

class GasTap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {inventory: [], keyName: 'Gas Can', puzzleId: this.props.match.params.puzzleId}
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    db.collection(this.state.puzzleId).doc("inventory").get().then((doc) => { this.setState({inventory: doc.data().items}) })
  }

  hasKey() {
    return this.state.inventory.includes(this.state.keyName)
  }

  turnOn() {
    if (this.hasKey()) {
      db.collection(this.state.puzzleId).doc("inventory").update({items: firebase.firestore.FieldValue.arrayUnion('Gasoline')})
      alert('Gasoline acquired!')
    } else {
      alert('You have nothing to gather it with!')
    }
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
        <img src={gastap} align="center" className="gas-tap center" alt="gas-tap" />
        <Button size="lg" style={enterStyle} id='button' onClick={() => { this.turnOn()} }> Harvest Gasoline? </Button>
      </div>
    );
  }
}

export default GasTap;
