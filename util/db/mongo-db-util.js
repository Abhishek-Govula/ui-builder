var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

const propsLoader = require('../properties-loader');

var dbProps = propsLoader.loadProperties('db');
var hostName = dbProps.get("hostName");
var hostPort = dbProps.get("hostPort");

var url = 'mongodb://' + hostName + ':' + hostPort + '/DB_1';
var db = null;

function init() {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server.");
    });
}
