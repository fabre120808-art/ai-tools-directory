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
    
    // Replace any existing sslmode with verify-full, or add it if not present
    if (!isLocalhost) {
      if (connectionString.includes("sslmode=")) {
        connectionString = connectionString.replace(/sslmode=[^&]+/, "sslmode=verify-full");
      } else {
        connectionString += connectionString.includes("?") ? "&sslmode=verify-full" : "?sslmode=verify-full";
      }
    }
    
    global.__toolDirectoryPool = new Pool({
      connectionString,
      ssl: isLocalhost ? false : { rejectUnauthorized: true }
    });
  }

  return global.__toolDirectoryPool;
}
