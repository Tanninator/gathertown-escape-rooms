import React from 'react';
import '../css/App.css';
import weirdBookshelf from '../images/bookshelf/bookshelf-weird-book.jpg';
import emptyBookshelf from '../images/bookshelf/bookshelf.jpg';
import db from '../firebase.js'

class Bookshelf extends React.Component {
  constructor(props) {
    super(props)
    this.state = { }
  }

  componentDidMount() {
    this.getData()
  }

  componentDidUpdate() {
    this.getData()
  }

  getData() {
    db.collection("puzzle").doc("bookshelf").get().then((doc) => { this.setState({taken: doc.data().takenToggle}) })
  }

  setDisplayRoute() {
    return this.state.taken ? emptyBookshelf : weirdBookshelf 
  }

  toggle() {
    this.setState({taken: !this.state.taken})
    db.collection("puzzle").doc("bookshelf").set({ takenToggle: !this.state.taken })
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
      top: '250px',
      left: '605px'};

    return (
      <div style={bookshelfStyle}>
        <img src={this.setDisplayRoute()} align="center" className="bookshelf center" alt="bookshelf" />
        <div style={enterStyle} id='book' onClick={() => { this.toggle()} }/>
      </div>
    );
  }
}

export default Bookshelf;
