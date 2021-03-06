import React from 'react';
import gas from '../images/flooded-room/flooded-with-gas.jpg';
import noGas from '../images/flooded-room/flooded-room.jpg';
import db from '../firebase.js'
import firebase from 'firebase/app';
import 'firebase/firestore';

class FloodedRoom extends React.Component {
  constructor(props) {
    super(props)
    this.state = { puzzleId: this.props.match.params.puzzleId }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    db.collection(this.state.puzzleId).doc("flooded").get().then((doc) => { this.setState({taken: doc.data().taken}) })
  }

  setDisplayRoute() {
    return this.state.taken ? noGas : gas 
  }

  take() {
    this.setState({taken: true})
    db.collection(this.state.puzzleId).doc("flooded").set({ taken: true })
    db.collection(this.state.puzzleId).doc("inventory").update({items: firebase.firestore.FieldValue.arrayUnion("Gas Can")})
    alert('You got the Gas Can!')
  }

  render() {
    const bookshelfStyle = {
      backgroundColor: 'black',
      width: '100%',
      height: '100%'};

    const enterStyle = {
      position: 'absolute',
      height: '100px',
      width: '100px',
      top: '490px',
      left: '705px'};

    return (
      <div style={bookshelfStyle}>
        <img src={this.setDisplayRoute()} align="center" className="bookshelf center" alt="bookshelf" />
        { this.state.taken ? '' : <div style={enterStyle} id='book' onClick={() => { this.take()} }/>}
      </div>
    );
  }
}

export default FloodedRoom;
