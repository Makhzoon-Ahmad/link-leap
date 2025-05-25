import { pgTable, primaryKey, serial, varchar, timestamp, integer} from "drizzle-orm/pg-core";


export const UserTable = pgTable("UserTable", {
  id: serial("id").primaryKey(),
  email: varchar("email", {length : 100}).unique().notNull(),
  password: varchar("password", {length:100}).notNull()
  
})

export const linkTable = pgTable("linksTable", {
  id: serial("id").primaryKey(), 
  link: varchar("link", { length: 255 }).notNull(),
  shortLink: varchar("short_link", { length: 100 }).unique(),
  expiryDate: timestamp("expiry_date", {mode: "date" }).notNull(),
  userId:  integer("user_id").references(() => UserTable.id, {onDelete : "cascade"})
});