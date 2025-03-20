import express from "express";
import shortenUrl from "../controllers/shortenUrl"
const router = express.Router();

router.post('/shortenLink', shortenUrl);

export default router;