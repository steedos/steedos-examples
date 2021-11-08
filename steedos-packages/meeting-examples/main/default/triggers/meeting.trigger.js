const objectql = require('@steedos/objectql');
const manager = require('../manager/meeting');
const _ = require('lodash');
module.exports = {
    listenTo: 'meeting__c',

    beforeInsert: async function () {
        const doc = this.doc;
        const spaceId = this.spaceId;
        await manager.validData(doc);
        doc.status__c = 'draft'
        doc.type__c = await manager.getMeetingType(spaceId, doc.staff__c);
    },

    beforeUpdate: async function () {
        const doc = this.doc;
        const id = this.id;
        const spaceId = this.spaceId;
        if (doc.start__c || doc.end__c) {
            const oldDoc = await this.getObject(this.object_name).findOne(id);
            const newDoc = {
                ...oldDoc,
                ...doc
            }
            await manager.validData(newDoc);
        }
        if (doc.instance_state) {
            if (['completed', 'approved'].includes(doc.instance_state)) {
                doc.status__c = 'reserve';
            } else if (['rejected', 'terminated'].includes(doc.instance_state)) {
                doc.status__c = 'cancel';
            } else {
                doc.status__c = 'approve';
            }
        }
        if (_.has(doc, 'staff__c')) {
            doc.type__c = await manager.getMeetingType(spaceId, doc.staff__c);
        }
    },
    afterAggregate: async function () {
        try {
            _.map(this.data.values, function (value) {
                if (_.isObject(value.meeting_room__c)) {
                    value._room = value.meeting_room__c._id;
                } else {
                    value._room = value.meeting_room__c;
                }
            })
        } catch (error) {
        }
    },
    beforeDelete: async function () {

    },

    afterInsert: async function () {

    },

    afterUpdate: async function () {
        const id = this.doc._id;
        // 会议状态变成“已审批”后通过为每个人创建日程进行会议通知 #6
        await manager.notifyUsers(id);
        // 会议状态变成“已审批”后通过为每个任务执行人创建任务 #10
        await manager.dispatchTask(id);
        // 当会议审批通过之后自动触发车辆审批
        await manager.approveParticipants(id);
    },

    afterDelete: async function () {

    },
    afterFind: async function () {
        try {
            _.map(this.data.values, function (value) {
                if (_.isObject(value.meeting_room__c)) {
                    value._room = value.meeting_room__c._id;
                } else {
                    value._room = value.meeting_room__c;
                }
            })
        } catch (error) {
        }
    }
}