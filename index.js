const axios = require("axios");
const { getAudioUrls } = require("./get-audio-urls.js");

const main = () => {
   const urls = getAudioUrls();
   console.log(urls);

   const instance = axios.create({
      baseURL: "http://localhost:3002/",
   });

   instance.post("audio", urls);
};

module.exports = {
   main,
};
