module.exports = {
    week: function (object_name, record_id) {
        var currentRecord = Creator.getObjectRecord();
        var userId = currentRecord.user._id;
        var userName = currentRecord.name;
        const moment = require('moment')
        moment.locale('zh-cn');
        const time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        const fileName = `本周会议-${userName}-${time}.pdf`;
        Steedos.JSReport.preview(fileName,{ "name" : "/meeting/week/main"  }, {userId: userId, userName: encodeURIComponent(userName)})
    },
    weekVisible: function () {
        // console.log('weekVisible==>', this)
        return true;
    }
}