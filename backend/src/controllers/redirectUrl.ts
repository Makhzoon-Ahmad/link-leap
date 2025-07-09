import { UAParser } from "ua-parser-js";
import geoip from "geoip-lite";
import { Request, Response } from "express";
import "dotenv/config";
import { db } from "../drizzle";
import { linkAnalytics, linkTable } from "../drizzle/schema";
import { and, eq, gt, lt } from "drizzle-orm";

const PORT = process.env.PORT;
const BASE_URL = process.env.BASE_URL;

const redirectUrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const shortId = req.params.shortId;
    // TODO change the hardcoded domain value
    // const shortenUrl: string = `${BASE_URL}/${shortId}`;
    // TODO  use transaction  here
    const [result] = await db
      .select()
      .from(linkTable)
      .where(
        and(
          eq(linkTable.shortId, shortId),
          gt(linkTable.expiryDate, new Date())
        )
      )
      .limit(1);

    // TODO increment the counter in db

    console.log(result);
    if (!result) {
      res.status(404).json({
        message: "Shortened URL doesn't exist or has expired!",
      });
      return;
    }
    // --- Analytics collection ---
    const userAgent = req.headers["user-agent"] || "";
    const parser = new UAParser(userAgent);
    const uaResult = parser.getResult();
    const browser = uaResult.browser.name || "Unknown";
    const os = uaResult.os.name || "Unknown";
    const device = uaResult.device.type || "Desktop";

    let ip =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress || req.ip;
    if (Array.isArray(ip)) ip = ip[0];
    if (typeof ip === "string" && ip.includes(",")) ip = ip.split(",")[0];

    // Country lookup
    let country = "Unknown";
    if (typeof ip === "string") {
      const geo = geoip.lookup(ip);
      if (geo && geo.country) country = geo.country;
    }

    // Store analytics
    await db.insert(linkAnalytics).values({
      linkId: result.id,
      timestamp: new Date(),
      browser,
      os,
      device,
      country,
      ip: typeof ip === "string" ? ip : "",
      userAgent,
    });

    res.status(200).json({ link: result.link });
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error",
    });
    console.log(e);
  }
};

export default redirectUrl;
