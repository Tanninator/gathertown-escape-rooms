import React from 'react';
import Button from 'react-bootstrap/Button';
import gascap from '../images/car/gas-cap.png';
import db from '../firebase.js';

class GasCap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {inventory: [], hasGas: false, keyName: 'Gasoline'}
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    db.collection("puzzle").doc("car").get().then((doc) => { this.setState({hasGas: doc.data().hasGas}) })
    db.collection("puzzle").doc("inventory").get().then((doc) => { this.setState({inventory: doc.data().items}) })
  }

  hasKey() {
    return this.state.inventory.includes(this.state.keyName)
  }

  turnOn() {
    if (this.hasKey()) {
      db.collection("puzzle").doc("car").set({hasGas: true}, {merge: true})
      this.setState({hasGas: true})
    }
  }

  buttonText(hasKey) {
    if (!this.hasKey()) {
      return 'No Gasoline'
    }
    if (this.state.hasGas) {
      return 'Filled'
    }
    return 'Fill up!'
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
        { this.state.running ? <div/> : <Button size="lg" style={enterStyle} variant={this.hasKey() && !this.state.hasGas ? 'primary' : 'secondary'} id='button' onClick={() => { this.turnOn()} }> { this.buttonText() } </Button>}
      </div>
    );
  }
}

export default GasCap;
