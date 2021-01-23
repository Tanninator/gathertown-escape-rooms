import React from 'react';
import morse from '../images/morse-console/morse-console.png';
import dot from '../images/morse-console/dot.png';
import dash from '../images/morse-console/dash.png';
import dotSound from '../images/morse-console/dot.wav';
import dashSound from '../images/morse-console/dash.wav';
import 'firebase/firestore';
import db from '../firebase.js'
import Button from 'react-bootstrap/Button';

class MorseConsole extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: '', fullValue: '', inventory: [], connected: false, puzzleId: this.props.match.params.puzzleId }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    db.collection(this.state.puzzleId).doc("morseconsole").get().then((doc) => { this.setState({connected: doc.data().connected}) })
    db.collection(this.state.puzzleId).doc("inventory").get().then((doc) => { this.setState({inventory: doc.data().items}) })
  }

  setDisplayRoute(position) {
    return this.displayRoute(this.state.value[position])
  }

  addNum(number) {
    if (number === '.') {
      const audioEl = document.getElementById("dot")
      audioEl.play()
    } else {
      const audioEl = document.getElementById("dash")
      audioEl.play()
    }

    if (this.state.value.length >= 4) {
      this.setState({value: ''})
    } else {
      let newValue = this.state.value.concat(number)
      this.setState({value: newValue})
    }
  }

  enter() {
    if (this.state.value !== '') {
      const morseRef = db.collection(this.props.match.params.puzzleId).doc('morseconsole')
      const currentVal = this.state.value.concat(' / ')
      morseRef.get().then((doc) => { 
        let array = doc.data().fullValue.concat(currentVal)
        morseRef.set({fullValue: array}, {merge: true})
      })
      this.setState({value: ''})
      alert('Transmitted!')
    } else {
      alert('Nothing was transmitted')
    }
  }

  connect() {
    if (this.state.inventory.includes('Morse Transmitter')) {
      db.collection(this.props.match.params.puzzleId).doc('morseconsole').set({connected: true}, {merge: true})
      this.setState({connected: true})
    } else {
      alert('You do not have the Morse Transmitter!')
    }
  }

  displayRoute(number) {
    switch(number) {
      case '.':
        return dot;
      case '-':
        return dash;
      default:
        return null;
    }
  }

  displayConsole() {
    const numOneStyle = {
      position: 'absolute',
      width: '100px',
      top: '460px',
      left: '200px'};

    const numTwoStyle = {
      position: 'absolute',
      width: '100px',
      top: '460px',
      left: '540px'};

    const firstDigitStyle = {
      position: 'absolute',
      height: '120px',
      width: '80px',
      top: '185px',
      left: '250px'};

    const secondDigitStyle = {
      position: 'absolute',
      height: '120px',
      width: '80px',
      top: '185px',
      left: '330px'};

    const thirdDigitStyle = {
      position: 'absolute',
      height: '120px',
      width: '80px',
      top: '185px',
      left: '410px'};

    const forthDigitStyle = {
      position: 'absolute',
      height: '120px',
      width: '80px',
      top: '185px',
      left: '490px'};

    const enterStyle = {
      position: 'absolute',
      top: '600px',
      left: '380px'};

    return(
      <div>
        <audio className="audio-element" id="dot">
          <source src={dotSound}></source>
        </audio>
        <audio className="audio-element" id="dash">
          <source src={dashSound}></source>
        </audio>
        <img src={morse} align="center" className="vault center" alt="vault" />
        { this.state.value.length < 1 ? null :  <img style={firstDigitStyle} src={this.setDisplayRoute(0)} className="digit" alt="digit"/>}
        { this.state.value.length < 2 ? null :  <img style={secondDigitStyle} src={this.setDisplayRoute(1)} className="digit" alt="digit"/>}
        { this.state.value.length < 3 ? null :  <img style={thirdDigitStyle} src={this.setDisplayRoute(2)} className="digit" alt="digit"/>}
        { this.state.value.length < 4 ? null :  <img style={forthDigitStyle} src={this.setDisplayRoute(3)} className="digit" alt="digit"/>}

        <Button style={numOneStyle} id='numOne' onClick={() => { this.addNum('.')} }>Dot</Button>
        <Button style={numTwoStyle} id='numTwo' onClick={() => { this.addNum('-')} }>Dash</Button>
        <Button style={enterStyle} variant="success" id='enter' onClick={() => { this.enter()} }>Transmit</Button>
        </div>)
  }

  render() {
    const bkgdStyle = {
      position: 'absolute',
      height: '1080px',
      width: '720px'};

    const buttonStyle = {
      position: 'absolute',
      top: '190px',
      left: '610px'};

    return (
      <div>
        { this.state.connected ? this.displayConsole() : <div style={bkgdStyle}><Button style={buttonStyle} onClick={() => { this.connect()} }> Connect the Morse Transmitter </Button></div> }
      </div>
    );
  }
}

export default MorseConsole;
