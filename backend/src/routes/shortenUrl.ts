import express from "express";
import shortenUrl from "../controllers/shortenUrl"
import { authMiddleware } from "../middlewares/authMiddleware";
const router = express.Router();

router.post('/shortenLink', authMiddleware,shortenUrl);

export default router;