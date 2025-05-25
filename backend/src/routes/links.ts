import express from "express";

import {authMiddleware} from "../middlewares/authMiddleware";
import { eq } from "drizzle-orm";
import userLinks from "../controllers/userLinks";

const router = express.Router();

router.get("/links", authMiddleware, userLinks);
export default router;
