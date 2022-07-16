"use strict";
const express = require("express");
const router = express.Router();
const core = require('@steedos/core');
const objectql = require('@steedos/objectql');
const _ = require('lodash');
const Fiber = require('fibers');

/**
 * 发起会议审批
 * body {
 *  meetingId 会议记录id
 * }
 */
router.post('/api/meeting/approve', core.requireAuthentication, async function (req, res) {
    try {
        const userSession = req.user;
        const spaceId = userSession.spaceId;
        const userId = userSession.userId;
        // const isSpaceAdmin = userSession.is_space_admin;
        const { meetingId } = req.body;
        const meetingObj = objectql.getObject('meeting__c');
        const owObj = objectql.getObject('object_workflows');
        const meetingDoc = await meetingObj.findOne(meetingId);
        if (!meetingDoc) {
            throw new Error('未能根据传入会议ID查找到会议记录，请检查。');
        }
        // 查找对象流程映射记录
        const owDoc = (await owObj.find({ filters: [['space', '=', spaceId], ['object_name', '=', 'meeting__c']] }))[0];
        if (!owDoc) {
            throw new Error('请配置会议表对象流程映射。');
        }

        // 已经发起的不重复发起
        if (meetingDoc.instance_state) {
            throw new Error('已发起审批，无需重复发起。');
        }
        Fiber(function () {
            try {
                const instanceInfo = {
                    'flow': owDoc.flow_id,
                    'applicant': userId,
                    'space': spaceId,
                    'record_ids': [{
                        'o': 'meeting__c',
                        'ids': [meetingId]
                    }]
                };
                const insId = uuflowManagerForInitApproval.create_instance(instanceInfo, userSession);
                const instance = uuflowManager.getInstance(insId)
                const flow = uuflowManager.getFlow(instance.flow)
                const step = uuflowManager.getStep(instance, flow, instance["traces"][0].step)
                // 计算下一步骤选项
                const nextSteps = uuflowManager.getNextSteps(instance, flow, step, "submitted")
                if (nextSteps.length < 1) {
                    throw new Error('未找到下一步骤，请检查流程。')
                }
                if (nextSteps.length > 1) {
                    throw new Error('下一步骤不唯一，请检查流程。')
                }
                const next_step_id = nextSteps[0]
                // 计算下一步处理人选项
                const next_user_ids = getHandlersManager.getHandlers(insId, next_step_id) || []
                if (next_user_ids.length > 1) {
                    throw new Error('下一步处理人不唯一，请检查流程。')
                }
                instance["traces"][0]["approves"][0]["next_steps"] = [{ 'step': next_step_id, 'users': next_user_ids }]
                uuflowManager.submit_instance(instance, userSession);
                // 更新会议状态为 审批中
                meetingObj.directUpdate(meetingId, { status__c: 'approve' });
            } catch (error) {
                console.error(error);
            }
        }).run()
        res.status(200).send({ success: true, message: 'router ok' });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});
exports.default = router;