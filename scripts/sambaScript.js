import { getCookie, setCookie, eraseCookie } from './sambaCookies.js';

function logout() {
    eraseCookie("user_email");
    eraseCookie("user_password");

    location.reload();
}

const email = getCookie('user_email');

const firebaseConfig = {
    apiKey: "AIzaSyDl9SE7vbQ4MtIXUSEvmkN_7dgBUC6KU1U",
    authDomain: "samba-store-50bf0.firebaseapp.com",
    databaseURL:
        "https://samba-store-50bf0-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "samba-store-50bf0",
    storageBucket: "samba-store-50bf0.appspot.com",
    messagingSenderId: "615866017038",
    appId: "1:615866017038:web:73642d6681881c342be35f",
    measurementId: "G-ESNYSNZGTF",
};
firebase.initializeApp(firebaseConfig);

if (email != null) {
    //if you're logged in you'll see this

    let div = `<div class="nav-item dropdown">
                <a href="#" class="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown" aria-label="Open user menu">
                    <span class="avatar avatar-sm" style="background-image: url(https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/2048px-OOjs_UI_icon_userAvatar.svg.png)"></span>
                    <div class="d-none d-xl-block ps-2">
                        <div><strong>${email}</strong></div>
                    </div>
                </a>
                <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <a class="dropdown-item" id="logout_dropdown">Logout</a>
                </div>
            </div>`;
    document.getElementById('profile_button_browse').innerHTML = div;

    document.getElementById('logout_dropdown').addEventListener('click', (e) => {
        e.preventDefault();

        logout()
    });

    let cart = `<li class="nav-item">
                <a class="nav-link" href="./cart.html">
                    <span class="nav-link-icon d-md-none d-lg-inline-block">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-shopping-cart" width="24" height="24"
                            viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <circle cx="6" cy="19" r="2"></circle>
                            <circle cx="17" cy="19" r="2"></circle>
                            <path d="M17 17h-11v-14h-2"></path>
                            <path d="M6 5l14 1l-1 7h-13"></path>
                        </svg>
                    </span>
                    <span class="nav-link-title">
                        Cart
                    </span>
                </a>
            </li>`;
    document.getElementById('cart_li').innerHTML = cart;
} else {
    let div = `<div class="btn-list">
                <a href="#" class="btn btn-primary d-none d-sm-inline-block"
                    data-bs-toggle="modal" data-bs-target="#signInModal">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-user" width="24" height="24"
                        viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                        stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                    </svg> Sign-in
                </a>
            </div>`;
    document.getElementById('profile_button_browse').innerHTML = div;
}


let tracksRef = firebase.database().ref("tracks/");
let albumsRef = firebase.database().ref("albums/");
let artistsRef = firebase.database().ref("artists/");


albumsRef.once("value", (snap) => {
    let albums = snap.val();
    const latest = [];
    for (let i = 0; i < 12; i++) {
        let max = { release_date: "1900-01-01" };
        for (let album of albums) {
            if (album !== undefined) {
                if (new Date(album.release_date) > new Date(max.release_date)) {
                    max = JSON.parse(JSON.stringify(album));
                }
            }
        }
        albums = albums.filter((a) => a.ID_A != max.ID_A);
        latest.push(max);
    }
    

    if (latest.length > 0) {
        artistsRef.once("value", (snap) => {
            let artists = snap.val();
            for (let i = 0; i < latest.length; i++) {
                const album = latest[i];
                artists.forEach((element) => {
                    if (element !== undefined) {
                        if (album.ID_AR == element.ID_AR) {
                            var t_album_div = `<div class="col-2">
                                <a href="./show.html?ID_A=${album.ID_A}" class="d-block mb-1"><img style="border-radius: 5px;"
                                        src="${album.image}"
                                        class="card-img-top"></a>
                                <div class="d-flex align-items-center">
                                    <div style="line-height: 15px;">
                                        <div><strong>${album.name}</strong></div>
                                        <a href="./artist.html?ID_AR=${element.ID_AR}" class="text-muted" style="font-size: 12px;"><strong>${element.name} ${element.surname}</strong>
                                        </a>
                                    </div>
                                </div>
                            </div>`
        
                            $("#new_releases_row").append(t_album_div);
                        }
                    }
                });
            }
        });
    }
});


function secondsToFormat(totalSeconds) {

    const minutes = Math.floor(totalSeconds / 60);

    const seconds = totalSeconds % 60;

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    const result = `${minutes}:${padTo2Digits(seconds)}`;

    return result;
}


let tracks = [];
tracksRef.once("value", function (snap) {
    tracks = snap.val();
    var randList = [];
    var randList_index = [];
    var randList_artist_index = [];
    var t;
    var index;

    while (randList.length != 12) {
        index = Math.floor(Math.random() * tracks.length);
        t = tracks[index];
        if (t != undefined && !randList_index.includes(index)) {
            randList_index.push(index);
            randList.push(t);
            randList_artist_index.push(t.ID_AR);
        }
    }

    artistsRef.once("value", (snap) => {
        let artists = snap.val();

        artists.forEach((element) => {
            if (element !== undefined) {
                for (let i = 0; i < randList.length; i++) {
                    const track = randList[i];

                    if (track.ID_AR == element.ID_AR) {
                        
                        var t_track_div = `<div class="col-3">
                            <div class="row g-3 align-items-center">
                                <a class="col-auto">
                                    <span class="avatar" style="background-image: url(${track.image})"></span>
                                </a>
                                <div class="col text-truncate">
                                    <a href="./show.html?ID_A=${track.ID_A}&ID_T=${track.ID_T}" class="text-reset d-block text-truncate" style="font-weight: 500; line-height: 1;">${track.name}</a>
                                    <a href="./artist.html?ID_AR=${element.ID_AR}" class="text-muted text-truncate mt-n1" style="font-weight: 400;">${element.name} ${element.surname}</a>
                                </div>
                                <div class="text-muted col-auto">
                                    ${secondsToFormat(track.duration)}
                                </div>
                                <hr style="width:90%; margin-left:5% !important; margin-right:5% !important; margin-top:10px !important; margin-bottom:10px !important;">
                            </div>
                        </div>`

                        $("#trending_row").append(t_track_div);
                    }
                }
            }
        });
    });

});

document.getElementById('search_mood_hiphop').addEventListener("click", function (event) {
    window.location.href = "./results.html?searched=" + encodeURIComponent("Hip-hop");
});

document.getElementById('search_mood_pop').addEventListener("click", function (event) {
    window.location.href = "./results.html?searched=" + encodeURIComponent("Pop");
});

document.getElementById('search_mood_house').addEventListener("click", function (event) {
    window.location.href = "./results.html?searched=" + encodeURIComponent("House");
});

document.getElementById('search_mood_rap').addEventListener("click", function (event) {
    window.location.href = "./results.html?searched=" + encodeURIComponent("Rap");
});

document.getElementById('search_mood_jazz').addEventListener("click", function (event) {
    window.location.href = "./results.html?searched=" + encodeURIComponent("Jazz");
});

document.getElementById('search_mood_dance').addEventListener("click", function (event) {
    window.location.href = "./results.html?searched=" + encodeURIComponent("Dance");
});


const btn = document.getElementById('search_bar');
btn.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        window.location.href = "./results.html?searched=" + encodeURIComponent(btn.value);
    }
});


