import { Router } from "express";
import { logging } from "./middleware/logging";

const router = Router();

router.use(logging);

router.get("/", (req, res) => res.send("hello world v1!"));

export default router;