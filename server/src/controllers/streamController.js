const Stream = require("../models/stream");
const Federation = require("../models/federation");

exports.addStream = async (req, res) => {
  const { userId, title, description, url, photo, isArchived } = req.body;

  try {
    const streamId = await Stream.createStream(
      userId,
      title,
      description,
      url,
      photo,
      isArchived,
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
  try {
    const federation = await Federation.setLiveFederation(req);
    res.sendSuccess(200, federation);
  } catch (error) {
    res.sendError(500, error);
  }
};

exports.updateStream = async (req, res) => {
  const { id } = req.params;
  const { title, description, photo, isArchived } = req.body;

  try {
    const update = await Stream.updateStream(
      id,
      title,
      description,
      photo,
      isArchived,
    );
    res.sendSuccess(200, { update });
  } catch (error) {
    res.sendError(500, error);
  }
};
