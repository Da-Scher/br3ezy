const Stream = require("../models/stream");
const Federation = require("../models/federation");
// TODO: start ffmpeg with addStream
// const { startFfmpegStream } = require("../services/streamService");

exports.addStream = async (req, res) => {
  const { userId, title, description, photo } = req.body;

  try {
    const streamId = await Stream.createStream(
      userId,
      title,
      description,
      photo,
    );
    res.sendSuccess(201, streamId);
  } catch (error) {
    res.sendError(500, error);
  }
};

exports.getStream = async (req, res) => {
  const { streamId } = req.params;

  try {
    const stream = await Stream.getStream(streamId);
    res.sendSuccess(200, stream);
  } catch (error) {
    res.sendError(500, error);
  }
};

exports.searchStreams = async (req, res) => {
  const { keyword } = req.query;

  try {
    const streams = await Stream.searchStreams(keyword);
    res.sendSuccess(200, streams);
  } catch (error) {
    res.sendError(500, error);
  }
};

exports.updateFederationStream = async (req, res) => {
  const { fedID } = req.query;
  try {
    const federation = await Federation.setLiveFederation(fedID);
    res.sendSuccess(200, federation);
  } catch (error) {
    res.sendError(500, error);
  }
};