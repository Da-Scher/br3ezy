const Stream = require("../models/stream");
const { startFfmpegStream } = require("../services/streamService");

exports.addStream = async (req, res) => {
  try {
    const { userId, title, description, photo } = req.body;
    const streamId = await Stream.createStream({
      userId,
      title,
      description,
      photo,
    });
    res.status(201).json({
      success: true,
      data: streamId,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

// search for a single, specific stream
exports.searchStream = async (req, res) => {
  try {
    const { stream_id } = req.params;
    const stream = await Stream.searchStream(stream_id);
    res.status(200).json({
        succes: true,
        data: stream,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while searching for a single stream" });
  }
};


exports.searchStreams = async (req, res) => {
  try {
    const { keyword } = req.query;
    const streams = await Stream.searchStreams(keyword);
    res.status(200).json({
      success: true,
      data: streams,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getStream = async (req, res) => {
  try {
    const streamUrl = "https://localhost:8000/stream/streamout.m3u8";
    res.status(200).json({
      success: true,
      data: {
        streamUrl: streamUrl,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
