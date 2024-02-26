import express, { Express, Request, Response } from "express";
import "dotenv/config"

const app: Express = express();
const port = Number(process.env.EXPRESS_PORT) || 8000;

app.get("", (req: Request, res: Response) => res.send("Hello world!"));

app.listen(port, () => console.log(`Listening on http://localhost:${port}/`));