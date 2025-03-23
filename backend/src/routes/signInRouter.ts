import { Router } from "express";
import { signIn } from "../controllers/signIn";

const router = Router();

router.post('/signin', signIn);

export default router;