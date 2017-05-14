const Client = require('bitcoin-core');
const client = new Client({
                            /*port: 18332,*/
                            network: 'regtest',
                            host: 'localhost'
                        });

// client.getInfo();

