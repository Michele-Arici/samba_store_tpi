import { getCookie } from "./sambaCookies.js";
// import { ref, push } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";
import { firebaseConfig } from "./firebase-config.js";

firebase.initializeApp(firebaseConfig);

let subtotal = 0;

let cartRef = firebase.database().ref("customers/" + getCookie('user_id') + "/cart/");


cartRef.once("value", (snap) => {
    let items = snap;

    //Object.keys(myObj).length gives the length of an object
    if (Object.keys(items.val()).length > 1) {

        $("#show_total").append(`<tbody>
            <tr style="border-style: hidden; font-size: 20px; font-weight: 500;">
                <td colspan="4" class="strong text-end">Subtotal</td>
                <td class="text-end w-1" id="subtotal"></td>
            </tr>
            <tr style="font-size: 15px; font-weight: 500;">
                <td colspan="4" class="strong text-end">Site fees</td>
                <td class="text-end w-1">$2.00</td>
            </tr>
            <tr style="font-size: 30px; font-weight: 700;">
                <td colspan="4" class="strong text-end">Total</td>
                <td class="text-end w-1" id="total"></td>
            </tr>
        </tbody>
        `);//printing out the "checkout thing"




        items.forEach((item) => {


            if (item.key != "initialize") {


                //returns a resolved promise
                let current_track_image = firebase.database().ref("tracks/" + item.val().track + "/image").once('value').then((snapshot) => {
                    return snapshot.val();
                });

                let current_track_name = firebase.database().ref("tracks/" + item.val().track + "/name").once('value').then((snapshot) => {
                    return snapshot.val();
                });

                let current_track_cost = firebase.database().ref("tracks/" + item.val().track + "/price").once('value').then((snapshot) => {
                    return snapshot.val();
                });


                let current_artist_id = firebase.database().ref("tracks/" + item.val().track + "/ID_AR").once('value').then((snapshot) => {
                    return snapshot.val();
                });

                let current_track_artist = current_artist_id.then(value => {
                    return firebase.database().ref("artists/" + value + "/name").once('value').then((snapshot) => {
                        return snapshot.val();
                    });
                });

                let current_track_artist_surname = current_artist_id.then(value => {
                    return firebase.database().ref("artists/" + value + "/surname").once('value').then((snapshot) => {
                        return snapshot.val();
                    });
                });





                //"Decode the promises and set them into an array and then execute some code"
                Promise.all([current_track_name, current_track_image, current_track_cost, current_track_artist, current_track_artist_surname]).then((values) => {

                    current_track_name = values[0];
                    current_track_image = values[1];
                    current_track_cost = values[2];
                    current_track_artist = values[3];
                    current_track_artist_surname = values[4];


                    subtotal += current_track_cost;

                    let new_currently_in_cart = `<div class="col-12">
                <div class="row align-items-center">
                    <a class="col-auto">
                        <span class="avatar" style="background-image: url(${current_track_image})"></span>
                    </a>
                    <div class="col text-truncate">
                        <a href="#" class="text-reset d-block text-truncate" style="font-weight: 500; line-height: 1;">${current_track_name}</a>
                        <div class="text-muted text-truncate mt-n1" style="font-weight: 400;">${current_track_artist} ${current_track_artist_surname}</div>
                    </div>
                    <div class="text-muted col-auto">
                        ${current_track_cost}$
                    </div>
                    <div class="col-auto">
                        <a href="#" id="remove_${item.key}" class="btn btn-outline-danger btn-icon"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg></a>
                    </div>
                    <hr style="width:96%; margin-left:2% !important; margin-right:2% !important; margin-top:10px !important; margin-bottom:10px !important;">
                </div>
            </div>`

                    $("#show_tracks").append(new_currently_in_cart);

                    //Math.round(subtotal * 10) / 10
                    //arrotonda la variabile subtotal ad intera. viene moltiplicata *100 e divisa *100 per tenere 2 cifre decimali che andrebbero perse nel round
                    document.getElementById("subtotal").innerHTML = `\$${Math.round(subtotal * 100) / 100}`;
                    document.getElementById("total").innerHTML = `\$${Math.round(subtotal * 100) / 100 + 2}`;
                    let queryID = `#remove_${item.key}`;
                    let remove = document.querySelector(queryID);

                    remove.addEventListener('click', (e) => {
                        firebase.database().ref("customers/" + getCookie('user_id') + "/cart/" + item.key).remove();
                        window.location.reload();
                    });


                    //#TODO aggiungere sta roba negli ordini.

                });
            }

        });


    } else {
        document.getElementById('buy_tracks_div').innerHTML = "";
        $("#show_tracks").append(`<div class="container-tight py-4">
            <div class="empty">
                <div class="empty-img"><img src="https://preview.tabler.io/static/illustrations/undraw_quitting_time_dm8t.svg"
                        alt="" height="128">
                </div>
                <p class="empty-title">The cart is empty</p>
                <p class="empty-subtitle text-muted">
                    Explore the tracks in our store and add them to the cart
                </p>
                <div class="empty-action">
                    <a href="./browse.html" class="btn btn-primary">
                        <!-- Download SVG icon from http://tabler-icons.io/i/arrow-left -->
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24"
                            viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <line x1="5" y1="12" x2="11" y2="18"></line>
                            <line x1="5" y1="12" x2="11" y2="6"></line>
                        </svg>
                        Explore some tracks
                    </a>
                </div>
            </div>
        </div>`)
    }
});


// ///buy things////
const buyTracks = document.getElementById('buy_tracks');

buyTracks.addEventListener('click', (e) => {

    let cartRef = firebase.database().ref("customers/" + getCookie('user_id') + "/cart/");

    cartRef.once("value", (snap) => {
        let items = snap;
        items.forEach(element => {
            if (element.key != "initialize") {
                let json = { track: element.val()['track'] };
                firebase.database().ref("customers/" + getCookie('user_id') + "/owned_tracks/").push(json).key;
                firebase.database().ref("customers/" + getCookie('user_id') + "/cart/" + element.key).remove();
            }
        });

    });

    //Lascio tempo al client di inviare la richiesta prima del redirect. 
    setTimeout(function () {
        window.location.replace("./successful_purchase.html");
    }, 500);
});

///buy things////