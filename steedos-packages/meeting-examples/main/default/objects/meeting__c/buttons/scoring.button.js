module.exports = {
    scoring: function (object_name, record_id) {
        $(document.body).addClass('loading');
        let url = `api/meeting/scoring/application`;
        let options = {
            type: 'post',
            async: true,
            data: JSON.stringify({ meetingId: record_id }),
            success: function (data) {
                toastr.success('已发起会议评分申请。');
                FlowRouter.reload();
                $(document.body).removeClass('loading');
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                toastr.error(t(XMLHttpRequest.responseJSON.message))
                $(document.body).removeClass('loading');
            }
        };
        Steedos.authRequest(url, options);
    },
    scoringVisible: function (object_name, record_id, permissions, record) {
        return record.type__c === '领导会议'; // 领导会议 显示会议评分按钮
    }
}