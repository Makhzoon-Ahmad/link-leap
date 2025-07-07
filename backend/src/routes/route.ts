import { Router } from "express";
import  shortenUrlRoute from "./shortenUrl"
import signUp from "./signUpRouter"
import signIn from "./signInRouter"
import links from "./links"
import {deleteLink} from "../controllers/deleteLink"
import { authMiddleware } from "../middlewares/authMiddleware";
const router: Router= Router();


router.use(shortenUrlRoute)
router.use(signUp)
router.use(signIn)
router.use(links)
router.delete("/link/:id", authMiddleware, deleteLink);

export default router