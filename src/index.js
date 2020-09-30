import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';
import 'firebase/firestore' ;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCA75pOnHOP3xs_-hdVNeNAD6--3ByK4P0",
  authDomain: "cart-8c656.firebaseapp.com",
  databaseURL: "https://cart-8c656.firebaseio.com",
  projectId: "cart-8c656",
  storageBucket: "cart-8c656.appspot.com",
  messagingSenderId: "507627451999",
  appId: "1:507627451999:web:b0cbf36be84608b0810dea"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
ReactDOM.render(
  
    <App />,document.getElementById('root')
);

serviceWorker.unregister();