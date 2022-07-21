const objectql = require('@steedos/objectql');
const manager = require('../manager/meeting');
const auth = require("@steedos/auth");
const Filters = require('@steedos/filters');

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
        const query = this.query;
        const userId = this.userId;
        const spaceId = this.spaceId;
        if (userId && spaceId) {
            //获取原始的查询条件
            let filters = query.filters;
            //自定义生成用户权限查询条件
            let permissionsFilters;
            const userSession = await auth.getSessionByUserId(userId, spaceId);
            const roles = userSession.roles;//权限集及简档集合
            var isAdmin = userSession.is_space_admin;
            // 除工作区管理员及名为meeting_admin的权限集下用户外，其他用户只能查看自己创建或分配给自己的会议
            if (!isAdmin && !roles.indexOf("meeting_admin")) {
                permissionsFilters = [
                    ["owner", "=", userId],
                    "or",
                    ["staff__c", "=", userId],
                    "or",
                    ["dining_executive__c", "=", userId]
                ];
            }
            if(permissionsFilters){
                //修改查询条件; formatFiltersToODataQuery函数将数组形式的filters转换为字符串filters
                query.filters = `(${filters}) and (${Filters.formatFiltersToODataQuery(permissionsFilters)})`;
            }
        }
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