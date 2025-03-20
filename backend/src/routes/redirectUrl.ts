import express from "express";
import redirectUrl from "../controllers/redirectUrl";

const redirectRouter = express.Router();

redirectRouter.get("/:shortId", redirectUrl); 

export default redirectRouter;
