const pool = require("../db/db");

class Analytics {
  static async startSession(streamId, userId, startTime) {
    const [results] = await pool.query(
      "INSERT INTO viewerSessions (streamId, userId, startTime) VALUES (?, ?, ?)",
      [streamId, userId, startTime],
    );
    const startedSession = this.increaseViewers(streamId);
    if (!startedSession) throw new Error("Failed to start session");
    return { sessionId: results.insertId };
  }

  static async increaseViewers(streamId) {
    const [results] = await pool.query(
      "UPDATE concurrentViewers SET viewers = viewers + 1 WHERE streamId = ?",
      [streamId],
    );
    return results.affectedRows;
  }

  static async endSession(sessionId, endTime) {
    const [results] = await pool.query(
      "UPDATE viewerSessions SET endTime = ? WHERE id = ?",
      [endTime, sessionId],
    );
    if (!results.affectedRows) throw new Error("Failed to end session");
    return { sessionId };
  }

  static async saveMetrics(sessionId, averageSpeed, errors) {
    const [results] = await pool.query(
      "INSERT INTO streamMetrics (sessionId, averageSpeed, errors) VALUES (?, ?, ?)",
      [sessionId, averageSpeed, errors],
    );
    return { metricsId: results.insertId };
  }
}

module.exports = Analytics;
