// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBgJ8P5WRYUW7wUoi63yGIGyHSgza1LXv0",
  authDomain: "spotify-86289.firebaseapp.com",
  projectId: "spotify-86289",
  storageBucket: "spotify-86289.appspot.com",
  messagingSenderId: "879387938548",
  appId: "1:879387938548:web:c2a2d4d0f6b52bedef18a1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
