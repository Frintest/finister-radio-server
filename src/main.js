import { audioSocketHandler } from "./socket-handlers/audio.js";

export const main = (io) => {
   const onConnection = async (socket) => {
      audioSocketHandler(socket);
   };

   io.on("connection", onConnection);
};
