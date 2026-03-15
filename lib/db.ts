import { Pool } from "pg";

declare global {
  var __toolDirectoryPool: Pool | undefined;
}

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

export function getPool() {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  if (!global.__toolDirectoryPool) {
    global.__toolDirectoryPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL.includes("localhost")
        ? false
        : { rejectUnauthorized: false }
    });
  }

  return global.__toolDirectoryPool;
}
