const express = require("express");
const router = express.Router();
const http = require('http');
const objectql = require('@steedos/objectql');

router.get('/api/report/:filename', async function (req, res) {
    const query = req.query;
    const bodyStr = Buffer.from(query.q, 'base64').toString('utf-8');
    const body = JSON.parse(bodyStr);
    const config = objectql.getSteedosConfig();
    body.data.graphql_url = Steedos.absoluteUrl('/graphql');
    body.data.root_url = Steedos.absoluteUrl();
    const url = `${config.public.webservices.jsreport.url}/api/report`;
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