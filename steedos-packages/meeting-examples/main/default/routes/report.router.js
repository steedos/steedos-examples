const express = require("express");
const router = express.Router();
const http = require('http');

router.get('/api/report/:filename', async function (req, res) {
    const query = req.query;
    const bodyStr = Buffer.from(query.q, 'base64').toString('utf-8');
    const body = JSON.parse(bodyStr);
    if(body.data.dataSource){
        const data = await dataSource[body.data.dataSource].get(body.data.ids);
        body.data.data = data
    }
    body.data.graphql_url = `${process.env.ROOT_URL}/graphql`;// Meteor.absoluteUrl('/graphql')
    body.data.root_url = `${process.env.ROOT_URL}`;
    const url = `${Meteor.settings.public.webservices.jsreport.url}/api/report`;
    const proxyReq = http.request(url, {
        method:'POST', 
        headers: {
            'Content-Type': 'application/json'
        }
    } ,remoteRes => remoteRes.pipe(res));
    proxyReq.write(JSON.stringify(body));
    proxyReq.end();
});
exports.default = router;