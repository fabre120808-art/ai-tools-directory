import { Pool } from "pg";

declare global {
  var __toolDirectoryPool: Pool | undefined;
}

export function isDatabaseConfigured() {
  return Boolean(process.env.POSTGRES_URL);
}

export function getPool() {
  if (!process.env.POSTGRES_URL) {
    return null;
  }

  if (!global.__toolDirectoryPool) {
    const connectionString = process.env.POSTGRES_URL;
    const isLocalhost = connectionString.includes("localhost");
    
    global.__toolDirectoryPool = new Pool({
      connectionString,
      ssl: isLocalhost ? false : { rejectUnauthorized: false }
    });
  }

  return global.__toolDirectoryPool;
}
