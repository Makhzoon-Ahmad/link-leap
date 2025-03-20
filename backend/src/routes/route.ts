import { Router } from "express";
import  shortenUrlRoute from "./shortenUrl"
const router: Router= Router();


router.use(shortenUrlRoute)

export default router