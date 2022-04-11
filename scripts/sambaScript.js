// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDl9SE7vbQ4MtIXUSEvmkN_7dgBUC6KU1U",
  authDomain: "samba-store-50bf0.firebaseapp.com",
  databaseURL: "https://samba-store-50bf0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "samba-store-50bf0",
  storageBucket: "samba-store-50bf0.appspot.com",
  messagingSenderId: "615866017038",
  appId: "1:615866017038:web:73642d6681881c342be35f",
  measurementId: "G-ESNYSNZGTF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
