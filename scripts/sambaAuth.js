import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';

import { auth } from '/scripts/firebase-config.js';
import { getCookie, setCookie } from '/scripts/sambaCookies.js';

//REGISTRAZIONE
const signupForm = document.querySelector('#signup_form');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //get user info
    const email = signupForm['signup_email'].value;
    const password = signupForm['signup_password'].value;
    const isTOS = signupForm['tos_agreement'].value;

    if (isTOS == 'on') {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    } else {
        //#TODO sostituire il cambio di valore del tos con un alert modal
        document.getElementById('tos_agreement').value = "E' Obbligatorio accettare le regole del TOS per continuare!";
    }

});

//REGISTRAZIONE


//LOGIN
const signinForm = document.querySelector('#signin_form');

let loginEmailCookie = getCookie("user_email");
let loginPasswordCookie = getCookie("user_password");

//se i valori dei cookie del login non sono nulli li inserisco nel form
if (loginEmailCookie !== null) {

    document.getElementById("signin_email").value = loginEmailCookie;

    if (loginPasswordCookie !== null) {
        document.getElementById("signin_password").value = loginPasswordCookie;
    }

}

signinForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = signinForm['signin_email'].value;
    const password = signinForm['signin_password'].value;
    const rememberLogin = signinForm['remember_login'].value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            console.log("loggato");

            console.log("il valore del checkbox è " + rememberPassword)

            if (rememberLogin == "on") {
                setCookie("user_email", email, 365); //assegna i cookie
                setCookie("user_password", password, 365); //assegna i cookie
            } else {
                setCookie("user_email", email, 0.24); //assegna i cookie
                setCookie("user_password", password, 0.24);
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
});

//LOGIN