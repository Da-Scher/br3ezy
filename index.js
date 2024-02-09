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
