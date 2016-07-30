//Importing the required libraries
const express = require('express');
//User libs
const propsLoader = require('./util/properties-loader');
const mongoDBUtil = require('./util/db/mongo-db-util');


//Setting up the port by reading it from the properties
var configProperties = propsLoader.loadProperties('config');
const portNo = configProperties.get("portNo");

//Configuring the express app and its routes
const app = express();
//Setting up the static contents of a directory
app.use('/', express.static(__dirname + '/public'));

//App routes are set here
app.route('/')
    .get(function (req, res) {
        res.sendFile(___dirname + '/public/index.html');
    });

app.route('/test')
    .get(function (req, res) {
        console.log("Calling the get data method");
        mongoDBUtil.listCollection(function (records) {
            console.log(records[0].data.values);
            res.send(records[0].data.values);
            console.log("Done!!");
            mongoDBUtil.close();
        });
        console.log("Running.....");
    });
app.listen(portNo);
console.log("App has started on port: " + portNo);

// mongoDBUtil.listCollection(function (records) {
//     console.log(records[0].data.values);
//     mongoDBUtil.close();
// });
