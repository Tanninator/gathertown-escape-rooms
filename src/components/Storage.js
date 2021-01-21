import React from 'react';
import sledgehammer from '../images/storage/sledge.png';
import msg from '../images/storage/msg.png';
import db from '../firebase.js'
import firebase from 'firebase/app';
import 'firebase/firestore';

class Storage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { puzzleId: this.props.match.params.puzzleId }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    db.collection(this.state.puzzleId).doc("storage").get().then((doc) => { this.setState({taken: doc.data().taken}) })
  }

  setDisplayRoute() {
    return this.state.taken ? msg : sledgehammer 
  }

  take() {
    this.setState({taken: true})
    db.collection(this.state.puzzleId).doc("storage").set({ taken: true }, {merge: true})
    db.collection(this.state.puzzleId).doc("inventory").update({items: firebase.firestore.FieldValue.arrayUnion("Sledgehammer")})
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
