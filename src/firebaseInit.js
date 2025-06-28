// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbS-7QvBfAy21XpTUImHSPNiAzeTpqrcA",
  authDomain: "buybusyredux-77e3a.firebaseapp.com",
  projectId: "buybusyredux-77e3a",
  storageBucket: "buybusyredux-77e3a.firebasestorage.app",
  messagingSenderId: "161611497193",
  appId: "1:161611497193:web:ce5d77bfa7a87887e67a78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);


