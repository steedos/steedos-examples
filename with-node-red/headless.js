require('dotenv-flow').config();

var path = require('path');
var http = require('http');
var express = require('express');
var RED = require("node-red");

// Create an Express app
var app = express();

// Create a server
var server = http.createServer(app);

// Create the settings object - see default settings.js file for other options
var settings = {
    flowFile: 'flows.json',
    userDir: path.join(__dirname, "flows"),
    functionGlobalContext: { }    // enables global context
};

// Initialise the runtime with a server and settings
RED.init(server,settings);

// Start the runtime
RED.start();