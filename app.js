//Importing the required libraries
const express = require('express');
const propertiesReader = require('properties-reader')
const app = express();

//Setting up the port 

//Setting up the static contents of a directory
app.use('/', express.static(__dirname + '/public'));

//App routes are set here
app.route('*')
    .get(function (req, res) {
        res.send("Namatey Mallanna!!");
    });

app