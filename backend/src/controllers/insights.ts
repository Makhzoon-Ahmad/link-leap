import { Request, Response } from "express";
import { db } from "../drizzle";
import { count, eq } from "drizzle-orm";
import { linkAnalytics, linkTable } from "../drizzle/schema";
import { AuthRequest } from "../middlewares/authMiddleware";
function getHourlyClickData(analytics: any[]) {
  // Create 24-hour structure (0-23 hours)
  const hourlyData = Array.from({ length: 24 }, (_, hour) => ({
    hour: hour.toString().padStart(2, '0') + ':00',
    value: 0
  }));

  // Count clicks for each hour
  analytics.forEach(analytic => {
    if (analytic.timestamp) {
      const date = new Date(analytic.timestamp);
      const hour = date.getHours();
      hourlyData[hour].value+= 1;
    }
  });

  return hourlyData;
}function groupAnalyticsData(devices: any[], browsers: any[], os: any[]) {
  // Categorization mappings
  const deviceCategories = {
    mobile: [
      "iphone",
      "android",
      "samsung",
      "pixel",
      "oneplus",
      "huawei",
      "xiaomi",
      "oppo",
      "vivo",
      "lg",
      "motorola",
      "nokia",
    ],
    tablet: ["ipad", "tablet", "surface", "kindle", "galaxy tab"],
    desktop: [
      "windows",
      "mac",
      "macbook",
      "imac",
      "pc",
      "desktop",
      "laptop",
      "chromebook",
      "linux",
    ],
  };

  const browserCategories = {
    chrome: ["chrome", "chromium"],
    safari: ["safari", "webkit"],
    firefox: ["firefox", "mozilla"],
    edge: ["edge", "edg"],
    opera: ["opera"],
    ie: ["internet explorer", "msie"],
  };

  const osCategories = {
    windows: ["windows", "win"],
    macos: ["macos", "mac os", "osx", "os x"],
    ios: ["ios", "iphone os"],
    android: ["android"],
    linux: ["linux", "ubuntu", "debian", "fedora"],
  };

  // Categorization function
  function categorize(
    name: string,
    categories: Record<string, string[]>
  ): string {
    if (!name) return "Other";
    const lowerName = name.toLowerCase();

    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some((keyword) => lowerName.includes(keyword))) {
        return category.charAt(0).toUpperCase() + category.slice(1);
      }
    }
    return "Other";
  }

  // Generic grouping function
  function groupData(data: any[], categorizer: (item: any) => string) {
    const grouped = data.reduce((acc, item) => {
      const category = categorizer(item);
      if (!acc[category]) {
        acc[category] = { total: 0, clicks: 0 };
      }
      acc[category].total += 1;
      acc[category].clicks += item.clicks || 0;
      return acc;
    }, {} as Record<string, { total: number; clicks: number }>);

    // Convert to array format
    return Object.entries(grouped).map(([category, data]) => ({
      name: category,
      total: data.total,
      clicks: data.clicks,
    }));
  }

  // Group all data
  const groupedDevices = groupData(devices, (device) =>
    categorize(device.device, deviceCategories)
  );
  const groupedBrowsers = groupData(browsers, (browser) =>
    categorize(browser.browser, browserCategories)
  );
  const groupedOS = groupData(os, (osItem) =>
    categorize(osItem.os, osCategories)
  );

  return {
    devices: groupedDevices,
    browsers: groupedBrowsers,
    operatingSystems: groupedOS,
  };
}
export default async function InsightsController(
  req: AuthRequest,
  res: Response
): Promise<void> {
  const userId = req.user?.id;
  console.log(userId);
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const countries = await db
    .select({
      countries: linkAnalytics.country,
    })
    .from(linkAnalytics)
    .leftJoin(linkTable, eq(linkTable.id, linkAnalytics.linkId))
    .where(eq(linkTable.userId, userId));

  const browser = await db
    .select({
      browser: linkAnalytics.browser,
    })
    .from(linkAnalytics)
    .leftJoin(linkTable, eq(linkTable.id, linkAnalytics.linkId))
    .where(eq(linkTable.userId, userId));

  const os = await db
    .select({
      os: linkAnalytics.os,
    })
    .from(linkAnalytics)
    .leftJoin(linkTable, eq(linkTable.id, linkAnalytics.linkId))
    .where(eq(linkTable.userId, userId));

  const ip = await db
    .select({
      ip: linkAnalytics.ip,
    })
    .from(linkAnalytics)
    .leftJoin(linkTable, eq(linkTable.id, linkAnalytics.linkId))
    .where(eq(linkTable.userId, userId));

  const userAgent = await db
    .select({
      userAgent: linkAnalytics.userAgent,
    })
    .from(linkAnalytics)
    .leftJoin(linkTable, eq(linkTable.id, linkAnalytics.linkId))
    .where(eq(linkTable.userId, userId));

  const timestamp = await db
    .select({
      timestamp: linkAnalytics.timestamp,
    })
    .from(linkAnalytics)
    .leftJoin(linkTable, eq(linkTable.id, linkAnalytics.linkId))
    .where(eq(linkTable.userId, userId));

  const device = await db
    .select({
      device: linkAnalytics.device,
    })
    .from(linkAnalytics)
    .leftJoin(linkTable, eq(linkTable.id, linkAnalytics.linkId))
    .where(eq(linkTable.userId, userId));

    const [totalClicks] = await db
    .select({
      clicks: count(linkAnalytics),
    })
    .from(linkAnalytics)
    .leftJoin(linkTable, eq(linkTable.id, linkAnalytics.linkId))
    .where(eq(linkTable.userId, userId))
    .groupBy(linkTable.link);


  const links = await db
    .select({
      link: linkTable.link,
      clicks: count(linkAnalytics),
    })
    .from(linkAnalytics)
    .leftJoin(linkTable, eq(linkTable.id, linkAnalytics.linkId))
    .where(eq(linkTable.userId, userId))
    .groupBy(linkTable.link);
const hourlyClicks = getHourlyClickData(timestamp)
  const groupedData = groupAnalyticsData(device, browser, os);
  res.json({
    success: true,
    data: {
      ...groupedData,
      countries,
      userAgent,
      hourlyClicks,
      ip,
      links,
      totalClicks
    },
  });
  return;
}
