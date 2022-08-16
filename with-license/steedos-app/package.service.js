/*
 * @Author: sunhaolin@hotoa.com
 * @Date: 2022-07-21 16:17:04
 * @LastEditors: sunhaolin@hotoa.com
 * @LastEditTime: 2022-08-16 19:24:46
 * @Description: 
 */
"use strict";
const project = require('./package.json');
const packageName = project.name;
const packageLoader = require('@steedos/service-package-loader');
const { isPlatformEnterPrise } = require('@steedos/license')
const objectql = require('@steedos/objectql')
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

	},

	/**
	 * Methods
	 */
	methods: {
		beforeStart: async function () {
			const spaceDoc = (await objectql.getObject('spaces').find({}))[0]
			if (spaceDoc) {
				const allow = await isPlatformEnterPrise(spaceDoc._id)
				if (!allow) {
					throw new Error(`请购买企业版许可证，以使用此功能。`);
				}
			}
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

	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	}
};
