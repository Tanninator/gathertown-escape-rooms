import React from 'react';
import weirdBookshelf from '../images/bookshelf/bookshelf-weird-book.jpg';
import emptyBookshelf from '../images/bookshelf/bookshelf.jpg';
import db from '../firebase.js'
import firebase from 'firebase/app';
import 'firebase/firestore';

class Bookshelf extends React.Component {
  constructor(props) {
    super(props)
    this.state = { puzzleId: this.props.match.params.puzzleId }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    db.collection(this.state.puzzleId).doc("bookshelf").get().then((doc) => { this.setState({taken: doc.data().takenToggle}) })
  }

  setDisplayRoute() {
    return this.state.taken ? emptyBookshelf : weirdBookshelf 
  }

  take() {
    this.setState({taken: true})
    db.collection(this.state.puzzleId).doc("bookshelf").set({ takenToggle: true })
    db.collection(this.state.puzzleId).doc("inventory").update({items: firebase.firestore.FieldValue.arrayUnion("Odd Book")})
  }

  render() {
    const bookshelfStyle = {
      backgroundColor: 'black',
      width: '100%',
      height: '100%'};

    const enterStyle = {
      position: 'absolute',
      height: '220px',
      width: '40px',
      top: '290px',
      left: '605px'};

    return (
      <div style={bookshelfStyle}>
        <img src={this.setDisplayRoute()} align="center" className="bookshelf center" alt="bookshelf" />
        { this.state.taken ? '' : <div style={enterStyle} id='book' onClick={() => { this.take()} }/>}
      </div>
    );
  }
}

export default Bookshelf;
