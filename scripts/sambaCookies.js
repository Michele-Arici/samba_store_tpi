//Nelle funzioni le c davanti a name e value stanno per cookie.
//Quindi saranno CookieName e CookieValue
function setCookie(cname, cvalue, exdays) {
    let expires = "";

    if (exdays) {
        const date = new Date();
        date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }//Se il cookie deve scadere viene aggiunta una scadenza

    document.cookie = cname + "=" + (cvalue || "") + expires + "; path=/";
    //creo ed assegno il cookie.
}

function getCookie(cname) {
    let cnameEQ = cname + "="; //la variabile contiene "{cname}="
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        let lastEmptySpaceIndex = 0;

        while (c.charAt(lastEmptySpaceIndex) == ' ') {
            lastEmptySpaceIndex++;
        }

        c = c.substring(lastEmptySpaceIndex);
        // fino a quando il primo carattere del cookie è uno spazio riformatto la stringa dal carattere successivo (cancello gli spazi) 

        if (c.indexOf(cnameEQ) == 0) {
            return c.substring(cnameEQ.length, c.length);
        }
    }

    return null;
}

function checkCookie() {
    let user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}