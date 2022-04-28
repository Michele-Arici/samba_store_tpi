import { getCookie, setCookie, eraseCookie } from './sambaCookies.js';

function logout() {
    eraseCookie("user_email");
    eraseCookie("user_password");

    location.reload();
}

const email = getCookie('user_email');

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

    $( document ).ready(function() {
        document.getElementById('logout_dropdown').addEventListener('click', (e) => {
            e.preventDefault();
    
            logout()
        });
    });
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

    let modals = `<!-- SIGNUP MODAL -->
    <div class="modal fade" id="signUpModal" tabindex="-1" style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body d-flex flex-column">
                    <div class="container-tight py-4">
                        <form class="card card-md" id="signup_form">
                            <div class="card-body">
                                <h2 class="card-title text-center mb-4">Create new account</h2>
                                <div class="mb-3">
                                    <label class="form-label">Email address</label>
                                    <input type="email" id="signup_email" class="form-control" placeholder="Enter email">
                                    <div style="display: block;" class="invalid-feedback" id="email_invalid_feed"></div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Password</label>
                                    <div class="input-group input-group-flat">
                                        <input type="password" id="signup_password" class="form-control" placeholder="Password" autocomplete="off">
                                    </div>
                                    <div style="display: block;" class="invalid-feedback" id="pass_invalid_feed"></div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-check">
                                        <input type="checkbox" class="form-check-input" id="tos_agreement" />
                                        <span class="form-check-label">Agree the <a href="tos.html" target="_blank"
                                                tabindex="-1">terms and policy</a>.</span>
                                    </label>
                                    <div style="display: block;" class="invalid-feedback" id="tos_invalid_feed"></div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn me-auto" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-primary" >Create new
                                        account</button>
                                </div>
                            </div>
                        </form>
                        <div class="text-center text-muted mt-3">
                            Already have account? <a href="#" data-bs-toggle="modal" data-bs-target="#signInModal">Sign
                                in</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <!-- SIGNUP MODAL -->


    <!-- SIGNIN MODAL -->
    <div class="modal fade" id="signInModal" tabindex="-1" style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body d-flex flex-column">
                    <div class="container-tight py-4">
                        <form class="card card-md" id="signin_form">
                            <div class="card-body">
                                <h2 class="card-title text-center mb-4">Login to your account</h2>
                                <div class="mb-3">
                                    <label class="form-label">Email address</label>
                                    <input type="email" id="signin_email" class="form-control"
                                        placeholder="Enter email">
                                    <div style="display: block;" class="invalid-feedback" id="signin_email_invalid_feed"></div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">
                                        Password
                                    </label>
                                    <div class="input-group input-group-flat">
                                        <input type="password" id="signin_password" class="form-control"
                                            placeholder="Password">
                                    </div>
                                    <div style="display: block;" class="invalid-feedback" id="signin_pass_invalid_feed"></div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-check">
                                        <input type="checkbox" class="form-check-input" id="remember_login" />
                                        <span class="form-check-label">Remember me on this device</span>
                                    </label>
                                    <div style="display: block;" class="invalid-feedback" id="signin_check_invalid_feed"></div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn me-auto" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-primary">Sign-in</button>
                                </div>
                            </div>
                        </form>
                        <div class="text-center text-muted mt-3">
                            Don't have account yet? 
                            <a href="#" data-bs-toggle="modal" data-bs-target="#signUpModal">Sign up</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- SIGNIN MODAL -->`;

    document.getElementById('modals_sign_div').innerHTML = modals;
}