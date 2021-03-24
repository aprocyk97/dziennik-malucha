import firebase from "firebase/app"
import "firebase/auth"
 

const firebaseConfig = {
    apiKey: "AIzaSyDB6oDVrqlhqB7Rz5R8PS6ILxUflTgKX5M",
    authDomain: "dziennikmalucha-development.firebaseapp.com",
    projectId: "dziennikmalucha-development",
    storageBucket: "dziennikmalucha-development.appspot.com",
    messagingSenderId: "797711598828",
    appId: "1:797711598828:web:4d2575bf3786752934d1c9"
  };
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export default app;

// import firebase from "firebase/app"
// import "firebase/auth"
// require('dotenv').config({path: './.env.local'});

// const app = firebase.initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID
// })

// export const auth = app.auth()
// export default app