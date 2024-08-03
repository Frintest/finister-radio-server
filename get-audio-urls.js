const fs = require("fs");

const getAudioUrls = () => {
   const file_name = "urls.json";
   const data = fs.readFileSync(file_name).toString();
   const urls_data = JSON.parse(data);
   return urls_data;
};

const getSongUrl = () => {
   const urls = getAudioUrls();
   const songsCount = Object.keys(urls).length;
   const songNumber = Math.floor(Math.random() * songsCount);
   const songUrl = urls[songNumber];
   return songUrl;
};

module.exports = {
   getSongUrl,
};
