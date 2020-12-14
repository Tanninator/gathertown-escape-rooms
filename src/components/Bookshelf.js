import React from 'react';
import '../css/App.css';
import weirdBookshelf from '../images/bookshelf/bookshelf-weird-book.jpg';
import emptyBookshelf from '../images/bookshelf/bookshelf.jpg';

class Bookshelf extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.getInitialState()
  }

  getInitialState() {
    let takenToggle = localStorage.getItem( 'takenToggle' || false );
    return { taken: takenToggle === 'true' };
  }

  setDisplayRoute() {
    return this.state.taken ? emptyBookshelf : weirdBookshelf
  }

  toggle() {
    localStorage.setItem('takenToggle', !this.state.taken)
    this.setState({taken: !this.state.taken})
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
