import { Request, Response } from "express";
import { db } from "../drizzle";
import { linkAnalytics, linkTable } from "../drizzle/schema";
import { AuthRequest } from "../middlewares/authMiddleware";
import { count, eq } from "drizzle-orm";

async function userLinks(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const userId = req.user?.id;
    console.log("user == > ", userId);
    // const links = await db
    //   .select()
    //   .from(linkTable)
    //   .where(eq(linkTable.userId, userId))
    //   .leftJoin(linkAnalytics, eq(linkAnalytics.linkId, linkTable.id))
    //   .orderBy(linkTable.id, linkAnalytics.id);
    const links = await db
      .select({
        id: linkTable.id,
        link: linkTable.link,
        shortId: linkTable.shortId,
        expiryDate: linkTable.expiryDate,
        userId: linkTable.userId,
        clicks: db
          .$count(linkAnalytics, eq(linkAnalytics.linkId, linkTable.id))
          .as("clicks"),
      })
      .from(linkTable)
      .where(eq(linkTable.userId, userId));
    console.log("linkssss :::::::: ", JSON.stringify(links, null, 4));

    res.status(200).json({ links });
  } catch (error) {
    console.error("Error fetching user links:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export default userLinks;
