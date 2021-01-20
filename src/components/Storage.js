import React from 'react';
import sledgehammer from '../images/storage/sledge.png';
import msg from '../images/storage/msg.png';
import db from '../firebase.js'
import firebase from 'firebase/app';
import 'firebase/firestore';

class Storage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    db.collection("puzzle").doc("storage").get().then((doc) => { this.setState({taken: doc.data().takenToggle}) })
  }

  setDisplayRoute() {
    return this.state.taken ? msg : sledgehammer 
  }

  take() {
    this.setState({taken: true})
    db.collection("puzzle").doc("storage").set({ takenToggle: true })
    db.collection("puzzle").doc("inventory").update({items: firebase.firestore.FieldValue.arrayUnion("Sledgehammer")})
  }

  render() {
    const bookshelfStyle = {
      backgroundColor: 'black',
      width: '100%',
      height: '100%'};

    const enterStyle = {
      position: 'absolute',
      height: '1620px',
      width: '440px',
      top: '0px',
      left: '305px'};

    return (
      <div style={bookshelfStyle}>
        <img src={this.setDisplayRoute()} align="center" className="bookshelf center" alt="bookshelf" />
        { this.state.taken ? '' : <div style={enterStyle} id='book' onClick={() => { this.take()} }/>}
      </div>
    );
  }
}

export default Storage;
