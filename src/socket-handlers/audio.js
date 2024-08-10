import { emulateStream } from "../modules/emulate-stream.js";

export const audioSocketHandler = async (socket) => {
   let audioCache = {
      url: "",
      name: "",
      authorName: "",
      endingTime: 0,
   };

   while (true) {
      const audio = await emulateStream();

      if (audioCache.url !== audio.url) {
         audioCache = audio;
         socket.emit("audio:request", audioCache, () => {
            console.log("Socket.emit | audio:request");
         });
      }
   }
};
