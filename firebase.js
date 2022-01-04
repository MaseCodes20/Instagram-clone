// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAle3R-kS-JLGislCHUsfY7Zv51i_IRSo",
  authDomain: "social-app-dcf09.firebaseapp.com",
  projectId: "social-app-dcf09",
  storageBucket: "social-app-dcf09.appspot.com",
  messagingSenderId: "345483212129",
  appId: "1:345483212129:web:ea8d363990ffe2b7fb0120",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
