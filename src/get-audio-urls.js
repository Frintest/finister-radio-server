const fs = require("fs");

const getAudioData = () => {
   const file = "urls.json";
   const audioData = fs.readFileSync(file).toString();
   const audioDataRaw = JSON.parse(audioData);
   return audioDataRaw;
};

const getSongData = () => {
   const audioData = getAudioData();

   const authors = Object.keys(audioData);
   const authorsCount = Object.keys(authors).length;
   const authorNumber = Math.floor(Math.random() * authorsCount);
   const authorName = authors[authorNumber];
   const author = audioData[authorName];

   const songsCount = author.length;
   const songNumber = Math.floor(Math.random() * songsCount);
   const song = author[songNumber];
   const songName = song.name;
   const songSrc = song.src;

   const songData = {
      songName,
      songSrc,
      authorName,
   };

   return songData;
};

module.exports = {
   getSongData,
};
