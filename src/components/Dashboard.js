import React from 'react';
import '../css/App.css';

class Dashboard extends React.Component {
  reset() {
    localStorage.setItem('takenToggle', false)
    localStorage.setItem('openFlag', false)
    localStorage.setItem('emptyFlag', false)
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
