import React from 'react';
import db from '../firebase.js';

import firebase from 'firebase/app';
import 'firebase/firestore';

class Coal extends React.Component {
  componentDidMount() {
    const inventoryRef = db.collection("puzzle").doc("inventory")
    inventoryRef.update({items: firebase.firestore.FieldValue.arrayUnion("Coal")})
  }

  render() {
    const bookshelfStyle = {
      backgroundColor: 'black',
      width: '100%',
      height: '100%'};

    return (
      <div style={bookshelfStyle}>
        <h1 style={{color: 'white'}}>Coal Harvested</h1>
      </div>
    );
  }
}

export default Coal;
