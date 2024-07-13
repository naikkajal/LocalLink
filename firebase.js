import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA9KNNxXykTZ0QR5E_0o1lKMdNF2ohPdUM",
    authDomain: "neighborhood-watch-522b2.firebaseapp.com",
    projectId: "neighborhood-watch-522b2",
    storageBucket: "neighborhood-watch-522b2.appspot.com",
    messagingSenderId: "52462838381",
    appId: "1:52462838381:web:19a8cbf35d528dafcbd564"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
