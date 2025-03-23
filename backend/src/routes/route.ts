import { Router } from "express";
import  shortenUrlRoute from "./shortenUrl"
import signUp from "./signUpRouter"
import signIn from "./signInRouter"
const router: Router= Router();


router.use(shortenUrlRoute)
router.use(signUp)
router.use(signIn)

export default router