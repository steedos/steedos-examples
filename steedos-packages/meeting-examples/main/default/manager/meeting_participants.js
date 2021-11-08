"use strict";
const objectql = require("@steedos/objectql");
const _ = require('lodash');
/**
 * 只要有一个外部参会人员填写了车牌，则返回true，否则返回false
 * @param {*} meetingId 
 * @returns true/false
 */
async function hasLicense(meetingId) {
    const partObj = objectql.getObject('meeting_participants__c');
    const meetingObj = objectql.getObject('meeting__c');
    const partDocs = await partObj.find({ filters: [['meeting__c', '=', meetingId]] });
    const existsDocs = _.filter(partDocs, function (p) { return !!p.license__c });
    if (existsDocs.length > 0) {
        return true;
    } else {
        return false
    }
}

module.exports = {
    hasLicense
}