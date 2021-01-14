import React from 'react';
import '../css/App.css';

class Dashboard extends React.Component {
  reset() {
    db.collection("puzzle").doc("bookshelf").set({ takenToggle: false})
    db.collection("puzzle").doc("room").set({ offToggle: false})
    db.collection("puzzle").doc("keypad").set({ openFlag: false})
    db.collection("puzzle").doc("keypad").set({ emptyFlag: false})
    alert('State reset!')
  }

  render() {
    return (
      <div>
        <button onClick={() => { this.reset()} }> RESET state </button>
      </div>
    );
  }
}

export default Dashboard;
