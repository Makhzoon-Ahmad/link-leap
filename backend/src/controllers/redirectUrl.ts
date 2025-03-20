import { Request, Response } from "express";
import "dotenv/config";
import { db } from "../drizzle";
import { linkTable } from "../drizzle/schema";
import { and, eq, gt, lt } from "drizzle-orm";

const PORT = process.env.PORT;
const redirectUrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const shortId = req.params.shortId;
    const shortenUrl: string = `http://localhost:${PORT}/${shortId}`;
    const now = new Date();
    const result = await db
      .select()
      .from(linkTable)
      .where(
        and(eq(linkTable.shortLink, shortenUrl), gt(linkTable.expiryDate, now))
      );

    console.log(result);
    if (result.length == 0) {
      res.status(404).json({
        message: "Shortened URL doesn't exist or has expired!",
      });
      return;
    }

    res.redirect(result[0].link);
  } catch {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export default redirectUrl;
