const fs = require('fs');
const https = require("https");
const express = require("express");
const cors = require("cors");
const { getSongUrl } = require("./get-audio-urls.js");

const PORT = 3002;
const app = express();

app.use(cors({
	origin: [
		"https://frintest.github.io"
	]
}));

const directory = `/etc/letsencrypt/live/airmonitor.servermc.ru-0001`;
const ssl = {
	key: fs.readFileSync(`${directory}/privkey.pem`),
	cert: fs.readFileSync(`${directory}/fullchain.pem`),
};

const httpsServer = https.createServer(ssl, app);

app.use(express.json());

app.post("/song", (req, res) => {
	const songUrl = getSongUrl();
	res.json(songUrl);
});

httpsServer.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
