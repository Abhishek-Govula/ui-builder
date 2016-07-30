var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

const propsLoader = require('../properties-loader');

var dbProps = propsLoader.loadProperties('db');
var hostName = dbProps.get("hostName");
var hostPort = dbProps.get("hostPort");

var url = 'mongodb://' + hostName + ':' + hostPort + '/DB_1';
var _db = null;

init(function (db) {
    console.log("Init call successfully made");
    _db = db;
    if (_db != null) {
        console.log("Successfully created the db object");
    } else {
        console.log("Error while creating the database object");
    }
});

function init(callback) {
    if (_db != null) {
        return;
    }
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        // _db = db;
        console.log("Connected correctly to server.");
        callback(db);
    });
}

function getDB(callback) {
    if (_db != null) {
        callback(_db)
    } else {
        console.log("_db is null and therefore, creating it ");

        init(function (db) {
            _db = db;
            callback(_db);
        });
    }
}

function listCollection(callback) {
    if (_db == null) {
        var myDb = getDB(function (db) {
            findDocuments(db, function (docs) {
                // console.log("Finished");
                callback(docs);
            });
        });
    }
    var findDocuments = function (db, callback) {
        // Get the documents collection 
        var collection = db.collection('temperature_sensor');
        // Find some documents 
        collection.find({}).toArray(function (err, docs) {
            // assert.equal(err, null);
            // assert.equal(2, docs.length);
            // console.log("Found the following records");
            // console.dir(docs);
            // db.close();
            callback(docs);
        });
    }
}
function closeDbConnection(params) {
    if (_db != null) {
        console.log("Connection is not null and closing it");
        _db.close();
        //Making the db connection null again
        _db = null;
    } else {
        console.log("Connection null, therefore no use of closing it");
    }
}
module.exports = {
    listCollection: listCollection,
    close: closeDbConnection
}