import React from 'react';
import Button from 'react-bootstrap/Button';
import lockedDoor from '../images/door/lockedDoor.jpg';
import openDoor from '../images/door/openDoor.jpg';
import db from '../firebase.js';

class RedDoor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {open: false, inventory: [], keyName: 'placeholder', x: 56, y: 19, puzzleId: this.props.match.params.puzzleId }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    db.collection(this.state.puzzleId).doc("redDoor").get().then((doc) => { this.setState({open: doc.data().open, keyName: doc.data().keyName, x: doc.data().x, y: doc.data().y}) })
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
      db.collection(this.state.puzzleId).doc("reddoor").set({open: true}, {merge: true})
      this.setState({open: true})
      this.removeImpassableTile()
      this.openLibrary()
      alert('Door opened!')
    }
  }

  buttonText() {
    return this.hasKey() ? 'Destroy the door' : 'You might be able to break the door down'
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
        <img src={lockedDoor} align="center" className="door center" alt="door" />
        <Button size="lg" style={enterStyle} variant={this.hasKey() ? 'primary' : 'secondary'} id='button' onClick={() => { this.open()} }> { this.buttonText() } </Button>
      </div>
    );
  }
}

export default RedDoor;
