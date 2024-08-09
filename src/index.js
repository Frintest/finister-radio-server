import { emulateStream } from "./modules/emulate-stream.js";

export const main = async () => {
	app.get("/audio", async (req, res) => {
		const audio = await emulateStream();
		const audioJSON = JSON.stringify(audio);
		res.json(audioJSON);
	});
};

await main();
