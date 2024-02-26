const Stream = require("../models/stream");
const { startFfmpegStream } = require("../services/streamService");

exports.addStream = async (req, res) => {
  const { userId, title, description, photo } = req.body;

  try {
    const streamId = await Stream.createStream({
      userId,
      title,
      description,
      photo,
    });
    console.log("Stream added successfully");
    res.status(201).json({
      success: true,
      data: streamId,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getStream = async (req, res) => {
  const { streamId } = req.params;

  try {
    const stream = await Stream.getStream(streamId);
    console.log("Stream found successfully");
    res.status(200).json({
      success: true,
      data: stream,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.searchStreams = async (req, res) => {
  const { keyword } = req.query;

  try {
    const streams = await Stream.searchStreams(keyword);
    console.log("Searched streams successfully");
    res.status(200).json({
      success: true,
      data: streams,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
