import http from "http";
import express from "express";
import { Server } from "socket.io";
import { audioSocketHandler } from "./socket-handlers/audio.mjs";

const PORT = 3002;
const app = express();

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
   cors: {
      origin: ["http://localhost:3000"],
   },
});

const onConnection = async (socket) => {
   audioSocketHandler(socket);
};

io.on("connection", onConnection);

httpServer.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
