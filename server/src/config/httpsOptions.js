const fs = require("fs");
const path = require("path");

const keyPath = path.join(__dirname, "..", "..", "..", "certs", "key.pem");
const certPath = path.join(__dirname, "..", "..", "..", "certs", "cert.pem");

// TODO: get key and cert later. also get more professional sounding names.
module.exports = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath),
};
