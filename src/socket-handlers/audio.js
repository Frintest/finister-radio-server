import { emulateStream } from "../modules/emulate-stream.js";

export const audioSocketHandler = (socket) => {
   let audioCache = {
      url: "",
      name: "",
      authorName: "",
      endingTime: 0,
   };

   setInterval(async () => {
      const audio = await emulateStream();

      if (audioCache.url !== audio.url) {
         audioCache = audio;
         socket.emit("audio:request", audioCache, () => {
            console.log("Socket.emit | audio:request");
         });
      }
   }, 500);
};
