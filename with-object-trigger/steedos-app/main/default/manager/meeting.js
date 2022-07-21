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
 * 删除会议关联的日程及其通知记录
 * @param {*} meetingId 
 * @param {*} spaceId 
 */
async function deleteRelatedEvents(meetingId, spaceId) {
    const objectName = "meeting__c";
    const eventsObj = objectql.getObject('events');
    const driver = objectql.getDataSource("default").adapter;
    let filters = [['space', '=', spaceId], ['related_to.o', '=', 'meeting__c'], ['related_to.ids', '=', meetingId]];
    const eventRecords = await eventsObj.find({ filters, fields: ["_id"] });
    const eventIds = eventRecords.map((e)=> { return e._id; });

    let bulkNotifications = await driver.collection("notifications").initializeUnorderedBulkOp();
    bulkNotifications.find({
        "related_to.o": "events",
        "related_to.ids": eventIds
    }).delete();
    await bulkNotifications.execute().catch(function (error) {
        console.error("日程通知数据删除失败，错误信息：", error);
    });
    let bulkEvents = await driver.collection("events").initializeUnorderedBulkOp();
    bulkEvents.find({
        "space": spaceId,
        "related_to.o": objectName,
        "related_to.ids": meetingId
    }).delete();
    await bulkEvents.execute().catch(function (error) {
        console.error("日程数据删除失败，错误信息：", error);
    });
}

/**
 * 删除会议关联的任务及其通知记录
 * @param {*} meetingId 
 * @param {*} spaceId 
 */
async function deleteRelatedTasks(meetingId, spaceId) {
    const objectName = "meeting__c";
    const tasksObj = objectql.getObject('tasks');
    const driver = objectql.getDataSource("default").adapter;
    let filters = [['space', '=', spaceId], ['related_to.o', '=', 'meeting__c'], ['related_to.ids', '=', meetingId]];
    const taskRecords = await tasksObj.find({ filters, fields: ["_id"] });
    const taskIds = taskRecords.map((e)=> { return e._id; });

    let bulkNotifications = await driver.collection("notifications").initializeUnorderedBulkOp();
    bulkNotifications.find({
        "related_to.o": "tasks",
        "related_to.ids": taskIds
    }).delete();
    await bulkNotifications.execute().catch(function (error) {
        console.error("任务通知数据删除失败，错误信息：", error);
    });
    let bulkTasks = await driver.collection("tasks").initializeUnorderedBulkOp();
    bulkTasks.find({
        "space": spaceId,
        "related_to.o": objectName,
        "related_to.ids": meetingId
    }).delete();
    await bulkTasks.execute().catch(function (error) {
        console.error("任务数据删除失败，错误信息：", error);
    });
}

module.exports = {
    validData,
    notifyUsers,
    dispatchTask,
    deleteRelatedEvents,
    deleteRelatedTasks
}