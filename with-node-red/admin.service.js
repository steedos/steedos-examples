"use strict";
const path = require('path');
const RED = require("node-red");
var http = require('http');
var express = require("express");

const project = require('./package.json');
const packageName = project.name;
// const packageLoader = require('@steedos/service-package-loader');


// Create an Express app
var app = express();

// Add a simple route for static content served from 'public'
app.use("/",express.static("public"));

// Create a server
var server = http.createServer(app);

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 * 软件包服务启动后也需要抛出事件。
 */
module.exports = {
	name: packageName + '-admin',
	namespace: "steedos",
	// mixins: [packageLoader],
	/**
	 * Settings
	 */
	settings: {
		packageInfo: {
			path: __dirname,
			name: packageName
		}
	},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {

	},

	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Methods
	 */
	methods: {

	},

	/**
	 * Service created lifecycle event handler
	 */
	async created() {

	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {

        // Create the settings object - see default settings.js file for other options
        var settings = {
			httpAdminRoot:"/",
			httpNodeRoot: false,
            flowFile: 'flows.json',
            userDir: path.join(__dirname, "flows"),
            functionGlobalContext: {
                broker: this.broker
            }    // enables global context
        };

        // Initialise the runtime with a server and settings
        RED.init(server, settings);

		// Serve the editor UI from /red
		app.use(settings.httpAdminRoot, RED.httpAdmin);

		// Serve the http nodes UI from /api
		app.use(settings.httpNodeRoot, RED.httpNode);

		server.listen(1880);

        // Start the runtime
        RED.start();
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	}
};