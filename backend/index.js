const express = require("express");
const https = require("https");
const cors = require("cors");
const httpsOptions = require("./config/httpsOptions");
const authRoutes = require("./routes/authRoutes");
const streamRoutes = require("./routes/streamRoutes");

// Start Srt Server
const { startServer } = require("./srt/srtServer");
startServer();

// Setup Express
const app = express();
app.use(cors());
app.use(express.json());

// Setup routes
app.use("/api/auth", authRoutes);
app.use("/api/streams", streamRoutes);

// Serve static files
app.use(express.static("dist/br3ezy/browser"));
app.get("/", (req, res) => {
  res.sendFile("/dist/br3ezy/browser/index.html");
});

// Start HTTPS server
https.createServer(httpsOptions, app).listen(8000, () => {
  console.log("Server running at https://localhost:8000");
});
