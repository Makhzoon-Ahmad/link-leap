import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import "dotenv/config"
const SECRET_KEY = process.env.SECRET_KEY;

export interface Auth extends Request{
    user: {
        id: number;
    }
}

export const authMiddleware = (req: Auth, res: Response, next: NextFunction) => {
        
        const authHeader = req.headers.authorization;
        
        if(!authHeader){
            res.status(401).json({
                message: "Unauthorized",
                success: false
            })
            return;
        }
        try {
            const verifiedUser = jwt.verify(authHeader, SECRET_KEY!) as {id: number};
            req.user = verifiedUser;
            next();
        } catch (e) {
            console.log(e);
            return res.status(401).json({
                message: "Unauthorized: Invalid token",
                success: false,
              });
        }
        
}