import { drizzle } from "drizzle-orm/neon-serverless";
import {   Pool } from "@neondatabase/serverless";
import "dotenv/config"
import * as schema from "./schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL as string,

});


export const db = drizzle(pool, { schema });