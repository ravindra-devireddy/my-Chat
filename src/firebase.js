import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

var firebaseConfig = {
  apiKey: "AIzaSyCF0JxLcyyLdPoEuhwOhvYJ3e7h1GJE_Zo",
  authDomain: "chat-app-8a302.firebaseapp.com",
  databaseURL: "https://chat-app-8a302.firebaseio.com",
  projectId: "chat-app-8a302",
  storageBucket: "chat-app-8a302.appspot.com",
  messagingSenderId: "301546359413",
  appId: "1:301546359413:web:1a9830dbe178f2e3f9863c",
  measurementId: "G-ZSH1NXZS7T"
};
firebase.initializeApp(firebaseConfig);


export default firebase;