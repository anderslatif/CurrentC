var currentcRPC = require('node-bitcoin-rpc');
var port = 2108;
var rpcUsername = "currentcrpc";
var rpcPasswordLocal = require("./GitGoAway").rpcPasswordLocal;
var rpcPasswordServer = require("./GitGoAway").rpcPasswordDigitalOcean;
var ipAddressServer = require("./GitGoAway").ipAddressDigitalOcean;

var currentc = require( 'bitcoin-promise' ) ;


var client = new currentc.Client({
    host: 'localhost',
    port: port,
    user: rpcUsername,
    pass: rpcPasswordLocal,
    timeout: 30000
});


exports.getpeerinfo = function(){
    return client.getPeerInfo().then(function (peerinfo) {
        return peerinfo
    });
};

exports.getinfo = function(){
    return client.getInfo().then(function (info) {
        return info
    });
};


// getmininginfo https://developers.google.com/chart/interactive/docs/gallery/linechart


