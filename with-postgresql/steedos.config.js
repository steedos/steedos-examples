module.exports = {
	// Namespace of nodes to segment your nodes on the same network.
	namespace: "steedos",

	// Default log level for built-in console logger. It can be overwritten in logger options above.
	// Available values: trace, debug, info, warn, error, fatal
	logLevel: "warn",

	tracing: false,

	// Called after broker started.
	started(broker) {
		broker.createService(require("@steedos/service-enterprise"));
	},

	settings: {
		datasources: {
			postgres: {
				connection: {
					"driver": "postgres",
					"host": "127.0.0.1",
					"username": "keycloak",
					"password": "keycloak",
					"database": "keycloak",
					"port": 5432
				}
			}
		}
	}
};
