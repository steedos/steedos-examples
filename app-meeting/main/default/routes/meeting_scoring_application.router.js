"use strict";
const express = require("express");
const router = express.Router();
const core = require('@steedos/core');
const objectql = require('@steedos/objectql');
const _ = require('lodash');
const Fiber = require('fibers');
const manager = require('../manager/meeting');

/**
 * 点击会议评分按钮后，为每个参会领导创建一条会议评分的流程记录
 * body {
 *  meetingId 会议记录id
 * }
 */
router.post('/api/meeting/scoring/application', core.requireAuthentication, async function (req, res) {
    try {
        const userSession = req.user;
        const spaceId = userSession.spaceId;
        const userId = userSession.userId;
        // const isSpaceAdmin = userSession.is_space_admin;
        const { meetingId } = req.body;
        const meetingObj = objectql.getObject('meeting__c');
        const scoreObj = objectql.getObject('meeting_score__c');
        const owObj = objectql.getObject('object_workflows');
        const meetingDoc = await meetingObj.findOne(meetingId);
        if (!meetingDoc) {
            throw new Error('未能根据传入会议ID查找到会议记录，请检查。');
        }
        // 查找对象流程映射记录
        const owDoc = (await owObj.find({ filters: [['space', '=', spaceId], ['object_name', '=', 'meeting_score__c']] }))[0];
        if (!owDoc) {
            throw new Error('请配置会议评分表对象流程映射。');
        }

        const baseInfo = {
            space: spaceId,
            company_id: userSession.company_id,
            created: new Date(),
            owner: userId,
            meeting__c: meetingId,
        };
        // 为每个领导创建会议评分记录
        const leaders = await manager.getLeaders(spaceId, meetingDoc.staff__c || []);
        const newScoreDocs = [];
        for (const leader of leaders) {
            // 先检查是否已经生成过评分记录
            const scoreDocs = await scoreObj.find({ filters: [['meeting__c', '=', meetingId], ['created_by', '=', leader.user]] });
            if (scoreDocs.length > 0) {
                continue;
            }
            const newScoreDoc = await scoreObj.insert({
                ...baseInfo,
                created_by: leader.user,
                name: '会议评分'
            });
            newScoreDocs.push(newScoreDoc);
        }

        for (const doc of newScoreDocs) {
            // 已经发起的不重复发起
            if (doc.instance_state) {
                continue;
            }
            Fiber(function () {
                try {
                    const instanceInfo = {
                        'flow': owDoc.flow_id,
                        'applicant': userId,
                        'space': spaceId,
                        'record_ids': [{
                            'o': 'meeting_score__c',
                            'ids': [doc._id]
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
                    // 计算下一步处理人指定为领导
                    const next_user_ids = [doc.created_by];
                    instance["traces"][0]["approves"][0]["next_steps"] = [{ 'step': next_step_id, 'users': next_user_ids }]
                    uuflowManager.submit_instance(instance, userSession);
                } catch (error) {
                    console.error(error);
                }
            }).run()
        }
        res.status(200).send({ success: true, message: 'router ok' });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});
exports.default = router;