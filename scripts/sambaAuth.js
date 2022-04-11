import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';

import { auth } from '/scripts/firebase-config.js';

//REGISTRAZIONE
const signupForm = document.querySelector('#signup_form');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //get user info
    const email = signupForm['signup_email'].value;
    const password = signupForm['signup_password'].value;

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

});
//REGISTRAZIONE


//LOGIN
const signinForm = document.querySelector('#signin_form');

signinForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = signinForm['signin_email'].value;
    const password = signinForm['signin_password'].value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            console.log("loggato");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
});

//LOGIN