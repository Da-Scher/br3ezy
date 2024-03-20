const Analytics = require("../models/analytics");

exports.startSession = async (req, res) => {
  const { streamId, userId, startTime } = req.body;

  try {
    const sessionId = await Analytics.startSession(streamId, userId, startTime);
    res.sendSuccess(200, sessionId);
  } catch (error) {
    res.sendError(500, error);
  }
};

exports.endSession = async (req, res) => {
  const { sessionId, endTime } = req.body;

  try {
    const sessionsId = await Analytics.endSession(sessionId, endTime);
    res.sendSuccess(200, sessionsId);
  } catch (error) {
    res.sendError(500, error);
  }
};

exports.saveMetrics = async (req, res) => {
  const { sessionId, averageSpeed, errors } = req.body;

  try {
    const metricsId = await Analytics.saveMetrics(
      sessionId,
      averageSpeed,
      errors,
    );
    res.sendSuccess(200, metricsId);
  } catch (error) {
    res.sendError(500, error);
  }
};
