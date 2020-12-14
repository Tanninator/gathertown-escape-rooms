import React from 'react';
import '../css/App.css';
import vault from '../images/passcode-lock.png';

class Puzzle extends React.Component {
  render() {
    return (
      <div>
        <h1 align="center">TEST TO TEST</h1>
        <img src={vault} align="center" className="vault" alt="vault" />
      </div>
    );
  }
}

export default Puzzle;
