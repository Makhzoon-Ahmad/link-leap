import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const SECRET_KEY = process.env.SECRET_KEY;

export interface AuthRequest extends Request {
    user?: { id: number };
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({
            message: "Unauthorized: No token provided",
            success: false
        });
        
        (req as any).user  = null
        next()
        return 
    }

    const token = authHeader;

    try {
        const verifiedUser = jwt.verify(token, SECRET_KEY!) as { id: number };
        {console.log(verifiedUser)}
        (req as AuthRequest).user = verifiedUser; 
        return next(); 
    } catch (e) {
        console.error("JWT Verification Error:", e);
        res.status(403).json({
            message: "Unauthorized: Invalid token",
            success: false
        });
        return;
    }
};
