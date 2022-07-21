const objectql = require('@steedos/objectql');
const manager = require('../manager/meeting');

module.exports = {
    listenTo: 'meeting__c',

    beforeInsert: async function(){
        const doc = this.doc;
        await manager.validData(doc);
    },

    beforeUpdate: async function(){
        const doc = this.doc;
        const id = this.id;
        if (doc.start__c || doc.end__c) {
            const oldDoc = await this.getObject(this.object_name).findOne(id);
            const newDoc = {
                ...oldDoc,
                ...doc
            }
            await manager.validData(newDoc);
        }
    },

    beforeDelete: async function(){
        const id = this.id;
        const spaceId = this.spaceId;
        await manager.deleteRelatedEvents(id, spaceId);
        await manager.deleteRelatedTasks(id, spaceId);
    },

    beforeFind: async function(){
    
    },

    afterInsert: async function(){
        const id = this.doc._id;
        await manager.notifyUsers(id);
        await manager.dispatchTask(id);
    },

    afterUpdate: async function(){
        const id = this.doc._id;
        await manager.notifyUsers(id);
        await manager.dispatchTask(id);
    },

    afterDelete: async function(){

    },

}