import { getSong } from "./get-song.mjs";
import { getMusicPause } from "./get-music-pause.mjs";
import Audic from "audic";
import got from "got";
import { parseStream } from "music-metadata";

let isSong = true;
let isMusicPause = false;
let isUpdateSong = true;
let isUpdateMusicPause = false;
let audio = {};
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

export const emulateStream = async () => {
   if (isUpdateSong) {
      const songData = await getSong();
      url = songData.url;
      name = songData.name;
      authorName = songData.authorName;
      // endingTime = await requestDuration(url);
      endingTime = 3;
      audio = new Audic(url);
      audio.volume = 0;
      audio.play();
      isUpdateSong = false;
      console.log("Request song");
   } else if (isUpdateMusicPause) {
      const musicPauseData = await getMusicPause();
      url = musicPauseData.url;
      name = musicPauseData.name;
      authorName = musicPauseData.authorName;
      // endingTime = await requestDuration(url);
      endingTime = 3;
      audio = new Audic(url);
      audio.volume = 0;
      audio.play();
      isUpdateMusicPause = false;
      console.log("Request music pause");
   }

   if (isSong && endingTime !== 0 && audio.currentTime >= endingTime) {
      isSong = false;
      isMusicPause = true;
      isUpdateMusicPause = true;
      audio.destroy();
      console.log("End song");
   } else if (
      isMusicPause &&
      endingTime !== 0 &&
      audio.currentTime >= endingTime
   ) {
      isMusicPause = false;
      isSong = true;
      isUpdateSong = true;
      audio.destroy();
      console.log("End music pause");
   }

   return {
      url,
      name,
      authorName,
      endingTime,
   };
};
