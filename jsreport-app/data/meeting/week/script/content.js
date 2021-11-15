const axios = require('axios');

function getQuery(userId) {
    return JSON.stringify({
        query: `query{
            meeting__c(filters:[["staff__c", "=", "${userId}"], ["start__c", "between", "this_week"]]){
                name
                type__c
                meeting_room__c__expand{
                    name
                }
                _display{
                    start__c
                    end__c
                }
                staff__c__expand{
                    name
                    spaceuser: _related_space_users_user{
                        position
                    }
                }
                _related_meeting_participants__c_meeting__c{
                    name
                    company__c
                }
            }
        }`
    });
}

function getConfig(graphql_url, authorization, userId) {
    return {
        method: 'post',
        url: graphql_url,
        headers: {
            'Authorization': authorization,
            'Content-Type': 'application/json'
        },
        data: getQuery(userId)
    };
}



// add jsreport hook which modifies the report input data
async function beforeRender(req, res) {
    const graphql_url = req.data.graphql_url || "http://localhost:5000/graphql";
    const authorization = req.data.authorization || "Bearer KCBjAEGRNQbfMBSpu,24ff204195b4b675aa1f42c33d2a76ee63a8dceb4f0c0a4a00e27a1b58645f1db442cb658e1af1fa72cb77";
    const userId = req.data.userId || "9kBGn8ojZ6jnRPTix";
    const userName = req.data.userName || '王总';
    const config = getConfig(graphql_url, authorization, userId);
    const resData = await axios(config);
    req.data.data = Object.assign({} ,resData.data.data,{userName: userName});
}