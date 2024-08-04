const http = require("http");
const express = require("express");
const cors = require("cors");
const { getSongUrl } = require("./get-audio-urls.js");

const PORT = 3002;
const app = express();

app.use(
   cors({
      origin: ["http://localhost:3000"],
   }),
);
app.use(express.json());

app.get("/song", (req, res) => {
   const songUrl = getSongUrl();
   res.json(songUrl);
});

const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
