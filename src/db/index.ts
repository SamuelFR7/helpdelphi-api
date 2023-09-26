import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { env } from "../env.mjs";
 
const connection = await mysql.createConnection({
  host: env.DATABASE_HOST, 
  user: env.DATABASE_USER, 
  password: env.DATABASE_PASSWORD, 
  database: env.DATABASE_DB, 
});
 
export const db = drizzle(connection);
