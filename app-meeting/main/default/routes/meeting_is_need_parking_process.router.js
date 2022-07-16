const express = require("express");
const router = express.Router();
const core = require('@steedos/core');
const objectql = require('@steedos/objectql');
const manager = require('../manager/meeting_participants');
/**
 * 判断会议是否需要进行车辆审批
 * body {
 *  meetingId 会议记录id
 * }
 * return { need: true/false }
 */
router.post('/api/meeting/is_need_parking_process', core.requireAuthentication, async function (req, res) {
    try {
        // const userSession = req.user;
        // const spaceId = userSession.spaceId;
        // const userId = userSession.userId;
        // const isSpaceAdmin = userSession.is_space_admin;
        const { meetingId } = req.body;
        const need = await manager.hasLicense(meetingId);
        res.status(200).send({ need });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});
exports.default = router;