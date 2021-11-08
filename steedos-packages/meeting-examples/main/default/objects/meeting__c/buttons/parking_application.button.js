module.exports = {
    parking_application: function (object_name, record_id) {
        $(document.body).addClass('loading');
        let url = `api/meeting/parking/application`;
        let options = {
            type: 'post',
            async: true,
            data: JSON.stringify({ meetingId: record_id }),
            success: function (data) {
                toastr.success('已发起车辆审批申请。');
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
    parking_applicationVisible: function (object_name, record_id, permissions, record) {
        // let url = `api/meeting/is_need_parking_process`;
        // let options = {
        //     type: 'post',
        //     async: false,
        //     data: JSON.stringify({ meetingId: record_id }),
        // };
        // let result = Steedos.authRequest(url, options);
        // return result.need;
        return false;
    }
}