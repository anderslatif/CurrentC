/*const Client = require('bitcoin-core');
const client = new Client({
                            port: 8332,
                            host: 'localhost',
                            // network: 'regtest',
                            user: 'anders',
                            pass: 'rpcPassword',
                            version: '0.9.0'
                        });
var Promise = require("bluebird");

client.command('foobar');*/

/*
client.getInfo().then(function(error, help) {
    console.log(help);
});
*/


var currentcRPC = require('node-bitcoin-rpc');
var port = 2108;
var rpcPassword = require("./GitGoAway").rpcPassword;

currentcRPC.init('localhost', port, 'currentcrpc', rpcPassword);
currentcRPC.call('getinfo', [], function (err, res) {
    if (err !== null) {
        console.log('I have an error :( ' + err + ' ' + res.error)
    } else {
        console.log(JSON.stringify(res.result));
    }
});

// potentially interesting methods

// getbalance, getblockcount, getconnectioncount, getinfo, getpeerinfo, getrawmempool

// listaccounts (bootstrap table)
// https://www.w3schools.com/bootstrap/tryit.asp?filename=trybs_table_striped&stacked=h

// getmininginfo https://developers.google.com/chart/interactive/docs/gallery/linechart


