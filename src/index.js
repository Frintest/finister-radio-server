const { getSongUrl } = require("./get-audio-urls.js");

const main = (app) => {
   app.get("/song", (req, res) => {
      const songUrl = getSongUrl();
      res.json(songUrl);
   });
};

module.exports = {
   main,
};
