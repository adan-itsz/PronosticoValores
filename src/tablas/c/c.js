import * as firebase from 'firebase';
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDIS78Aknrel3tqFs--IJWP8VxjMpq2of0",
    authDomain: "pronosticos-a7e4e.firebaseapp.com",
    databaseURL: "https://pronosticos-a7e4e.firebaseio.com",
    projectId: "pronosticos-a7e4e",
    storageBucket: "pronosticos-a7e4e.appspot.com",
    messagingSenderId: "95891648579"
  };
  firebase.initializeApp(config);
  export const provider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();
export default firebase;
