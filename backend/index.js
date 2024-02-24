const express = require("express");
const https = require("https");
const cors = require("cors");
const { Server } = require("socket.io");
const httpsOptions = require("./config/httpsOptions");
const chatService = require("./services/chatService");
const authRoutes = require("./routes/authRoutes");
const streamRoutes = require("./routes/streamRoutes");
const chatRoutes = require("./routes/chatRoutes");
const path = require("path");
const { exec } = require("child_process")

// Start Srt Server
const { startServer } = require("./srt/srtServer");
//startServer();

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

const inputLink = "srt://localhost:2000?mode=listener";
const command = []

const ffmpeg = exec('ffmpeg -i srt://localhost:2000?mode=listener -c copy -f hls -hls_time 2 -hls_list_size 3 -hls_flags delete_segments+append_list backend/stream/streamout.m3u8', (error, stdout, stderr) => {
  if(error) {
    console.log("ffmpeg broke: ", error);
  }
  if (stderr) {
    console.log("stderr: ", stderr);
  }
  console.log("stdout: ", stdout);
}); 

//ffmpeg(inputLink)
//  .outputOptions('-c:v', 'copy')
//  .outputOptions('-c:a', 'copy')
//  .outputOptions('-f', 'hls')
//  .outputOptions('-hls_time', '2')
//  .outputOptions('-hls_list_size', '3')
//  .outputOptions('-hls_flags', 'delete_segments+append_list')
//  .output('stream/streamout.m3u8')
//  .on('start', () => { console.log('starting'); })
//  .on('end', () => { console.log('finished'); })
//  .on('error', (err) => { console.error('error:', err); })
//  .run();

// streamout.m3u8
app.use("/stream", express.static(path.join(__dirname, "stream")));
