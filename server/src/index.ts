import express, { Express, Request, Response } from "express";
import "dotenv/config"
import { Logger } from "./utils/logger";
import v1 from "./v1";

const logger = new Logger("Index")

const app: Express = express();
const port = Number(process.env.EXPRESS_PORT) || 8000;

app.use(express.urlencoded({ extended: true }));

app.use("/v1", v1);

app.listen(port, () => logger.info(`Listening on http://localhost:${port}/`));