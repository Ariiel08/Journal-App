// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAR-Xjo-4825vO0b7_rts79A4AbM86wOGw",
  authDomain: "journal-app-87efa.firebaseapp.com",
  projectId: "journal-app-87efa",
  storageBucket: "journal-app-87efa.appspot.com",
  messagingSenderId: "633821228955",
  appId: "1:633821228955:web:f9352c4307afb1a8413b3e"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);