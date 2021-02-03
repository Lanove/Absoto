let loginPage = "http://localhost:8080/pages/log-in.html",
    dashboardPage = "http://localhost:8080/index.html",
    kelasPage = "http://localhost/absoto/pages/kelas.html",
    guruPage = "http://localhost/absoto/pages/guru.html",
    auth2;

function onSignIn(user) {
    window.location.replace(dashboardPage);
}

function signOut() {
    auth2 = gapi.auth2.getAuthInstance();
    auth2.disconnect();
    auth2.signOut().then(function () {
        window.location.replace(loginPage);
    });
}

$(function () {
    let nama, email, photo, profile;
    if (window.location.href != loginPage) {
        gapi.load('auth2', function () {
            auth2 = gapi.auth2.init();
            auth2.then(function () {
                nama = document.querySelector("#js-gname");
                email = document.querySelector("#js-gmail");
                photo = document.querySelector("#js-pp");
                profile = auth2.currentUser.get().getBasicProfile();
                if (auth2.isSignedIn.get()) {
                    photo.src = profile.getImageUrl();
                    nama.innerHTML = profile.getName();
                    email.innerHTML = profile.getEmail();
                } else
                    window.location.replace(loginPage);
            });
        });
    }
})