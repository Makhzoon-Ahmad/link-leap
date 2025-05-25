import {Router} from "express";
import signUp from "../controllers/signUp";
const signUpRouter = Router();


signUpRouter.post("/signup", signUp)

export default signUpRouter;