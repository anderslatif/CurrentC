var express = require("express");
var app = express();


app.use(express.static(__dirname + '/styles'));

// improves HTTP headers for security reasons
var helmet = require("helmet");
app.use(helmet);

app.get("/", function(req, res) {
    res.sendFile(__dirname+"/html/login.html");
});


var mongo = require("mongodb").MongoClient;
var path = "mongodb://localhost:27017/currentc";




var portnumberCommandlineArg = process.argv.slice(2);
var port = Number(portnumberCommandlineArg[0]);
port = NaN ? 3000 : port;


var server = app.listen(port, function(err) {
    console.log(__dirname+"");
    if (err) {
        console.log('Cannot listen on port %d. You can also add the portnumber as an argument to npm run start PORT', server.address().port)
    }
    console.log('Listening on port %d', server.address().port);
});