import React from 'react';
import '../css/App.css';
import weirdBookshelf from '../images/bookshelf/bookshelf-weird-book.jpg';
import emptyBookshelf from '../images/bookshelf/bookshelf.jpg';

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
  }

  reset() {
    localStorage.setItem('takenToggle', false)
    localStorage.setItem('openFlag', false)
    localStorage.setItem('emptyFlag', false)
    alert('State reset!')
  }

  render() {
    return (
      <div>
        <a onClick={() => { this.reset()} }> RESET state </a>
      </div>
    );
  }
}

export default Dashboard;
