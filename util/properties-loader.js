//Libraries needed for reading the properties file
const propertiesReader = require('properties-reader');

//Resources directory path
const resourcesPath = __dirname + '/../resources/';

//Single instantiation of the variables
var configProps = null;
var dbProps = null;

//Exporting the methods
module.exports = {
    loadProperties: loadProperties
}

function loadProperties(type) {
    if(type=='config') {
        if(configProps===null){
            configProps = propertiesReader(resourcesPath + 'config.properties'); 
        }
        return configProps
    } else if (type=='db') {
        if(dbProps===null){
            dbProps = propertiesReader(resourcesPath + 'db.properties'); 
        }
        return dbProps
    }
}