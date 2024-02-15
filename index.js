// hip websites have tls. br3ezy must be hip!
// if crypto support is unavailable, then this will result in an error and we cannot continue.
let https;
try {
  https = require('node:https');
} catch (err) {
  console.error('https support is disabled!');
}
const fs = require('node:fs');
const express = require('express');
// password hashing
const bcrypt = require('bcryptjs');
// database server
const pool = require('./db/db');

// todo: replace me with a video player.
const output = fs.createWriteStream('./output');

const app = express();

const path = require('path');

app.use(express.static('dist/br3ezy/browser'));
app.get("/", (req, res) => {
  res.sendFile('/dist/br3ezy/browser/index.html');
});

// TODO: get key and cert later. also get more professional sounding names.
const options = {
  key: fs.readFileSync('./dist/key.pem'),
  cert: fs.readFileSync('./dist/cert.pem'),
};

https.createServer(options, app)
  .listen(8000, (req, res) => {
    console.log("Server running at https://localhost:8000");
  });


const { AsyncSRT } = require('@eyevinn/srt');

let asyncSRT = new AsyncSRT();
async function startServer(previousServer) {
  console.log('starting server.');
  try {
    let socket = await asyncSRT.createSocket(false);
    console.log('socket:', socket);
    const result = await asyncSRT.bind(socket, '127.0.0.1', 2000);
    console.log('bind result:', result);
    const listenResult = await asyncSRT.listen(socket, 1);
    console.log('listen result:', listenResult);
    asyncSRT.on('peerClose', () => {
      console.log('Stream disconnected.');
    });
    asyncSRT.on('error', (error) => {
      console.error('Error:', error);
      console.log('closing socket.');
      // TODO: find a way to close stream without using on 'error'.
      asyncSRT.close(socket);
      console.log('closed socket:', socket);
      delete asyncSRT;
      asyncSRT = new AsyncSRT();
      startServer();
    });
    const acceptResult = await asyncSRT.accept(socket);
    console.log('accept result:', acceptResult);
    let readResult = await asyncSRT.read(acceptResult, 1316);
    while (readResult) {
      // read stream, close on disconnect
      //console.log('read result:', readResult);
      readResult = await asyncSRT.read(acceptResult, 1316);
      if (readResult === null) {
        console.log('stream disconnected.');
        break;
      }
    }
  } catch (err) {
    console.error(err);
  }
};

// JSON parser
app.use(express.json());

// Angular/Express communication
const cors = require('cors');
app.use(cors());

// Registration POST
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);

    pool.query('INSERT INTO Users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, hashedPassword], (error, results) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        }
        res.status(201).json({ message: 'User registered successfully', userId: results.insertId });
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

startServer();
