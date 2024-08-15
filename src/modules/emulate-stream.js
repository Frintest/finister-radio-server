import { getSong } from "./get-song.js";
import { getMusicPause } from "./get-music-pause.js";
import got from "got";
import { parseStream } from "music-metadata";

let isSong = true;
let url = "";
let name = "";
let authorName = "";
let currentTime = 0;
let endingTime = 0;

const updateCurrentTime = (timeDiff) => {
	console.log(`${currentTime} second`);
	currentTime += timeDiff;
};

const sleepTick = (duration) => {
	const msDuration = duration * 1000;
	return new Promise((resolve) => setTimeout(resolve, msDuration));
};

const sleep = async (duration) => {
	const timeDiff = 1; // seconds
	const tickCount = Math.ceil(duration / timeDiff);

	for (let i = 0; i <= tickCount; i++) {
		await sleepTick(timeDiff);
		updateCurrentTime(timeDiff);
	}
};

const requestDuration = async (url) => {
	const response = got.stream(url);
	const metadata = await parseStream(response);
	const duration = Math.floor(metadata.format.duration);
	response.destroy();
	return duration;
};

export const getAudioData = () => ({
	url,
	name,
	authorName,
	endingTime,
});

export const getCurrentTime = () => {
	return currentTime;
};

const emulateStream = async () => {
	if (isSong) {
		const songData = await getSong();
		url = songData.url;
		name = songData.name;
		authorName = songData.authorName;
		currentTime = 0;
		// endingTime = 10;
		endingTime = await requestDuration(url);
		isSong = false;
		console.log(`\nPlaying audio: ${name}`);
		console.log(`Duraction: ${endingTime} seconds`);
	} else {
		const musicPauseData = await getMusicPause();
		url = musicPauseData.url;
		name = musicPauseData.name;
		authorName = musicPauseData.authorName;
		currentTime = 0;
		// endingTime = 10;
		endingTime = await requestDuration(url);
		isSong = true;
		console.log(`\nPlaying ${name}`);
		console.log(`Duraction: ${endingTime} seconds`);
	}
};

export const runEmulateStream = async () => {
	while (true) {
		await emulateStream();
		await sleep(endingTime);
	}
};
