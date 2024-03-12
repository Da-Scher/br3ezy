const jwt = require("jsonwebtoken");
const StreamData = require("../models/stream");
const request = require("request");

require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

exports.recv = async (req, res) => {
  // retrieve stream information from the database
  // TODO: Add chat history support here or in another try-catch block.
  const { userId, streamUrl, title, description, photo } = req.body;

  try {
    const streamId = StreamData.createStream(userId, streamUrl, title, description, photo);
    res.sendSuccess(201, streamId);

  } catch(err) {
    res.sendError(500, err);
  }

};

// "Don't worry, it will be a breeze." Head slowly rotates towards camera.
exports.breeze = async (req, res) => {
  // go through list of approved br3ezy instances
  const [fedeTuples] = await pool.query(
    "SELECT apiUrl FROM Federation"
  );
  const [myStreamTuple] = await pool.query(
    "SELECT * FROM Streams WHERE id=1"
  );
  const jsonOut = {
    userId: myStreamTuple.userId,
    title: myStreamTuple.name,
    description: myStreamTuple.description,
    url: myStreamTuple.url,
    photo: myStreamTuple.photo,
    startTime: myStreamTuple.startTime
  };
  fedeTuples.map((ally) => {
    // send signal to change status to live.
    const options = {
      url: ally.apiUrl,
      method: 'POST',
      json: jsonOut
  };
    request(options, (error, response, body) => {
      if(error) console.error(`Error transmitting to ${ally.apiUrl}:\n${error}`);

      console.log(`${body}`);
    });
  });
}
