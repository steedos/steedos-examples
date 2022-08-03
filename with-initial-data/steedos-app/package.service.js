/*
 * @Author: sunhaolin@hotoa.com
 * @Date: 2022-07-21 16:17:04
 * @LastEditors: sunhaolin@hotoa.com
 * @LastEditTime: 2022-08-03 10:22:13
 * @Description: 
 */
"use strict";
const project = require('./package.json');
const packageName = project.name;
const packageLoader = require('@steedos/service-package-loader');
const { importData } = require('@steedos/data-import')
const path = require('path')
/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */
module.exports = {
	name: packageName,
	namespace: "steedos",
	mixins: [packageLoader],
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
	dependencies: ['steedos-server'],

	/**
	 * Actions
	 */
	actions: {

	},

	/**
	 * Events
	 */
	events: {
		// 系统通过环境变量初始化成功
		'service-cloud-init.succeeded': async function (ctx) {
			await importData(path.join(__dirname, 'main', 'default', 'data'));
		},
		// 系统通过注册用户初始化成功
		"space.initialized": {
			async handler() {
				await importData(path.join(__dirname, 'main', 'default', 'data'));
			}
		}
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
		await importData(path.join(__dirname, 'main', 'default', 'data'));
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	}
};
