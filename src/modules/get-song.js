import { getAudioData } from "./get-audio-data.js";

export const getSong = async () => {
   const songs = await getAudioData("./audio-data/songs.json");

   const authors = Object.keys(songs);
   const authorsCount = Object.keys(authors).length;
   const authorNumber = Math.floor(Math.random() * authorsCount);
   const authorName = authors[authorNumber];
   const author = songs[authorName];

   const songsCount = author.length;
   const songNumber = Math.floor(Math.random() * songsCount);
   const song = author[songNumber];
   const name = song.name;
   const url = song.url;

   const songData = {
      url,
      name,
      authorName,
   };

   return songData;
};
