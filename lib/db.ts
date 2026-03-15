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
    let connectionString = process.env.POSTGRES_URL;
    const isLocalhost = connectionString.includes("localhost");
    
    // Add sslmode=verify-full for non-localhost connections to avoid deprecation warning
    if (!isLocalhost && !connectionString.includes("sslmode=")) {
      connectionString += connectionString.includes("?") ? "&sslmode=verify-full" : "?sslmode=verify-full";
    }
    
    global.__toolDirectoryPool = new Pool({
      connectionString,
      ssl: isLocalhost ? false : { rejectUnauthorized: true }
    });
  }

  return global.__toolDirectoryPool;
}
