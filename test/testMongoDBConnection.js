var mongo = require("mongodb").MongoClient;
var Promise = require("bluebird");
var MongoClient = Promise.promisifyAll(require('mongodb').MongoClient);

var mongoController = require("../src/server/mongoController");
var path = mongoController.path;

// I use mocha as my main test framework
var mocha = require('mocha');
var describe = mocha.describe;
var it = mocha.it;
// load Chai as my assert library
var chai = require('chai');
var assert = chai.assert;

describe("Can Connect To DB", function() {
    it('should return true when connected', function() {
        MongoClient.connect(path).then( function(db) {
            assert.equal(db.serverConfig.isConnected(), true);
            db.close();
            var users = db.collection('users');
        })
    });
});

describe("Collections exist in db", function() {
    it('should return any int but -1 and no error', function() {
        MongoClient.connect(path).then( function(db) {
            mongo.listCollections().toArray(function(err, collections) {
                assert.notEqual(collections.indexOf("users"), -1);
                assert.equal(err, null);
                db.close();
            });
        })
    });
});