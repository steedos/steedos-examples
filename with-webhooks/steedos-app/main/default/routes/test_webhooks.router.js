/*
 * @Author: sunhaolin@hotoa.com
 * @Date: 2022-07-21 16:19:42
 * @LastEditors: sunhaolin@hotoa.com
 * @LastEditTime: 2022-07-21 17:26:12
 * @Description: 
 */
const express = require("express");
const router = express.Router();
const chalk = require('chalk');

/**
 * 此接口用于测试webhooks功能
 * 需要将此接口地址配置于流程触发器记录中
 */
router.post('/api/test/webhooks', async function (req, res) {
    try {
        console.log(chalk.blue('/api/test/webhooks called!!'))
        console.log(req.body)
        res.status(200).send({ success: true });
    } catch (error) {
        res.status(200).send({ success: false, error: error.message });
    }
});
exports.default = router;