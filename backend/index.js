const express = require("express");
const https = require("https");
const cors = require("cors");
const { Server } = require("socket.io");
const { responseHandler } = require("./middleware/responseHandler");
const path = require("path");
const httpsOptions = require("./config/httpsOptions");
const chatService = require("./services/chatService");
const authRoutes = require("./routes/authRoutes");
const streamRoutes = require("./routes/streamRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { startFfmpegStream } = require("./services/streamService");

// Start Ffmpeg Stream
startFfmpegStream();

// Setup Express
const app = express();
app.use(cors());
app.use(express.json());

// Response Middleware
app.use(responseHandler);

// Setup routes
app.use("/api/auth", authRoutes);
app.use("/api/stream", streamRoutes);
app.use("/api/chat", chatRoutes);

// Serve static files
app.use(express.static("dist/br3ezy/browser"));
app.get("/", (req, res) => {
  res.sendFile("/dist/br3ezy/browser/index.html");
});
app.use("/stream", express.static(path.join(__dirname, "stream")));

// Start Chat Server
const server = https.createServer(httpsOptions, app);
const io = new Server(server);
chatService(io);

// Start HTTPS server
server.listen(8000, () => {
  console.log("Server running at https://localhost:8000");
});
