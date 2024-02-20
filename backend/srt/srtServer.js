const fs = require("fs");

// todo: replace me with a video player.
const output = fs.createWriteStream("./output");
const path = require("path");
const { AsyncSRT } = require("@eyevinn/srt");

let asyncSRT = new AsyncSRT();
async function startServer(previousServer) {
  console.log("starting server.");
  try {
    let socket = await asyncSRT.createSocket(false);
    console.log("socket:", socket);
    const result = await asyncSRT.bind(socket, "127.0.0.1", 2000);
    console.log("bind result:", result);
    const listenResult = await asyncSRT.listen(socket, 1);
    console.log("listen result:", listenResult);
    asyncSRT.on("peerClose", () => {
      console.log("Stream disconnected.");
    });
    asyncSRT.on("error", (error) => {
      console.error("Error:", error);
      console.log("closing socket.");
      // TODO: find a way to close stream without using on 'error'.
      asyncSRT.close(socket);
      console.log("closed socket:", socket);
      delete asyncSRT;
      asyncSRT = new AsyncSRT();
      startServer();
    });
    const acceptResult = await asyncSRT.accept(socket);
    console.log("accept result:", acceptResult);
    let readResult = await asyncSRT.read(acceptResult, 1316);
    while (readResult) {
      // read stream, close on disconnect
      //console.log('read result:', readResult);
      readResult = await asyncSRT.read(acceptResult, 1316);
      if (readResult === null) {
        console.log("stream disconnected.");
        break;
      }
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = { startServer };
