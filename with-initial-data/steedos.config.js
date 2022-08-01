/*
 * @Author: sunhaolin@hotoa.com
 * @Date: 2022-08-01 16:59:20
 * @LastEditors: sunhaolin@hotoa.com
 * @LastEditTime: 2022-08-01 17:30:16
 * @Description: 
 */

module.exports = {
	// Namespace of nodes to segment your nodes on the same network.
	namespace: "steedos",
	// Default log level for built-in console logger. It can be overwritten in logger options above.
	// Available values: trace, debug, info, warn, error, fatal
	logLevel: "warn",

	// Called after broker started.
	started(broker) {
		broker.createService(require("@steedos/service-community"));
	},

};
