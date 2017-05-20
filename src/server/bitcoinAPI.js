/*const Client = require('bitcoin-core');
const client = new Client({
                            port: 8332,
                            host: 'localhost',
                            // network: 'regtest',
                            user: 'anders',
                            pass: 'J6JvWjyrBXN9p7N9kHS1ZjZcNyt4qp18TcQeqibJu6Mc',
                            version: '0.9.0'
                        });
var Promise = require("bluebird");

client.command('foobar');*/

/*
client.getInfo().then(function(error, help) {
    console.log(help);
});
*/


var bitcoin_rpc = require('node-bitcoin-rpc');
var port = 8332;
var rpcPassword = require("./GitGoAway").rpcPassword;

bitcoin_rpc.init('localhost', port, 'anders', rpcPassword);
bitcoin_rpc.call('getmininginfo', [], function (err, res) {
    if (err !== null) {
        console.log('I have an error :( ' + err + ' ' + res.error)
    } else {
        console.log(JSON.stringify(res.result));
    }
});

