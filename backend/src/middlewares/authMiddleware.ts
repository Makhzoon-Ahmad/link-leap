import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const SECRET_KEY = process.env.SECRET_KEY;

export interface AuthRequest extends Request {
    user?: { id: number };
}

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void => {
    const authHeader = req.headers.authorization;
    console.log("Authorization header:", authHeader);

    if (!authHeader) {
        // No token — allow unauthenticated access
        req.user = undefined; // or just leave it unset
        return next();
    }

    try {
        const verifiedUser = jwt.verify(authHeader, SECRET_KEY!) as { userId: number; iat: number };
        console.log("verified user:", verifiedUser.userId);
        req.user = { id: verifiedUser.userId }; // normalized
        return next();
    } catch (e) {
        console.error("JWT Verification Error:", e);
        res.status(403).json({
            message: "Unauthorized: Invalid token",
            success: false
        });
    }
};
