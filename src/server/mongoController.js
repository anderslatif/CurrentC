var mongo = require("mongodb").MongoClient;
var path = "mongodb://localhost:27017/currentc";
var Promise = require("bluebird");
var MongoClient = Promise.promisifyAll(require('mongodb').MongoClient);



exports.checkIfUserExists = function(loginUser) {
    return MongoClient.connect(path).then( function(db) {

        var users = db.collection('users');

        return users.findOne(loginUser).then( function(foundUser) {
            db.close();
            return foundUser;
        })
    }).catch( function(err) {
        console.error("Error in connecting to the DB, promisified MongoClient: " + err);
    });
};

exports.createNewUser = function(userToCreate) {
    return mongo.connect(path, function(err, db) {

        var users = db.collection('users');

    })
};