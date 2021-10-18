// Import the functions you need from the SDKs you need
import app from "firebase/app";
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAr9iiXVGdpk9CB-LpY2xO4hQFW7lTwgw",
  authDomain: "rn-udesa-1295f.firebaseapp.com",
  projectId: "rn-udesa-1295f",
  storageBucket: "rn-udesa-1295f.appspot.com",
  messagingSenderId: "306458716417",
  appId: "1:306458716417:web:be14f0712cb93c5ecb9300"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = app.firestore();
export const storage = app.storage();