module.exports = {
    approve: function (object_name, record_id) {
        $(document.body).addClass('loading');
        let url = `api/meeting/approve`;
        let options = {
            type: 'post',
            async: true,
            data: JSON.stringify({ meetingId: record_id }),
            success: function (data) {
                toastr.success('已发起会议审批。');
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
    approveVisible: function (object_name, record_id, permissions, record) {
        console.log('!record.instance_state: ', !record.instance_state);
        return !record.instance_state;
    }
}