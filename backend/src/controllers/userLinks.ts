import { Request, Response } from "express";
import { db } from "../drizzle";
import { linkTable } from "../drizzle/schema";
import { AuthRequest } from "../middlewares/authMiddleware";
import { eq } from "drizzle-orm";

async function userLinks(req: AuthRequest, res: Response): Promise<void> {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const userId = req.user.id;
        console.log(userId)
        const links = await db.select().from(linkTable).where(eq(linkTable.userId, userId));

        res.status(200).json({ links });
    } catch (error) {
        console.error("Error fetching user links:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export default userLinks;
