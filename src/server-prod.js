import fs from "fs";
import https from "https";
import express from "express";
import cors from "cors";
import { main } from "./index.js";

const PORT = 3002;
const app = express();

app.use(
   cors({
      origin: ["https://frintest.github.io"],
   }),
);
app.use(express.json());

const directory = `/etc/letsencrypt/live/airmonitor.servermc.ru-0001`;
const ssl = {
   key: fs.readFileSync(`${directory}/privkey.pem`),
   cert: fs.readFileSync(`${directory}/fullchain.pem`),
};

main(app);

const httpsServer = https.createServer(ssl, app);

httpsServer.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
