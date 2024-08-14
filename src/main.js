import { audioSocketHandler } from "./socket-handlers/audio.js";

export const main = (io) => {
   const onConnection = (socket) => {
      audioSocketHandler(socket);
   };

   io.on("connection", onConnection);
};
