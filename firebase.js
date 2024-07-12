// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA9KNNxXykTZ0QR5E_0o1lKMdNF2ohPdUM",
    authDomain: "neighborhood-watch-522b2.firebaseapp.com",
    projectId: "neighborhood-watch-522b2",
    storageBucket: "neighborhood-watch-522b2.appspot.com",
    messagingSenderId: "52462838381",
    appId: "1:52462838381:web:19a8cbf35d528dafcbd564"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  const auth = firebase.auth();
  const firestore = firebase.firestore();
  
  export { auth, firestore };