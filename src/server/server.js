var express = require("express");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( ({ extended: true }) ));

app.use(express.static(__dirname + '/src/client/styles'));

app.get("/", function(req, res) {
    res.sendFile(__dirname+"/src/client/index.html");
});






app.listen(3000, function(err) {
    if (err) {
        console.log('Cannot listen on port %d', server.address().port)
    }
    console.log('Listening on port %d', server.address().port);
});