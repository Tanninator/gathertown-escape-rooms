import React from 'react';
import '../css/App.css';
import lightOn from '../images/room/light-on-in-room.jpg';
import lightOff from '../images/room/light-off-in-room.png';
import db from '../firebase.js'

class Room extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    db.collection("puzzle").doc("keypad").get().then((doc) => { this.setState({offToggle: doc.data().offToggle}) })
  }

  setDisplayRoute() {
    return this.state.off ? lightOff : lightOn
  }

  toggle() {
    db.collection("puzzle").doc("keypad").set({openFlag: !this.state.off})
    this.setState({off: !this.state.off})
  }

  render() {
    const bookshelfStyle = {
      backgroundColor: 'black',
      width: '100%',
      height: '100%'};

    const enterStyle = {
      position: 'absolute',
      height: '60px',
      width: '40px',
      top: '375px',
      left: '815px'};

    return (
      <div style={bookshelfStyle}>
        <img src={this.setDisplayRoute()} align="center" className="bookshelf center" alt="bookshelf" />
        <div style={enterStyle} id='book' onClick={() => { this.toggle()} }/>
      </div>
    );
  }
}

export default Room;
