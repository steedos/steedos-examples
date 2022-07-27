/*
 * @Author: sunhaolin@hotoa.com
 * @Date: 2022-07-20 09:20:46
 * @LastEditors: sunhaolin@hotoa.com
 * @LastEditTime: 2022-07-27 16:37:23
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
		broker.createService(require("@steedos/service-enterprise"));
		broker.createService(require("@steedos/ee_mongodb-bi-connector"));
	},

};
