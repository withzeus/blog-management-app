import express, { Express } from "express";
import { getLogger, getServerPort } from "./internal/helpers";
import cors from "cors";
import AuthRoutes from "./routes/auth";
import PostRoutes from "./routes/posts";

const serverPort = getServerPort();
const logger = getLogger();

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use(AuthRoutes);
app.use(PostRoutes);

app.listen(serverPort, () => {
  logger.info(`Server started at http://localhost:${serverPort}`);
});
