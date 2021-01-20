import React from 'react';
import db from '../firebase.js'
import Navbar from 'react-bootstrap/Navbar';

class Inventory extends React.Component {
  constructor(props) {
    super(props)
    this.state = { inventory: [] }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    db.collection("puzzle").doc("inventory").get().then((doc) => { this.setState({inventory: doc.data().items}) })
  }

  formatInventory() {
    var inventory_list = ' '
    this.state.inventory.forEach(item => inventory_list = inventory_list.concat(item, ", "))
    return inventory_list.slice(0, -2)
  }

  render() {
    return (
      <div>
        <Navbar bg="primary" variant="dark"><b>Team Inventory: </b> { this.formatInventory() }</Navbar>
      </div>
    );
  }
}

export default Inventory;
