import React from 'react';
import techlock from '../images/techlock/tech-lock.png';
import firebase from 'firebase/app';
import 'firebase/firestore';
import empty from '../images/techlock/empty.png';
import ingot from '../images/techlock/brassbar.png';
import mould from '../images/techlock/key_mold.png';
import Button from 'react-bootstrap/Button';

import db from '../firebase.js'

class TechLock extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: '', password: 'placeholder', open: '', takenIngot: false, takenMould: false }
  }

  componentDidMount() {
   this.getData()
  }

  getData() {
    db.collection(this.props.match.params.puzzleId).doc("techlock").get().then((doc) => { this.setState({password: doc.data().password, open: doc.data().open, takenIngot: doc.data().takenIngot, takenMould: doc.data().takenMould}) })
  }

  setDisplayRoute() {
    return this.state.open ? empty : techlock
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  takeIngot() {
    db.collection(this.props.match.params.puzzleId).doc("techlock").set({takenIngot: true}, {merge: true})
    db.collection(this.props.match.params.puzzleId).doc("inventory").update({items: firebase.firestore.FieldValue.arrayUnion('Bronze Ingot')})
    this.setState({takenIngot: true})
    alert("You got the Bronze Ingot!")
  }

  takeMould() {
    db.collection(this.props.match.params.puzzleId).doc("techlock").set({takenMould: true}, {merge: true})
    db.collection(this.props.match.params.puzzleId).doc("inventory").update({items: firebase.firestore.FieldValue.arrayUnion('Key Mould')})
    this.setState({takenMould: true})
    alert("You got the Key Mould!")
  }

  open() {
    if (this.state.value === this.state.password) {
      db.collection(this.props.match.params.puzzleId).doc("techlock").set({open: true}, {merge: true})
      this.setState({open: true})
    } else {
      alert('Wrong password')
    }
  }

  render() {
    const bookshelfStyle = {
      backgroundColor: 'black',
      width: '100%',
      height: '100%'};

    const formStyle = {
      position: 'absolute',
      width: '350px',
      top: '315px',
      left: '120px'};

    const enterStyle = {
      position: 'absolute',
      top: '385px',
      left: '255px'};

    const ingotStyle = {
      position: 'absolute',
      top: '685px',
      left: '105px'};

    const mouldStyle = {
      position: 'absolute',
      top: '685px',
      left: '655px'};

    return (
      <div style={bookshelfStyle}>
        <img src={this.setDisplayRoute()} align="center" className="bookshelf center" alt="bookshelf" />
        { this.state.open ? <div/> : <input style={formStyle} onChange={(e) => {this.handleChange(e)}}/>}
        { this.state.open ? <div/> : <Button style={enterStyle} onClick={() => { this.open()} }>Submit</Button>}
        { this.state.open && !this.state.takenIngot ? <img style={ingotStyle} src={ingot} alt="ingot" onClick={() => { this.takeIngot()} }/> : <div/>}
        { this.state.open && !this.state.takenMould ? <img style={mouldStyle} src={mould} alt="mould"onClick={() => { this.takeMould()} }/> : <div/>}
      </div>
    );
  }
}

export default TechLock;
