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

// Recieve fedMessage
https.get('/fedIn/?')

// Start HTTPS server
server.listen(8000, () => {
  console.log("Server running at https://localhost:8000");
});
