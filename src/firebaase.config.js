import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCGS8Lyfn3qaQmX7UxLvHs_Gc4j1fwmQ4s",
  authDomain: "real-estate-app-69171.firebaseapp.com",
  projectId: "real-estate-app-69171",
  storageBucket: "real-estate-app-69171.appspot.com",
  messagingSenderId: "1021622480307",
  appId: "1:1021622480307:web:bcc5835bfcd2d7bf0b2fc6"
};

initializeApp(firebaseConfig);

export const db = getFirestore();