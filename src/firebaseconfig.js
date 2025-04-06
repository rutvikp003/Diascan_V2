// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfrD-tz5whsTLveVzTplfH9Zr12BcZ-xM",
  authDomain: "diascan-43b64.firebaseapp.com",
  projectId: "diascan-43b64",
  storageBucket: "diascan-43b64.firebasestorage.app",
  messagingSenderId: "456936540483",
  appId: "1:456936540483:web:99c09c06c24c00b897c7f6",
  measurementId: "G-J6ZGM7YGSS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };


