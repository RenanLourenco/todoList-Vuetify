// Import the functions you need from the SDKs you need
// eslint-disable-next-line no-unused-vars
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdSJU88msqk3oQS_NfxpMqTsL6hRtk3PA",
  authDomain: "renan-vuetify.firebaseapp.com",
  projectId: "renan-vuetify",
  storageBucket: "renan-vuetify.appspot.com",
  messagingSenderId: "636074022612",
  appId: "1:636074022612:web:f5196d580ab720900dcd41"
};

// Initialize Firebase
// eslint-disable-next-line no-unused-vars
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore();


export default db