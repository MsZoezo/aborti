import { NextFunction, Request, Response } from "express";
import { Logger } from "../../utils/logger";
import { getUUID } from "../../utils/uuid";

export function logging(req: Request, res: Response, next: NextFunction) {
    req.logger = new Logger(getUUID());

    const startTime = performance.now();

    res.once("finish", async () => {
        const timing = performance.now() - startTime;

        req.logger.info(`${req.ip} ${req.method} ${req.url} ${res.statusCode} ${timing.toPrecision(2)}ms`);
    });

    next();
}