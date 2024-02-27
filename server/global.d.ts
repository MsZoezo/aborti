import { Logger } from "./src/utils/logger"

declare global {
    namespace Express {
        export interface Request {
            logger: Logger
        }
    }
}