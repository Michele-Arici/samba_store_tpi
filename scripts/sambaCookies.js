//Nelle funzioni le c davanti a name e value stanno per cookie.
//Quindi saranno CookieName e CookieValue
export function setCookie(cname, cvalue, exdays) {
    let expires = "";

    if (exdays) {
        const date = new Date();
        date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }//Se il cookie deve scadere viene aggiunta una scadenza

    document.cookie = cname + "=" + (cvalue || "") + expires + "; path=/";
    //creo ed assegno il cookie.
}

export function getCookie(cname) {
    let cnameEQ = cname + "="; //la variabile contiene "{cname}="
    let ca = document.cookie.split(';'); //ca sono tutti i cookie dell'utente

    //il for gestisce i cookie uno ad uno
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        let lastEmptySpaceIndex = 0;
        
        while (c.charAt(lastEmptySpaceIndex) == ' ') {
            lastEmptySpaceIndex++;
        }

        c = c.substring(lastEmptySpaceIndex);
        //controllo fino a quando ci sono spazi e poi ricreo la stringa dall'ultimo spazio trovato alla fine(cancello gli spazi) 

        if (c.indexOf(cnameEQ) == 0) {
            return c.substring(cnameEQ.length, c.length);
        }
    }

    return null;
}

export function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}