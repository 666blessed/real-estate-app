import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDzrwzidhFw007X4cEkmS48PVFDxDqKl88",
  authDomain: "real-estate-app-96939.firebaseapp.com",
  projectId: "real-estate-app-96939",
  storageBucket: "real-estate-app-96939.appspot.com",
  messagingSenderId: "737548057980",
  appId: "1:737548057980:web:3e50309af1dcec7623b8f9"
};

initializeApp(firebaseConfig);

export const db = getFirestore();