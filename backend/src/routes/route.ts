import { Router } from "express";
import  shortenUrlRoute from "./shortenUrl"
import signUp from "./signUpRouter"
const router: Router= Router();


router.use(shortenUrlRoute)
router.use(signUp)

export default router