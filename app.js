//Importing the required libraries
const express = require('express');
const propertiesReader = require('properties-reader');

const app = express();

//Setting up the port by reading it from the properties
var configProperties = propertiesReader(__dirname + '/resources/config.properties');
const portNo = configProperties.get("portNo");

//Setting up the static contents of a directory
app.use('/', express.static(__dirname + '/public'));

//App routes are set here
app.route('/')
    .get(function (req, res) {
        res.sendFile(___dirname + '/public/index.html');
    });

app.listen(portNo);
console.log("App has started on port: " + portNo);