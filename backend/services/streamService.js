const { exec } = require("child_process");
const path = require("path");
const { breeze } = require("../controllers/fedeController");

// ffmpeg node package
const ffmpeg = require("fluent-ffmpeg");

const command = [];

function ffmpegTest() {
  ffmpeg(inputLink)
    .outputOptions([
      "-c:v copy",
      "-c:a copy",
      "-f hls",
      "-hls_time 2",
      "-hls_list_size 3",
      "-hls_flags delete_segments+append_list",
    ])
    .output("../stream/streamout.m3u8")
    .on("end", () => {
      console.log("finished");
    })
    .run();
}

// input link
// for now we are only using srt protocol
const inputLink = "srt://localhost:2000?mode=listener";

// output path
const outputPath = path.join(__dirname, "../stream/streamout.m3u8"); // Adjust based on your actual directory structure

// transmux?
function startFfmpegStream() {
ffmpeg(inputLink)
  .ffprobe((err, info) => {
    if (err) {
      console.error('Error getting stream information:', err);
      // Handle error (e.g., display message, retry)
    } else {
      console.log('Stream information retrieved:', info);
      // Update database with stream details
      breeze();
      // start the stream processing instance
      ffmpeg(inputLink)
          .outputOptions("-c:v", "copy")
          .outputOptions("-c:a", "copy")
          .outputOptions("-f", "hls")
          .outputOptions("-hls_time", "2")
          .outputOptions("-hls_list_size", "3")
          .outputOptions("-hls_flags", "delete_segments+append_list")
          .output(outputPath)
        .output('output.mp4')
        .on('end', () => {
          console.log('Stream processing complete');
        })
        .run();
        }
  });

// Stream processing with ffmpeg (optional)
}

module.exports = { startFfmpegStream };

// const ffmpeg = exec(
//   "ffmpeg -i srt://localhost:2000?mode=listener -c copy -f hls -hls_time 2 -hls_list_size 3 -hls_flags delete_segments+append_list backend/stream/streamout.m3u8",
//   (error, stdout, stderr) => {
//     if (error) {
//       console.log("ffmpeg broke: ", error);
//     }
//     if (stderr) {
//       console.log("stderr: ", stderr);
//     }
//     console.log("stdout: ", stdout);
//   },
// );

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
