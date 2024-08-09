import http from "http";
import express from "express";
import cors from "cors";
import { main } from "./index.js";

const PORT = 3002;
const app = express();

app.use(
   cors({
      origin: ["http://localhost:3000"],
   }),
);
app.use(express.json());

main(app);

const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
