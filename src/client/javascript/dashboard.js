function logOut() {
    socket.disconnect();
    $.get("/logout").done(function (data) {
        window.location = "/";
    });
}



