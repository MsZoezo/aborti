import winston, { addColors } from "winston";

const levels = {
	error: 1,
	warn: 2,
	info: 3,
	verbose: 4,
};

addColors({
	info: "bold blue",
	warn: "italic yellow",
	error: "bold red",
	verbose: "black",
});

const logger = winston.createLogger({
	level: process.env.LOGGER_LEVEL || "warn",
	levels: levels,
	format: winston.format.combine(
		winston.format.metadata(),
		winston.format.colorize({ message: true, level: false }),
		winston.format.timestamp({
			format: "YYYY-MM-DD HH:mm:ss",
		}),
        winston.format.printf(({ metadata, timestamp, message }) => `\x1b[90m[${timestamp} ${metadata.context}] ${message}`)
	),
	transports: [
		new winston.transports.Console(),
	],
});

export class Logger {
	private logger: winston.Logger;

	constructor(context: string) {
		this.logger = logger.child({ context: context });
	}

	public verbose(message: string): void {
		this.logger.log("verbose", message);
	}

	public error(message: string): void {
		this.logger.log("error", message);
	}

	public warn(message: string): void {
		this.logger.log("warn", message);
	}

	public info(message: string): void {
		this.logger.log("info", message);
	}
}