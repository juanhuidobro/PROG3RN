import app from "firebase/app";
import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBovlJaHMV1AZ5LR6lwiD4uNQ0vKQ8MCL8",
  authDomain: "rn-udesa-16401.firebaseapp.com",
  projectId: "rn-udesa-16401",
  storageBucket: "rn-udesa-16401.appspot.com",
  messagingSenderId: "453367966693",
  appId: "1:453367966693:web:3b2563506e36ad51a85d0c"
};
app.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = app.firestore();
export const storage = app.storage();