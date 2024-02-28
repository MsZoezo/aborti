import { Router } from "express";
import { logging } from "./middleware/logging";
import messages from "./routes/messages";

const router = Router();

router.use(logging);
router.use("/messages", messages)

router.get("/", (req, res) => res.send("hello world v1!"));

export default router;