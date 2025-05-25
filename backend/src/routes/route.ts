import { Router } from "express";
import  shortenUrlRoute from "./shortenUrl"
import signUp from "./signUpRouter"
import signIn from "./signInRouter"
import links from "./links"
const router: Router= Router();


router.use(shortenUrlRoute)
router.use(signUp)
router.use(signIn)
router.use(links)

export default router