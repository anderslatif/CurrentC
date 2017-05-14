$('.login-create-an-account').click(function() {
    $('.login-box').animate({height: "toggle", opacity: "toggle"}, "slow");
    $('.signup-box').animate({height: "toggle", opacity: "toggle"}, "slow");
});

$('.login-button').click(function() {
    var username = $('.username').val();
    var password = $('.password').val();

    var url = "/login/" + username + "/" + password;
    $.ajax({
        url: url
    });

});

