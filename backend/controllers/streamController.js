const Stream = require("../models/stream");

exports.addStream = async (req, res) => {
  try {
    const { userId, title, description, photo } = req.body;
    const result = await Stream.createStream({
      userId,
      title,
      description,
      photo,
    });
    res.status(201).json({
      message: "Stream added successfully",
      streamId: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while adding stream" });
  }
};


exports.getStream = async (req, res) => {
  try {
    const { stream_id } = req.params;
    const stream = await Stream.getStream(stream_id);
    res.status(200).json(stream);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while searching streams" });
  }
};


exports.searchStreams = async (req, res) => {
  try {
    const { keyword } = req.query;
    const streams = await Stream.searchStreams(keyword);
    res.status(200).json(streams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while searching streams" });
  }
};
