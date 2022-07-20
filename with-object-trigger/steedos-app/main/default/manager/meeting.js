"use strict";
const objectql = require("@steedos/objectql");

/**
 * 查找会议室和时间有冲突的会议
 * @param {*} _id 
 * @param {*} roomId 
 * @param {*} start 
 * @param {*} end 
 * @returns 
 */
async function clashRemind(_id, roomId, start, end) {
    const meetingObj = objectql.getObject('meeting__c');
    const meetings = await meetingObj.find({ filters: [['_id', '!=', _id], ['meeting_room__c', '=', roomId], [[['start__c', '<=', start], ['end__c', '>', start]], 'or', [['start__c', '<', end], ['end__c', '>=', end]], 'or', [['start__c', '>=', start], ['end__c', '<=', end]]]] });
    return meetings.length
}
/**
 * 校验记录字段数据合法性
 * @param {*} doc 会议记录
 */
async function validData(doc) {
    if (doc.start__c >= doc.end__c) {
        throw new Error('会议开始时间晚于结束时间。');
    }
    const clashs = await clashRemind(doc._id, doc.meeting_room__c, doc.start__c, doc.end__c);
    if (clashs) {
        throw new Error('该时间段的此会议室已被占用。');
    }
}

/**
 * 获取内部参会人员中的领导
 * @param {string} spaceId 
 * @param {array} users 人员id
 * @returns array
 */
async function getLeaders(spaceId, users) {
    const spaceUserObj = objectql.getObject('space_users');
    const spaceUsers = await spaceUserObj.find({ filters: [['space', '=', spaceId], ['position', 'contains', '领导'], ['user', 'in', users]] });
    return spaceUsers;
}

/**
 * 为每个人创建日程进行会议通知
 * @param {*} meetingId 
 */
async function notifyUsers(meetingId) {
    const meetingObj = objectql.getObject('meeting__c');
    const eventsObj = objectql.getObject('events');
    const userObj = objectql.getObject('users');
    const notiObj = objectql.getObject('notifications');
    const doc = await meetingObj.findOne(meetingId);
    const fromUserId = doc.owner;
    const spaceId = doc.space;
    const baseInfo = {
        space: spaceId,
        company_id: doc.company_id,
        created_by: doc.created_by,
        created: new Date(),
        name: doc.name,
        start: doc.start__c,
        end: doc.end__c,
        related_to: {
            "o": "meeting__c",
            "ids": [meetingId]
        }
    };
    const fromUser = await userObj.findOne(fromUserId);
    for (const userId of (doc.staff__c || [])) {
        // 如果已经创建则不重复创建
        const eventsDocsCount = await eventsObj.count({ filters: [['space', '=', spaceId], ['owner', '=', userId], ['start', '=', doc.start__c], ['end', '=', doc.end__c], ['related_to.o', '=', 'meeting__c']] });
        if (eventsDocsCount) {
            continue;
        }
        const newEventId = await eventsObj._makeNewID();
        const newDoc = {
            ...baseInfo,
            assignees: [userId],
            _id: newEventId,
            owner: userId,
        }
        await eventsObj.directInsert(newDoc);
        var notificationDoc = {
            name: `${fromUser.name}为您安排了日程`,
            body: doc.name,
            related_to: {
                o: "events",
                ids: [newEventId]
            },
            related_name: doc.name,
            from: fromUserId,
            space: doc.space,
            is_read: false,
            owner: userId
        };
        await notiObj.insert(notificationDoc);
    }
}

/**
 * 为每个任务执行人创建任务
 * @param {*} meetingId 
 */
async function dispatchTask(meetingId) {
    const meetingObj = objectql.getObject('meeting__c');
    const userObj = objectql.getObject('users');
    const notiObj = objectql.getObject('notifications');
    const taskObj = objectql.getObject('tasks');
    const doc = await meetingObj.findOne(meetingId);
    const fromUserId = doc.owner;
    const spaceId = doc.space;
    const baseInfo = {
        space: spaceId,
        company_id: doc.company_id,
        created_by: doc.created_by,
        created: new Date(),
        name: doc.name,
        state: 'not_started',
        due_date: doc.end__c,
        priority: 'high',
        related_to: {
            "o": "meeting__c",
            "ids": [meetingId]
        }
    };
    console.log("==doc.dining_executive__c ==", doc.dining_executive__c );
    const fromUser = await userObj.findOne(fromUserId);
    for (const userId of (doc.dining_executive__c || [])) {
        // 如果已经创建则不重复创建
        const taskDocsCount = await taskObj.count({ filters: [['space', '=', spaceId], ['owner', '=', userId], ['name', '=', doc.name], ['due_date', '=', doc.end__c], ['related_to.o', '=', 'meeting__c']] });
        if (taskDocsCount) {
            continue;
        }
        const newTaskId = await taskObj._makeNewID();
        const newDoc = {
            ...baseInfo,
            assignees: [userId],
            _id: newTaskId,
            owner: userId,
        }
        await taskObj.directInsert(newDoc);
        var notificationDoc = {
            name: `${fromUser.name}为您分配了一个任务`,
            body: doc.name,
            related_to: {
                o: "tasks",
                ids: [newTaskId]
            },
            related_name: doc.name,
            from: fromUserId,
            space: doc.space,
            is_read: false,
            owner: userId
        };
        await notiObj.insert(notificationDoc);
    }
}

/**
 * 会议类型根据参会人员中是否有领导自动计算
 * @param {*} spaceId 
 * @param {*} users 
 * @returns 领导会议/一般会议
 */
async function getMeetingType(spaceId, users) {
    const leaders = await getLeaders(spaceId, users || []);
    return (leaders.length > 0) ? '领导会议' : '一般会议';
}

module.exports = {
    validData,
    getLeaders,
    notifyUsers,
    dispatchTask,
    getMeetingType
}