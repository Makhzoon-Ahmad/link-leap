import { relations } from "drizzle-orm";
import {
  pgTable,
  primaryKey,
  serial,
  varchar,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

export const UserTable = pgTable("UserTable", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 100 }).unique().notNull(),
  password: varchar("password", { length: 100 }).notNull(),
});

export const linkTable = pgTable("linksTable", {
  id: serial("id").primaryKey(),
  link: varchar("link", { length: 255 }).notNull(),
  shortId: varchar("short_link", { length: 100 }).unique(),
  expiryDate: timestamp("expiry_date", { mode: "date" }).notNull(),
  userId: integer("user_id").references(() => UserTable.id, {
    onDelete: "cascade",
  }),
});
export const linkAnalytics = pgTable("linkAnalytics", {
  id: serial("id").primaryKey(),
  linkId: integer("link_id")
    .references(() => linkTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  timestamp: timestamp("timestamp", { mode: "date" }).notNull(),
  browser: varchar("browser", { length: 100 }),
  os: varchar("os", { length: 100 }),
  device: varchar("device", { length: 100 }),
  country: varchar("country", { length: 100 }),
  ip: varchar("ip", { length: 100 }),
  userAgent: varchar("user_agent", { length: 255 }),
});

// relationships
export const linkRelations = relations(linkTable, ({ many }) => {
  return {
    analytics: many(linkAnalytics),
  };
});

export const linkAnalyticsRelations = relations(linkAnalytics, ({ one }) => {
  return {
    link: one(linkTable, {
      fields: [linkAnalytics.linkId],
      references: [linkTable.id],
    }),
  };
});
