$('.login-create-an-account').click(function() {
    $('.login-box').animate({height: "toggle", opacity: "toggle"}, "slow");
    $('.signup-box').animate({height: "toggle", opacity: "toggle"}, "slow");

});

$('.login-button').click(function() {
    var username = $('.username').val();
    var password = $('.password').val();


    var url = "/login/" + username + "/" + password;
    $.ajax({
        url: url,
        redirect: true,
        success: function(data) {
            if (data.success) {
                window.location = '/dashboard';
            } else {
                toastr.error("The user does not exist.", "Please Sign up");
                setTimeout( function () {}, 2000);
            }
        }
    });
});

$('.signup-button').click(function() {
    var firstName = $('.signup-firstName').val();
    var lastName = $('.signup-lastName').val();
    var username = $('.signup-username').val();
    var password1 = $('.signup-password1').val();
    var password2 = $('.signup-password2').val();

    if (password1 !== password2) {
        return toastr.error("The two passwords don't match.");
    }

    var user = {"firstName": firstName,
                "lastName": lastName,
                "username": username,
                "password": password1
            };

    var url = "/signup/";
    $.post(url, user).done(function(data) {
        if (data.success) {
            toastr.success("The user was created successfully."); //todo check if this is true and check what happens if non-unique usernames are used
            setTimeout( function () {
                window.location = '/dashboard';
            }, 1000);
        } else {
            toastr.error("The user already exists.");
            setTimeout( function () {
                window.location = '/';
            }, 1000);
        }
    })

});


