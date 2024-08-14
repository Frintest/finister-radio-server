import { runEmulateStream } from "./modules/emulate-stream.js";
import { audioSocketHandler } from "./socket-handlers/audio.js";

export const main = (io) => {
	runEmulateStream();

	const onConnection = (socket) => {
		audioSocketHandler(socket);
	};

	io.on("connection", onConnection);
};
