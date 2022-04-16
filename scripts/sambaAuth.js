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

    if (email == '') {
        document.getElementById('email_invalid_feed').innerHTML = "Insert an email";
    } else if (password == '') {
        document.getElementById('pass_invalid_feed').innerHTML = "Insert a password";
    } else if (signupForm['tos_agreement'].checked) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("registrazione ok");
                console.log(user);
                $('#signUpModal').modal('hide');
                $('#signInModal').modal('show');
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);

                if (errorCode == 'auth/email-already-in-use') {
                    document.getElementById('email_invalid_feed').innerHTML = "Email already in use, try sign-in";
                    document.getElementById('pass_invalid_feed').innerHTML = "";
                    document.getElementById('tos_invalid_feed').innerHTML = "";
                } else if (errorCode == 'auth/weak-password') {
                    document.getElementById('pass_invalid_feed').innerHTML = "Weak password, try a new one";
                }
            });
    } else {
        document.getElementById('tos_invalid_feed').innerHTML = "You need to accept TOS in order to continue";
    }

});


const signinForm = document.querySelector('#signin_form');
signinForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = signinForm['signin_email'].value;
    const password = signinForm['signin_password'].value;
    //const rememberLogin = signinForm['remember_login'].value;
    
    

    if (email == '') {
        document.getElementById('signin_email_invalid_feed').innerHTML = "Insert an email";
    } else if (password == '') {
        document.getElementById('signin_pass_invalid_feed').innerHTML = "Insert a password";
    } else {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                console.log("loggato");
    
                if (document.getElementById('remember_login').checked) {
                    setCookie("user_email", email, 365); //assegna i cookie
                    setCookie("user_password", password, 365); //assegna i cookie
                } else {
                    setCookie("user_email", email, 0.24); //assegna i cookie
                    setCookie("user_password", password, 0.24);
                }
                
                location.reload();
            })
            .catch((error) => {
                const errorCode = error.code;

                if (errorCode == 'auth/wrong-password') {
                    document.getElementById('signin_check_invalid_feed').innerHTML = "Incorrect email or password";
                }
            });
    }

});

//LOGIN