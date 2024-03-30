const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const Stream = require("../models/stream");
const Federation = require("../models/federation");
const { sendAllRequests } = require("../federation/requestUpdate");
const { start } = require("repl");
// input link
const inputLink = "srt://localhost:2000?mode=listener";

// output path
const outputPath = path.join(__dirname, "../../stream/streamout.m3u8");

async function startFfmpegStream() {
  const federationList = await Federation.getFederation();
  ffmpeg(inputLink)
    .ffprobe((err, info) => {
      if (err) {
        console.error("ffprobe error:", err);
        return;
      }
      else if (info) {
        // set the live stream to live = 1
        Stream.startStream();
        if(federationList !== null) {
          try {
            // send information to federation.
            //console.log("updating federation.");

            //console.log(`federation: ${federationList}`);

            // send signal to federation that the server is live.
            sendAllRequests(federationList);

          } catch (error) {
            console.error("error updating federation:", error);
          }
        }
      }
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
          // delete previous stream files. set live stream to live = 0 and listen for new connection.
          if(federationList !== null) {
            try { 
              Stream.endStream();

            } catch (error) {
              console.error("error updating stream database:", error);
            }
          }
          console.log("informing federation stream is over.");
          startFfmpegStream();
        })
        .on("error", (err) => {
          console.error("error:", err);
        })
        .run();
    
    })
}

module.exports = { startFfmpegStream };
