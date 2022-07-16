const express = require("express");
const router = express.Router();
const core = require('@steedos/core');
const _ = require('lodash');
const objectql = require('@steedos/objectql');
const manager = require('../manager/meeting');

/**
 * 此接口接收参数users, 根据传入参数判断其中是否包括了公司领导。如果包括了，则返回true,否则返回false
 * return: { include: true/false }
 */
router.post('/api/include/leader', core.requireAuthentication, async function (req, res) {
    try {
        const userSession = req.user;
        const spaceId = userSession.spaceId;
        const { users = [] } = req.body;
        let include = false;
        const spaceUsers = await manager.getLeaders(spaceId, users);
        if(spaceUsers.length > 0){
            include = true;
        }
        res.status(200).send({ include: include });
    } catch (error) {
        res.status(200).send({ include: false });
    }
});
exports.default = router;