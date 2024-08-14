import fs from "fs";

export const getAudioData = (filePath) => {
	const data = fs.readFileSync(filePath).toString();
	const dataJSON = JSON.parse(data);
	return dataJSON;
};
