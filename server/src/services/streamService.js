const fs = require("fs").promises;
const path = require("path");
const moment = require("moment")
const ffmpeg = require("fluent-ffmpeg");
const Stream = require("../models/stream");
const Federation = require("../models/federation");
const { sendAllRequests } = require("../federation/requestUpdate");
const { start } = require("repl");
// input link
const inputLink = "srt://localhost:2000?mode=listener";

// output path
const streamPath = path.join(__dirname, "../../stream/");
const outputPath = path.join(streamPath, "/streamout.m3u8");

async function cleanStreamDir(dir) {
  try {
    const files = await fs.readdir(dir);
    for (const file of files) {
      if (file.endsWith('.ts') || file.endsWith('.m3u8')) {
        const filePath = path.join(dir, file);
        await fs.unlink(filePath);
      }
    }
  } catch (error) {
    console.error("Error cleaning directory:", error);
  }
}

async function copyStreamDir(srcDir, destDir) {
  try {
    await fs.mkdir(destDir, { recursive: true });

    const files = await fs.readdir(srcDir);
    for (const file of files) {
      const srcFilePath = path.join(srcDir, file);
      const destFilePath = path.join(destDir, file);
      await fs.copyFile(srcFilePath, destFilePath);
    }
  } catch (error) {
    console.error("Error copying directory:", error);
  }
}

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
        .outputOptions("-hls_flags", "append_list")
        .output(outputPath)
        .on("start", () => {

          console.log("starting");
        })
        .on("end", async () => {
          console.log("finished");

          const stream = await Stream.getStream(1);
          console.log(stream)
          if (stream.isArchived) {
            const now = moment().format("YYYY-MM-DD_HH-mm-ss");
            const archivePath = path.join(__dirname, `../../archive/${now}`);
            await copyStreamDir(streamPath, archivePath)
            await Stream.createStream(1, `${stream.title} (Archived)`, stream.description, `https://localhost:8000/archive/${now}/streamout.m3u8`, stream.photo, stream.isArchived);
          }

          await cleanStreamDir(streamPath);

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
