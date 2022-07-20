module.exports = {
	// Namespace of nodes to segment your nodes on the same network.
	namespace: "steedos",
	// Default log level for built-in console logger. It can be overwritten in logger options above.
	// Available values: trace, debug, info, warn, error, fatal
	logLevel: "warn",

	// Called after broker started.
	started(broker) {

		// 启动 元数据服务
		broker.createService(require("@steedos/service-metadata-server"));
		// 启动 加载软件包服务
		broker.createService(require("@steedos/service-package-registry"));
		// 启动 steedos-server 服务
        broker.createService({
            name: "steedos-server",
            mixins: [require("@steedos/service-steedos-server")],
            settings: {
                plugins: []
            }
        });

		// 启动 本地 CDN
        broker.createService(require("@steedos/ee_unpkg-local"));

        // 启动 登录页面
        broker.createService(require("@steedos/webapp-accounts"));

		// 启动 JWT 身份认证
		// this.broker.createService(require("@steedos/service-identity-jwt"));

        // 启动 企业版许可证服务
        broker.createService(require("@steedos/ee_service-plugin-license"));
		
        // 启动 记录审计日志
        broker.createService(require("@steedos/ee_audit-records"));
		
        // 启动 自定义品牌
        broker.createService(require("@steedos/ee_branding"));

        // 启动 报表服务
        broker.createService(require("@steedos/ee_stimulsoft-reports"));

		// 启动 OIDC 身份认证服务
		// this.broker.createService(require("@steedos/ee_sso-oidc"));

        // 启动 sidecar服务: steedos services 跨语言访问
        // broker.createService(require("@steedos/service-sidecar"));

        // 启动 字段级加密服务
        // broker.createService(require("@steedos/ee_plugin-field-encryption"));

        // 启动 附件病毒扫描
        // broker.createService(require("@steedos/ee_virus-scan"));

	},

};
