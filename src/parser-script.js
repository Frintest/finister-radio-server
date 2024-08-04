const dotenv = require("dotenv");
const axios = require("axios");
const fs = require("fs").promises;

dotenv.config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const AUDIO_ARCHIVE = process.env.AUDIO_ARCHIVE;

const request = async (url) => {
   const response = await axios.get(url, {
      headers: {
         Authorization: `token ${GITHUB_TOKEN}`,
      },
   });
   return response.data;
};

const parseAudio = async () => {
   const audioData = {};
   const audioRaw = await request(AUDIO_ARCHIVE);

   for (const author of audioRaw) {
      if (author.type === "dir") {
         const playlists = await request(author.url);
         const authorName = author.name;
         audioData[authorName] = {};

         for (const playlist of playlists) {
            const songs = await request(playlist.url);
            let songNumber = 0;

            for (const song of songs) {
               audioData[authorName][songNumber] = song.download_url; // или заменить blob на raw
               songNumber++;
            }
         }
      }
   }

   return audioData;
};

(async () => {
   const audioData = await parseAudio();
   const audioJSON = JSON.stringify(audioData);
   const file = "urls.json";
   await fs.writeFile(file, audioJSON);
})();
