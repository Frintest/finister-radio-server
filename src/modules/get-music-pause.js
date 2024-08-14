import { getAudioData } from "./get-audio-data.js";

export const getMusicPause = async () => {
	const musicPauses = await getAudioData("./audio-data/music-pauses.json");

	const count = Object.keys(musicPauses).length;
	const number = Math.floor(Math.random() * count);
	const musicPause = musicPauses[number];
	return musicPause;
};
