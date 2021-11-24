import app from "firebase/app";
import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCmmOnkbNLDVD0TCcZb3ncC4WFUtmsW1CU",
  authDomain: "rn-prog3.firebaseapp.com",
  projectId: "rn-prog3",
  storageBucket: "rn-prog3.appspot.com",
  messagingSenderId: "544627747385",
  appId: "1:544627747385:web:3909c73636be4ee4303be8"
};
app.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = app.firestore();
export const storage = app.storage();