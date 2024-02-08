// hip websites have tls. br3ezy must be hip!
// if crypto support is unavailable, then this will result in an error and we cannot continue.
let https;
try {
  https = require('node:https');
} catch (err) {
  console.error('https support is disabled!');
}
const fs    = require('node:fs');

// todo: get key and cert later 
const options = {
  key: fs.readFileSync('./dist/key.pem'),
  cert: fs.readFileSync('./dist/cert.pem'),
};

https.createServer(options, (req, res) => {
  console.log("Server running at https://localhost:8080");
  res.writeHead(200);
  res.end("Hello, br3ezy!")
}).listen(8000);
