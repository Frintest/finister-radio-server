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
			let authorName = author.name;

			if (authorName.indexOf("&") !== -1) {
				const splitIndex = authorName.indexOf("&");
				authorName =
					authorName.slice(0, splitIndex) +
					"/" +
					authorName.slice(splitIndex + 1);
				authorName += " - сплит";
			}

			audioData[authorName] = [];

			for (const playlist of playlists) {
				const songs = await request(playlist.url);

				for (const song of songs) {
					const songData = {};
					const songName = song.name.split(".mp3")[0];
					songData.name = songName;
					songData.src = song.download_url; // или заменить blob на raw
					audioData[authorName].push(songData);
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
