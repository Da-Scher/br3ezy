const express = require("express");
const https = require("https");
const cors = require("cors");
const { Server } = require("socket.io");
const httpsOptions = require("./config/httpsOptions");
const chatService = require("./services/chatService");
const authRoutes = require("./routes/authRoutes");
const streamRoutes = require("./routes/streamRoutes");
const chatRoutes = require("./routes/chatRoutes");

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
app.use("/api/chat", chatRoutes);

// Serve static files
app.use(express.static("dist/br3ezy/browser"));
app.get("/", (req, res) => {
  res.sendFile("/dist/br3ezy/browser/index.html");
});

// Start Chat Server
const server = https.createServer(httpsOptions, app);
const io = new Server(server);
chatService(io);

// Start HTTPS server
server.listen(8000, () => {
  console.log("Server running at https://localhost:8000");
});
