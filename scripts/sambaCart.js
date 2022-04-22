import { getCookie } from "./sambaCookies";

let subtotal = 0;

let cartRef = firebase.database().ref("customers/" + getCookie('user_id') + "/cart/");


cartRef.once("value", (snap) => {
    let items = snap;

    items.forEach((item) => {
        if (item != undefined) {
            console.log(item.key);
            console.log(item.val());

            //creare le vere variabili, queste sono il ref
            let current_track_image = firebase.database().ref("tracks/" + item.val() + "/image/");
            let current_track_name = firebase.database().ref("tracks/" + item.val() + "/name/");
            let current_track_cost = firebase.database().ref("tracks/" + item.val() + "/price/");

            //Prende in riferimento il nome dell'artista
            let current_track_artistNameRef = firebase.database().ref("artists/" + firebase.database().ref("tracks/" + item.val() + "/ID_AR/") + "/name/");
            let current_track_artist = "query";

            subtotal += current_track_cost;

            let new_currently_in_cart = `<div class="col-12">
        <div class="row align-items-center">
            <a class="col-auto">
                <span class="avatar" style="background-image: url(${current_track_image})"></span>
            </a>
            <div class="col text-truncate">
                <a href="#" class="text-reset d-block text-truncate" style="font-weight: 500; line-height: 1;">${current_track_name}</a>
                <div class="text-muted text-truncate mt-n1" style="font-weight: 400;">${current_track_artist}</div>
            </div>
            <div class="text-muted col-auto">
                ${current_track_cost}$
            </div>
            <div class="col-auto">
                <a href="#" class="btn btn-outline-danger btn-icon"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg></a>
            </div>
            <hr style="width:96%; margin-left:2% !important; margin-right:2% !important; margin-top:10px !important; margin-bottom:10px !important;">
        </div>
    </div>`

            $("#show_tracks").append(new_currently_in_cart);



            //#TODO aggiungere sta roba negli ordini.
        }


    });


});




document.getElementById("subtotal").innerHTML = `\$${subtotal}`;
document.getElementById("total").innerHTML = `\$${subtotal + 2}`;




///buy things////
const buyTracks = document.getElementById('buy_tracks');

buyTracks.addEventListener('click', (e) => {
    //query per fare un delete del carrello dell'utente e per poi aggiungere la roba negli ordini grazie al codice del crud de brembo
});
///buy things////