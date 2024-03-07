import { Request, Response, Router } from "express"
import { Message } from "../../database/database"
import { body, validationResult, param } from "express-validator"
import { Logger } from "../../utils/logger";
import { DataTypes, Op, Sequelize } from "sequelize";

const router = Router();

router.post("/",

    body("message", "Message must be between 1 and 2000 characters.").isLength({ min: 1, max: 2000 }).escape(),
    body("sender", "Sender must not be longer than 30 characters.").optional().isLength({ min: 1, max: 30 }).escape(),

    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.send({ success: false, errors: errors.array() });

        const message = await Message.create({ message: req.body.message, sender: req.body.sender ?? undefined });
        message.save();

        res.status(200).send({ success: true, message: message.uuid});
    }
);

router.get("/:uuid",

    param("uuid").escape().custom(async value => {
        const message = await Message.findByPk(value);

        if(!message) throw new Error("Message does not exist! Maybe it has been aborted already..");
    }),

    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.send({ success: false, errors: errors.array() });

        const message = await Message.findByPk(req.params.uuid);

        if(!message) return res.status(400).send({ success: false }) // This should literally never happen cause we already checked using the validator but..

        if(!message.read) {
            message.read = true;
            message.readAt = Date.now();

            message.save();    
        }

        res.status(200).send({ success: true, data: message!})
    }
);

const logger = new Logger("Cronjob")

// We delete read ones after 5 minutes
setInterval(async () => {
    logger.verbose("Checking for read messages to delete.");
    const amount = await Message.destroy({
        where: {
            read: true,
            readAt: {
                [Op.gte]: Sequelize.literal("date('now', '-5 minutes')"), 
            }
        }
    });

    if(amount > 0) logger.verbose(`Deleted ${amount} read messages.`);
}, 60_000);

export default router;