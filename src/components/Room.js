import React from 'react';
import lightOn from '../images/room/light-on-in-room.jpg';
import lightOff from '../images/room/light-off-in-room.png';
import db from '../firebase.js'

class Room extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    db.collection(this.props.match.params.puzzleId).doc("room").get().then((doc) => { this.setState({off: doc.data().offToggle}) })
  }

  setDisplayRoute() {
    return this.state.off ? lightOff : lightOn
  }

  toggle() {
    db.collection(this.props.match.params.puzzleId).doc("room").set({offToggle: !this.state.off}, {merge: true})
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
      top: '415px',
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
