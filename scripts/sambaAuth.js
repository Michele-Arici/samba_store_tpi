import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';

//import { addCustomer } from '/scripts/sambaDB.js';
import { auth } from '/scripts/firebase-config.js';
import { getCookie, setCookie, eraseCookie } from '/scripts/sambaCookies.js';

//REGISTRAZIONE
const signupForm = document.querySelector('#signup_form');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //get user info
    const email = signupForm['signup_email'].value;
    const password = signupForm['signup_password'].value;

    // Da uncommentare quando è stata aggiunta sta roba alla casella di registrazione
    // const firstName = signupForm['signup_firstName'].value;
    // const surname = signupForm['signup_surname'].value;
    // const phone_number = signupForm['signup_phoneNumber'].value;
    // const city = signupForm['signup_city'].value;



    const isCorrectFormat = checkSignUpInvalidSyntax(email, password);

    if (isCorrectFormat) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("registrazione ok");
                console.log(user);

                //QUERY PER COLLEGARE L'ACCOUNT!!
                //addCustomer(user.uid, email, password, phone_number, city, firstName, surname);
                //QUERY PER COLLEGARE L'ACCOUNT!!

                //Se funziona la registrazione nascondo il modale del signup e mostro quello del signin
                $('#signUpModal').modal('hide');
                $('#signInModal').modal('show');
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);

                if (errorCode == 'auth/email-already-in-use') {
                    document.getElementById('email_invalid_feed').innerHTML = "Email already in use. Use another one";
                }
                if (errorCode == 'auth/weak-password') {
                    document.getElementById('pass_invalid_feed').innerHTML = "The password is too weak. It has to be at least 6 characters long";
                }
            });
    }

});



function checkSignUpInvalidSyntax(email, password) {
    //Resetting the innerHTML errors
    document.getElementById('email_invalid_feed').innerHTML = "";
    document.getElementById('pass_invalid_feed').innerHTML = "";
    document.getElementById('tos_invalid_feed').innerHTML = "";
    //Resettingb the innerHTML errors


    //Checking the syntax
    let isCorrectFormat = true;

    if (email == '') {
        document.getElementById('email_invalid_feed').innerHTML = "Insert a valid email address.";
        isCorrectFormat = false;
    }
    if (password == '') {
        document.getElementById('pass_invalid_feed').innerHTML = "Insert a password";
        isCorrectFormat = false;
    }
    if (!signupForm['tos_agreement'].checked) {
        document.getElementById('tos_invalid_feed').innerHTML = "You need to accept TOS in order to continue";
        isCorrectFormat = false;
    }
    return isCorrectFormat;
}


const signinForm = document.querySelector('#signin_form');

signinForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = signinForm['signin_email'].value;
    const password = signinForm['signin_password'].value;
    //const rememberLogin = signinForm['remember_login'].value;

    const isCorrectFormat = checkSignInInvalidSyntax(email, password);


    if (isCorrectFormat) {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                console.log("loggato");

                if (document.getElementById('remember_login').checked) {
                    //(nomeCookie, valore che vuoi dare al cookie, durata cookie: 1 equivale ad 1 giorno)
                    setCookie("user_email", email, 365);
                    setCookie("user_password", password, 365);
                } else {
                    setCookie("user_email", email, 0.24);
                    setCookie("user_password", password, 0.24);
                }

                location.reload(); //Aggiorna la pagina
            })
            .catch((error) => {
                const errorCode = error.code;

                if (errorCode == 'auth/wrong-password' || errorCode == 'auth/user-not-found') {
                    document.getElementById('signin_check_invalid_feed').innerHTML = "Incorrect email or password";
                }
                console.log("sheesh");
            });

    }



});

function checkSignInInvalidSyntax(email, password) {
    //reset previous innerHTML messages
    document.getElementById('signin_email_invalid_feed').innerHTML = "";
    document.getElementById('signin_pass_invalid_feed').innerHTML = "";
    //reset previous innerHTML messages

    let isCorrectFormat = true;

    if (email == '') {
        document.getElementById('signin_email_invalid_feed').innerHTML = "Insert a valid email address.";
        isCorrectFormat = false;
    }

    if (password == '') {
        document.getElementById('signin_pass_invalid_feed').innerHTML = "Insert a password";
        isCorrectFormat = false;
    }
    return isCorrectFormat;
}
