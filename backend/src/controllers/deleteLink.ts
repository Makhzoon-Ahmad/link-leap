import { Request, Response } from "express";
import { db } from "../drizzle";
import { eq } from "drizzle-orm";
import { linkTable } from "../drizzle/schema";
import { AuthRequest } from "../middlewares/authMiddleware";

export async function deleteLink(req: AuthRequest, res: Response): Promise<void> {
  const linkId = Number(req.params.id);

  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  await db.delete(linkTable).where(eq(linkTable.id, linkId));
  res.json({ success: true, message: "Link deleted" }); 
}
