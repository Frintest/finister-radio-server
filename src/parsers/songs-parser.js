import dotenv from "dotenv";
import { request } from "./github-request.js";
import { promises as fs } from "fs";

dotenv.config();
const AUDIO_ARCHIVE = process.env.AUDIO_ARCHIVE;

const parseSongs = async () => {
	const audioData = {};
	const audioArchive = await request(AUDIO_ARCHIVE);

	for (const category of audioArchive) {
		if (category.type === "dir" && category.name === "songs") {
			const authorData = await request(category.url);
			for (const author of authorData) {
				if (author.type === "dir") {
					const playlists = await request(author.url);
					let authorName = author.name;

					if (authorName.indexOf("&") !== -1) {
						const splitIndex = authorName.indexOf("&");
						authorName =
							authorName.slice(0, splitIndex) +
							"/" +
							authorName.slice(splitIndex + 1) +
							" - сплит";
					}

					audioData[authorName] = [];

					for (const playlist of playlists) {
						const songs = await request(playlist.url);

						for (const song of songs) {
							const songData = {};
							const songName = song.name.split(".mp3")[0];
							songData.name = songName;
							songData.url = song.download_url.replace(/ /g, "%20");
							// или заменить blob на raw (вместо song.download_url)
							audioData[authorName].push(songData);
						}
					}
				}
			}
		}
	}

	return audioData;
};

const songs = await parseSongs();
const songsJSON = JSON.stringify(songs);
const file = "./audio-data/songs.json";
fs.writeFile(file, songsJSON);
