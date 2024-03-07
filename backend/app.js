const express = require("express");
const cors = require("cors");
const path = require("path");
const { responseHandler } = require("./middleware/responseHandler");
const authRoutes = require("./routes/authRoutes");
const streamRoutes = require("./routes/streamRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(responseHandler);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/stream", streamRoutes);
app.use("/api/chat", chatRoutes);

// Serve static files
app.use(express.static("dist/br3ezy/browser"));
app.get("/", (req, res) => {
  res.sendFile("/dist/br3ezy/browser/index.html");
});
app.use("/stream", express.static(path.join(__dirname, "stream")));

module.exports = app;
