import firebase from 'firebase';


// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyB9YB5aXbeCtCeb6pf590Hi6pkWBtjCvSc",
    authDomain: "nytlogin-1cb18.firebaseapp.com",
    projectId: "nytlogin-1cb18",
    storageBucket: "nytlogin-1cb18.appspot.com",
    messagingSenderId: "200601483542",
    appId: "1:200601483542:web:bebb6a2826ac52fed93837",
    measurementId: "G-B6R3Y9BBQ1"
  };
  // Initialize Firebase
  const fire = !firebase.apps.length
      ? firebase.initializeApp(firebaseConfig)
      : firebase.app()

  firebase.analytics();

  export default fire;