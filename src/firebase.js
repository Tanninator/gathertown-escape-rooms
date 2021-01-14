import firebase from "firebase";

//<!-- The core Firebase JS SDK is always required and must be listed first -->
//<script src="https://www.gstatic.com/firebasejs/8.2.2/firebase-app.js"></script>

//<!-- TODO: Add SDKs for Firebase products that you want to use
//     https://firebase.google.com/docs/web/setup#available-libraries -->
//<script src="https://www.gstatic.com/firebasejs/8.2.2/firebase-analytics.js"></script>

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyApRtjnAvv-rqs5q_AIz7k9T-KjNsxDnDU",
  authDomain: "gathertown-escape-room-db.firebaseapp.com",
  databaseURL: "https://gathertown-escape-room-db-default-rtdb.firebaseio.com",
  projectId: "gathertown-escape-room-db",
  storageBucket: "gathertown-escape-room-db.appspot.com",
  messagingSenderId: "631151826897",
  appId: "1:631151826897:web:b48ff02cacf2609cf4b2f0",
  measurementId: "G-ZN181ENMK5"
});

const db = firebaseApp.firestore();

export default db;