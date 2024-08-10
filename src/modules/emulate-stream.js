import { getSong } from "./get-song.js";
import { getMusicPause } from "./get-music-pause.js";
import got from "got";
import { parseStream } from "music-metadata";

let isSong = true;
let url = "";
let name = "";
let authorName = "";
let endingTime = 0;

const requestDuration = async (url) => {
   const response = got.stream(url);
   const metadata = await parseStream(response);
   const duration = Math.floor(metadata.format.duration);
   return duration;
};

const sleep = (duration) => {
   const msDuration = duration * 1000;
   return new Promise((resolve) => setTimeout(resolve, msDuration));
};

export const emulateStream = async () => {
   await sleep(endingTime);
   if (isSong) {
      const songData = await getSong();
      url = songData.url;
      name = songData.name;
      authorName = songData.authorName;
      endingTime = 3;
      isSong = false;
      console.log("Request song");
   } else {
      const musicPauseData = await getMusicPause();
      url = musicPauseData.url;
      name = musicPauseData.name;
      authorName = musicPauseData.authorName;
      endingTime = 3;
      isSong = true;
      console.log("Request music pause");
   }

   return {
      url,
      name,
      authorName,
      endingTime,
   };
};
