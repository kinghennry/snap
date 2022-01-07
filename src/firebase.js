import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC3pnnfC5X-ZzcuD978hSJ9frHFBXd70IY",
  authDomain: "snap-bd9f3.firebaseapp.com",
  projectId: "snap-bd9f3",
  storageBucket: "snap-bd9f3.appspot.com",
  messagingSenderId: "1003022646132",
  appId: "1:1003022646132:web:6f4431261d497f91b08a21",
};

// initialise firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

//connect to db
const db = firebaseApp.firestore();

//init authentication
const auth = firebaseApp.auth();

//storage..lets user upload stuff
const storage = firebaseApp.storage();

// code to get google auth provider(that google pop up)
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
