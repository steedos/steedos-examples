"use strict";
const path = require('path');
const RED = require("node-red");
const project = require('./package.json');
const packageName = project.name;
// const packageLoader = require('@steedos/service-package-loader');
/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 * 软件包服务启动后也需要抛出事件。
 */
module.exports = {
	name: packageName,
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
        startNodeRed() {

            // Create the settings object - see default settings.js file for other options
            var settings = {
                flowFile: 'flows.json',
                userDir: path.join(__dirname, "flows"),
                functionGlobalContext: {
                    broker: this.broker
                }    // enables global context
            };

            // Initialise the runtime with a server and settings
            RED.init(null, settings);

            // Start the runtime
            RED.start();

        },
        stopNodeRed() {
            RED.stop();
        }
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
        this.startNodeRed();
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {
        this.stopNodeRed();
	}
};