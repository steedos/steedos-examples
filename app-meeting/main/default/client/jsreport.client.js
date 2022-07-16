Steedos.JSReport = {};

Steedos.JSReport.preview = function(filename, template, data, options){
    var userSession = Creator.USER_CONTEXT;
    var spaceId = userSession.spaceId;
    var authToken = userSession.authToken ? userSession.authToken : userSession.user.authToken;
    let authorization = "Bearer " + spaceId + "," + authToken;
    const url = Steedos.absoluteUrl(`/api/report/${encodeURIComponent(filename)}`);
    window.open(`${url}?q=` + window.btoa(JSON.stringify({
        "template": template,
        "data" : Object.assign({authorization: authorization}, data),
        "options": options
    })))
}