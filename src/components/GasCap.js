import React from 'react';
import Button from 'react-bootstrap/Button';
import gascap from '../images/car/gas-cap.png';
import db from '../firebase.js';

class GasCap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {inventory: [], hasGas: false, keyName: 'Gasoline', puzzleId: this.props.match.params.puzzleId}
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    db.collection(this.state.puzzleId).doc("car").get().then((doc) => { this.setState({hasGas: doc.data().hasGas}) })
    db.collection(this.state.puzzleId).doc("inventory").get().then((doc) => { this.setState({inventory: doc.data().items}) })
  }

  hasKey() {
    return this.state.inventory.includes(this.state.keyName)
  }

  turnOn() {
    if (this.hasKey()) {
      db.collection(this.state.puzzleId).doc("car").set({hasGas: true}, {merge: true})
      this.setState({hasGas: true})
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
        <img src={gascap} align="center" className="car center" alt="car" />
        { this.state.running ? <div/> : <Button size="lg" style={enterStyle} variant={this.hasKey() && !this.state.hasGas ? 'primary' : 'secondary'} id='button' onClick={() => { this.turnOn()} }> Harvest Gasoline? </Button>}
      </div>
    );
  }
}

export default GasCap;
