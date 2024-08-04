const axios = require("axios");
const fs = require("fs").promises;
const dotenv = require("dotenv");

dotenv.config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const AUDIO_ARCHIVE_URL = process.env.AUDIO_ARCHIVE_URL;

const request = async (url) => {
	const response = await axios.get(url, {
		headers: {
			Authorization: `token ${GITHUB_TOKEN}`,
		},
	});
	return response.data;
};

const parseUrls = async () => {
	const urls = {};
	const audio_db = await request(AUDIO_ARCHIVE_URL);
	let songNumber = 0;

	for (const artist of audio_db) {
		if (artist.type === "dir") {
			const playlists = await request(artist.url);
			for (const playlist of playlists) {
				const songs = await request(playlist.url);
				for (const song of songs) {
					urls[songNumber] = song.download_url; // или заменить blob на raw
					songNumber++;
				}
			}
		}
	}

	return urls;
};

(async () => {
	const urls = await parseUrls();
	const urls_json = JSON.stringify(urls);
	const file_name = "urls.json";
	await fs.writeFile(file_name, urls_json);
})();
