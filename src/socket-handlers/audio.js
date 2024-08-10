import { returnAudioData } from "../modules/emulate-stream.js";

export const audioSocketHandler = async (socket) => {
   let isSocketConnect = true;
   let audioCache = {
      url: "",
      name: "",
      authorName: "",
      currentTime: 0,
      endingTime: 0,
   };

   socket.on("disconnect", () => {
      isSocketConnect = false;
   });

   const sleep = () => {
      return new Promise((resolve) => setTimeout(resolve, 500));
   };

   while (isSocketConnect) {
      const audio = returnAudioData();
      await sleep();
      // console.log("socket id:", socket.id);
      // console.log("audio name:", audio.name);

      if (audioCache.url !== audio.url) {
         audioCache = audio;
         socket.emit("audio:request", audioCache);
      }
   }
};
