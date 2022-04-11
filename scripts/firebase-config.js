// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCXuMZtVqccFnz_puLW7EGCxY4p-Vy2chs",
    authDomain: "provaautenticazione-bff95.firebaseapp.com",
    projectId: "provaautenticazione-bff95",
    storageBucket: "provaautenticazione-bff95.appspot.com",
    messagingSenderId: "276442008448",
    appId: "1:276442008448:web:49738f228af1392a09cf65",
    measurementId: "G-MX3XBL3RFM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

