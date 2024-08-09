import dotenv from "dotenv";
import { request } from "./github-request.js";
import { promises as fs } from "fs";

dotenv.config();
const AUDIO_ARCHIVE = process.env.AUDIO_ARCHIVE;

const parseMusicPauses = async () => {
   const audioArchive = await request(AUDIO_ARCHIVE);
   let musicPausesData = {};

   for (const category of audioArchive) {
      if (category.type === "dir" && category.name === "music-pauses") {
         const musicPauses = await request(category.url);
         for (const musicPause of musicPauses) {
            const response = await request(musicPause.url);
            const url = response.download_url.replace(/ /g, "%20");
            const name = "Музыкальная пауза";
            const authorName = "";
            const musicPauseNumber = response.name.split(".mp3")[0];
            const musicPauseData = {
               url,
               name,
               authorName,
            };
            musicPausesData[musicPauseNumber] = musicPauseData;
            return musicPausesData;
         }
      }
   }
};

const musicPauses = await parseMusicPauses();
const musicPausesJSON = JSON.stringify(musicPauses);
const file = "./audio-data/music-pauses.json";
fs.writeFile(file, musicPausesJSON);
