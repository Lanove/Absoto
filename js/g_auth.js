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

/*
https://stackoverflow.com/questions/40193553/load-event-on-script-with-async-and-or-defer
window.onload waits for everything to load before firing whereas document.onload fires when the Document Object Model (DOM) is ready.

So if you've got async scripts document.onload will execute first while window.onload will wait for those asynchronous scripts to finish loading.

To summarize:

window.onload will take async scripts into account.
document.onload will not take async scripts into account.
*/
// We need to wait for gapi (which is async) to load before using it.
window.onload = () => {
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
};