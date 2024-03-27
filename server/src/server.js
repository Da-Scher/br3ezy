const https = require("https");
const { Server } = require("socket.io");
const app = require("./app");
const httpsOptions = require("./config/httpsOptions");
const chatService = require("./services/chatService");
const { startFfmpegStream } = require("./services/streamService");

// Start Ffmpeg Stream
startFfmpegStream();

// HTTPS server
const server = https.createServer(httpsOptions, app);

// Start Chat Server
const io = new Server(server);
chatService(io);

// Start HTTPS server
const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`Server running at https://localhost:${port}`);
});
