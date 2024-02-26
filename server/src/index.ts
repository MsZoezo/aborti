import express, { Express, Request, Response } from "express";
import { Logger } from "./utils/logger";
import "dotenv/config"

const logger = new Logger("Index")

const app: Express = express();
const port = Number(process.env.EXPRESS_PORT) || 8000;

app.get("", (req: Request, res: Response) => res.send("Hello world!"));

app.listen(port, () => logger.info(`Listening on http://localhost:${port}/`));