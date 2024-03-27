const https = require('https');
const mysql = require('mysql2');
const JSON = require('circular-json');
require('dotenv').config();

async function requestUpdate(fedPublicId, apiUrl, apiPort) {
    const postData = JSON.stringify({
        fedID: fedPublicId,
    });
    const req = https.request({
        hostname: apiUrl,
        port: apiPort,
        path: `/api/fed/fedeIn/`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData),
        },
        // rejectUnauthorized: false,
        // requestCert: true,
        // agent: false,
    }, (res) => {
        console.log(`Recieved response: ${res.statusCode}`);
    }).on('error', (error) => {
        console.error(`Update federation error: ${error}`);
    });
    req.write(postData);
    req.end();
}   

async function sendAllRequests(federation) {
    for (let i = 0; i < federation.length; i++) {
        try {
            await requestUpdate(federation[i].fedPublicId, federation[i].apiUrl, federation[i].apiPort);
        } catch (error) {
            console.error(`Error sending requests: ${error}`);
        }
    }
}

exports.sendAllRequests = sendAllRequests;