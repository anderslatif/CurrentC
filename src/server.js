var express = require("express");
var app = express();

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var Promise = require("bluebird");

var mongoController = require('./server/mongoController');

app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
                    secret: "secretphrasethatshouldbestoredinthedb",  //consider redis or memcache
                    resave: false,
                    saveUninitialized: true
                }));




app.get("/", function(req, res) {
    res.sendFile(__dirname+"/client/login.html");
});



app.get("/login/:username/:password", function(req, res) {
    var username = req.params.username;
    var password = req.params.password;

        mongoController.checkIfUserExists({username: username, password: password}).then(function (foundUser) {
            return foundUser;
        }).then(function (foundUser) {
            /*    if(err) {
             console.log(err);
             return res.status(500).send();
             }*/
            if(!foundUser) {
                console.log("Invalid user");
                //res.status(404).send();
            }
            //req.session.user = foundUser;
            //res.status(200);
            res.redirect('/dashboard');
        });
});


app.post("/signup", function(req, res) {


     mongoController.createNewUser({"username": username, "password": password})
     .then(function (persistedUser) {
     req.session.user = persistedUser;
     res.redirect('/dashboard');
     });
});

app.get("/dashboard", function(req, res) {

    if(!req.session.user) {
        //res.status(401).send();
        res.sendFile(__dirname+"/client/unauthorized.html");
    }

    res.sendFile(__dirname+"/client/dashboard.html");
});

app.get("/logout", function(req, res) {

    req.logout();
    res.redirect('/');
});




var portnumberCommandlineArg = process.argv.slice(2);
var port = Number(portnumberCommandlineArg[0]);
port = isNaN(port) ? 3000 : port;


var server = app.listen(port, function(err) {
    if (err) {
        console.log('Cannot listen on port %d. You can also add the port number as an argument to npm run start PORT', server.address().port)
    }
    console.log('Listening on port %d', server.address().port);
});