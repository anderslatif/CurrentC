var express = require("express");
var app = express();

var server = require("http").Server(app);
var io = require("socket.io")(server);

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var cookieParser = require('cookie-parser');
var session = require('express-session');

var mongoController = require('./server/mongoController');

app.use(express.static(__dirname + '/client'));
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

    var response = {"success": false};

        mongoController.checkIfUserExists({username: username, password: password}).then(function (foundUser) {
            return foundUser;
        }).then(function (foundUser) {
            if(!foundUser) {
                console.log("Invalid user");
            } else {
                req.session.user = foundUser;
                response.success = true;
            }
            res.send(response)
        });
});


app.post("/signup", function(req, res) {

    var response = {"success": false};

    mongoController.checkIfUserExists({username: req.body.username, password: req.body.password}).then(function (foundUser) {
        if (!foundUser) {
            mongoController.createNewUser({"username": req.body.username, "password": req.body.password})
                .then(function (persistedUser) {
                    response.success = true;
                    req.session.user = persistedUser;
                }).then( function() {
                res.send(response);
            });
        } else {
            res.send(response);
        }
    });
});

app.get("/dashboard", function(req, res) {

/*        if(!req.session.user) {
            res.redirect('/login');
        }*/

    res.sendFile(__dirname+"/client/dashboard.html");
});

app.get("/logout", function(req, res) {

    req.session.destroy(function (err) {
        res.redirect('/');
    });
});


const os = require('os');
var systemResourceData = {"cpu": os.loadavg()[0], "memory": os.totalmem()};
// loadavg method returns an array containing the 1, 5, and 15 minute load averages.
var cpuStat = require('cpu-stat');

io.on("connection", function (socket) {
    console.log("Client connected via socket");

    setInterval(function () {
        cpuStat.usagePercent(function(err, percent, seconds) {
            if (err) {
                return console.log(err);
            }
            //the percentage cpu usage over all cores
            systemResourceData.cpu = percent;
        });
        systemResourceData.memory = os.freemem() / os.totalmem() * 100;
        socket.emit("systemResources", systemResourceData);
    }, 1000);


});



var portNumberCommandlineArg = process.argv.slice(2);
var port = Number(portNumberCommandlineArg[0]);
port = isNaN(port) || port < 1024 ? 3000 : port;

app.get("/port", function(req, res) {
    res.send({"port": port});
});

var serverConfig = server.listen(port, function(err) {
    if (err) {
        console.log('Cannot listen on port %d. You can also add the port number as an argument to npm run start PORT', serverConfig.address().port)
    }
    console.log('Listening on port %d', serverConfig.address().port);
});