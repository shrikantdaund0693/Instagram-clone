import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC8LXWz5uZycnbeWSz_LMkCQDO-t7NzN0o",
  authDomain: "instagram-clone-shrikant.firebaseapp.com",
  databaseURL: "https://instagram-clone-shrikant-default-rtdb.firebaseio.com",
  projectId: "instagram-clone-shrikant",
  storageBucket: "instagram-clone-shrikant.appspot.com",
  messagingSenderId: "997250661447",
  appId: "1:997250661447:web:0f78813da235ff438dc562",
  measurementId: "G-JMR6PW52B7",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
