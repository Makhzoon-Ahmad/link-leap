
import { addMinutes } from "date-fns";
import { date } from "drizzle-orm/mysql-core";
import { pgTable, primaryKey, serial, varchar, timestamp} from "drizzle-orm/pg-core";

export const linkTable = pgTable("linksTable", {
  id: serial("id").primaryKey(), 
  link: varchar("link", { length: 255 }).notNull(),
  shortLink: varchar("short_link", { length: 100 }).unique(),
  expiryDate: timestamp("expiry_date", {mode: "date" }).notNull()
});
