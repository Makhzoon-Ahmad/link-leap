import express from "express";

import { authMiddleware } from "../middlewares/authMiddleware";
import { eq } from "drizzle-orm";
import userLinks from "../controllers/userLinks";
import InsightsController from "../controllers/insights";

const router = express.Router();

router.get("/links", authMiddleware, userLinks);
router.get("/insights", authMiddleware, InsightsController);
export default router;
