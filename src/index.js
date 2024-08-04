const { getSongData } = require("./get-audio-urls.js");

const main = (app) => {
   app.get("/song", (req, res) => {
      const songData = getSongData();
      const songDataJSON = JSON.stringify(songData);
      res.json(songDataJSON);
   });
};

module.exports = {
   main,
};
