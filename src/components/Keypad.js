import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import vault from '../images/keypad/passcode-lock.png';
import one from '../images/keypad/1.png';
import two from '../images/keypad/2.png';
import three from '../images/keypad/3.png';
import four from '../images/keypad/4.png';
import five from '../images/keypad/5.png';
import six from '../images/keypad/6.png';
import seven from '../images/keypad/7.png';
import eight from '../images/keypad/8.png';
import nine from '../images/keypad/9.png';
import key from '../images/key/key.jpeg'
import empty from '../images/key/you-took-the-key.jpg'
import db from '../firebase.js'

class Keypad extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: '' }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    const keypadRef = db.collection(this.props.match.params.puzzleId).doc(this.props.match.params.keypadId)
    keypadRef.get().then((doc) => { this.setState({open: doc.data().openFlag, passcode: doc.data().passcode, empty: doc.data().emptyFlag, keyName: doc.data().keyName}) })
  }

  addNum(number) {
    if (this.state.value.length >= 4) {
      this.setState({value: ''})
    } else {
      let newValue = this.state.value.concat(number)
      this.setState({value: newValue})
    }
  }

  setDisplayRoute(position) {
    return this.displayRoute(this.state.value[position])
  }

  enter() {
    if (this.state.value === this.state.passcode) {
      this.setState({open: true})
      const keypadRef = db.collection(this.props.match.params.puzzleId).doc(this.props.match.params.keypadId)
      keypadRef.set({openFlag: true}, {merge: true})
    } else {
      this.setState({value: ''})
      alert('Wrong number')
    }
  }

  take() {
    db.collection(this.props.match.params.puzzleId).doc(this.props.match.params.keypadId).set({emptyFlag: true}, {merge: true})
    const inventoryRef = db.collection(this.props.match.params.puzzleId).doc("inventory")
    inventoryRef.update({items: firebase.firestore.FieldValue.arrayUnion(this.state.keyName)})
    this.setState({empty: true})
  }

  displayRoute(number) {
    switch(number) {
      case '1':
        return one;
      case '2':
        return two;
      case '3':
        return three;
      case '4':
        return four;
      case '5':
        return five;
      case '6':
        return six;
      case '7':
        return seven;
      case '8':
        return eight;
      case '9':
        return nine;
      default:
        return null;
    }
  }

  displaySafe() {
    const numOneStyle = {
      position: 'absolute',
      height: '80px',
      width: '120px',
      top: '360px',
      left: '200px'};

    const numTwoStyle = {
      position: 'absolute',
      height: '80px',
      width: '120px',
      top: '360px',
      left: '340px'};

    const numThreeStyle = {
      position: 'absolute',
      height: '80px',
      width: '120px',
      top: '360px',
      left: '480px'};

    const numFourStyle = {
      position: 'absolute',
      height: '80px',
      width: '120px',
      top: '480px',
      left: '200px'};

    const numFiveStyle = {
      position: 'absolute',
      height: '80px',
      width: '120px',
      top: '480px',
      left: '340px'};
  
    const numSixStyle = {
      position: 'absolute',
      height: '80px',
      width: '120px',
      top: '480px',
      left: '480px'};

    const numSevenStyle = {
      position: 'absolute',
      height: '80px',
      width: '120px',
      top: '590px',
      left: '200px'};

    const numEightStyle = {
      position: 'absolute',
      height: '80px',
      width: '120px',
      top: '590px',
      left: '340px'};
  
    const numNineStyle = {
      position: 'absolute',
      height: '80px',
      width: '120px',
      top: '590px',
      left: '480px'};

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
      height: '80px',
      width: '120px',
      top: '190px',
      left: '610px'};

    return(
      <div>
        <img src={vault} align="center" className="vault center" alt="vault" />
        { this.state.value.length < 1 ? null :  <img style={firstDigitStyle} src={this.setDisplayRoute(0)} className="digit" alt="digit"/>}
        { this.state.value.length < 2 ? null :  <img style={secondDigitStyle} src={this.setDisplayRoute(1)} className="digit" alt="digit"/>}
        { this.state.value.length < 3 ? null :  <img style={thirdDigitStyle} src={this.setDisplayRoute(2)} className="digit" alt="digit"/>}
        { this.state.value.length < 4 ? null :  <img style={forthDigitStyle} src={this.setDisplayRoute(3)} className="digit" alt="digit"/>}

        <div style={numOneStyle} id='numOne' onClick={() => { this.addNum('1')} }/>
        <div style={numTwoStyle} id='numTwo' onClick={() => { this.addNum('2')} }/>
        <div style={numThreeStyle} id='numThree' onClick={() => { this.addNum('3')} }/>
        <div style={numFourStyle} id='numFour' onClick={() => { this.addNum('4')} }/>
        <div style={numFiveStyle} id='numFive' onClick={() => { this.addNum('5')} }/>
        <div style={numSixStyle} id='numSix' onClick={() => { this.addNum('6')} }/>
        <div style={numSevenStyle} id='numSeven' onClick={() => { this.addNum('7')} }/>
        <div style={numEightStyle} id='numEight' onClick={() => { this.addNum('8')} }/>
        <div style={numNineStyle} id='numNine' onClick={() => { this.addNum('9')} }/>
        <div style={enterStyle} id='enter' onClick={() => { this.enter()} }/>
        </div>)
  }

  render() {
    const keypadStyle = {
      backgroundColor: 'black',
      width: '100%',
      height: '100%'};

    return (
      <div style={keypadStyle}>
        { (!this.state.open && !this.state.empty) ? this.displaySafe() : null }
        { this.state.open && !this.state.empty ? <img src={key} onClick={() => { this.take() } } alt="key"/> : null }
        { this.state.empty && this.state.empty ? <img src={empty} alt="empty" /> : null }
      </div>
    );
  }
}

export default Keypad;
