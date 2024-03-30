const https = require('https');

async function requestUpdate(payload) {
    const postData = JSON.stringify({
        fedID: payload.fedPublicId,
        stmName: payload.name,
        stmDesc: payload.description,
        stmPict: payload.picture,
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

async function sendAllRequests(dataList) {
    dataList.forEach((payload) => {
      try {
          await requestUpdate(payload);
      } catch (error) {
          console.error(`Error sending requests: ${error}`);
      }
    });
}

exports.sendAllRequests = sendAllRequests;
