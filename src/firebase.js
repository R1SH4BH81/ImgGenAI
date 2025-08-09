import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signOut,
  signInWithPopup, // <-- added this
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBQHmazMHhAuud1v3i43IvJGaQbO-uoyD8",
  authDomain: "pixelbit-eight.firebaseapp.com",
  projectId: "pixelbit-eight",
  storageBucket: "pixelbit-eight.appspot.com",
  messagingSenderId: "754545616793",
  appId: "1:754545616793:web:f6ce0e73ce3cd683a31508",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
export { signOut, signInWithPopup }; // <-- export both
