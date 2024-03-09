const path = require("path");
const ffmpeg = require("fluent-ffmpeg");

// input link
const inputLink = "srt://localhost:2000?mode=listener";

// output path
const outputPath = path.join(__dirname, "../../stream/streamout.m3u8");

function startFfmpegStream() {
  ffmpeg(inputLink)
    .outputOptions("-c:v", "copy")
    .outputOptions("-c:a", "copy")
    .outputOptions("-f", "hls")
    .outputOptions("-hls_time", "2")
    .outputOptions("-hls_list_size", "3")
    .outputOptions("-hls_flags", "delete_segments+append_list")
    .output(outputPath)
    .on("start", () => {
      console.log("starting");
    })
    .on("end", () => {
      console.log("finished");
    })
    .on("error", (err) => {
      console.error("error:", err);
    })
    .run();
}

module.exports = { startFfmpegStream };
