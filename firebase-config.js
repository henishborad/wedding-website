// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1vGaWjiNYRU1j0lxSjpbUhBeP1fbc4pg",
  authDomain: "wedding-rsvp-6a2e9.firebaseapp.com",
  projectId: "wedding-rsvp-6a2e9",
  storageBucket: "wedding-rsvp-6a2e9.firebasestorage.app",
  messagingSenderId: "506604661121",
  appId: "1:506604661121:web:3ce481713d759e25d36080"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth, collection, addDoc, getDocs, query, where, orderBy, signInWithEmailAndPassword, onAuthStateChanged, signOut };
