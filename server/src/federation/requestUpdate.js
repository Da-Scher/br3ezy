const https = require('https');
const mysql = require('mysql2');
require('dotenv').config();

async function requestUpdate(fedPublicId, apiUrl, apiPort) {
    console.log(`requesting update for federation: ${fedPublicId}`);
    const req = https.request({
        hostname: apiUrl,
        port: apiPort,
        path: `/fedeIn/${fedPublicId}`,
        method: 'POST',
        rejectUnauthorized: false,
        requestCert: true,
        agent: false,
    }, (res) => {
        console.log(`Recieved response: ${res.statusCode}`);
    }).on('error', (error) => {
        console.error(`Update federation error: ${error}`);
    }).end();
}   

async function sendAllRequests(federation) {
    console.log('Sending requests to all federations', federation.length);
    for (let i = 0; i < federation.length; i++) {
        try {
            await requestUpdate(federation[i].fedPublicId, federation[i].apiUrl, federation[i].apiPort);
        } catch (error) {
            console.error(`Error sending requests: ${error}`);
        }
    }
}

exports.sendAllRequests = sendAllRequests;