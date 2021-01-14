import React from 'react';
import db from '../firebase.js'

import '../css/App.css';

class Dashboard extends React.Component {
  reset() {
    db.collection("puzzle").doc("bookshelf").set({ takenToggle: false})
    db.collection("puzzle").doc("room").set({ offToggle: false})
    db.collection("puzzle").doc("keypad").set({ openFlag: false})
    db.collection("puzzle").doc("keypad").set({ emptyFlag: false})
    alert('Flags reset!')
  }

  render() {
    return (
      <div>
        <button onClick={() => { this.reset()} }> RESET all flags </button>
      </div>
    );
  }
}

export default Dashboard;
