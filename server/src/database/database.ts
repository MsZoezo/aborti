import { Sequelize, ModelStatic, Model } from "sequelize";
import { Logger } from "../utils/logger";

import messageInit, { Message } from "./models/message";

const logger = new Logger("Sequelize")

const sequelize: Sequelize = new Sequelize('database', "", "", {
	dialect: 'sqlite',
    
	logging: (message) => {
        logger.verbose(message);
    },

	storage: "database.sqlite",
});

messageInit(sequelize);

sequelize.sync();

export { sequelize, Message };