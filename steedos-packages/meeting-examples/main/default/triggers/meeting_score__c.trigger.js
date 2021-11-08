const objectql = require('@steedos/objectql');
const manager = require('../manager/meeting');
const _ = require('lodash');
module.exports = {
    listenTo: 'meeting_score__c',
    beforeUpdate: async function () {
        try {
            const doc = this.doc;
            if(doc.score__c && _.isString(doc.score__c)){
                if(_.isNumber(Number(doc.score__c))){
                    doc.score__c = Number(doc.score__c)
                }
            }
        } catch (error) {
            console.error(error)
        }
    }
}