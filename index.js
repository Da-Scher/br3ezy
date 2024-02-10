// hip websites have tls. br3ezy must be hip!
// if crypto support is unavailable, then this will result in an error and we cannot continue.
let https;
try {
  https = require('node:https');
} catch (err) {
  console.error('https support is disabled!');
}
const fs    = require('node:fs');
const express = require('express');
const {SRTReadStream} = require('@eyevinn/srt');

// todo: replace me with a video player.
const output = fs.createWriteStream('./output');

const app = express();

const path = require('path');

app.use(express.static('dist/br3ezy/browser'));
app.get("/", (req, res) => {
  res.sendFile('/dist/br3ezy/browser/index.html');
});

// todo: get key and cert later. also get more professional sounding names.
const options = {
  key: fs.readFileSync('./dist/key.pem'),
  cert: fs.readFileSync('./dist/cert.pem'),
};

https.createServer(options, app)
  .listen(8000, (req, res) => {
    console.log("Server running at https://localhost:8000");
  });

// sample code taken from https://github.com/Eyevinn/node-srt
const host = new SRTReadStream('0.0.0.0', 2000);
host.listen(readStream=> {
  console.log('stream connected.');
  readStream.pipe(output);
});
