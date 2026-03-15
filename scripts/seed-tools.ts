import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { Pool } from "pg";
import { mockTools } from "../data/tools";
import { extraTools100 } from "../data/extra-tools-100";

async function main() {
  if (!process.env.POSTGRES_URL) {
    throw new Error("POSTGRES_URL이 설정되지 않았습니다.");
  }

  const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: process.env.POSTGRES_URL.includes("localhost")
      ? false
      : { rejectUnauthorized: false }
  });

  const schema = await readFile(resolve(process.cwd(), "db/schema.sql"), "utf8");
  await pool.query(schema);

  const tools = [...mockTools, ...extraTools100];

  for (const tool of tools) {
    await pool.query(
      `insert into tools (
        id, name, slug, official_url, summary, description, primary_tag,
        secondary_tags, search_aliases, best_for, quick_start,
        pricing, korean_support, platform, status, featured, created_at, updated_at
      ) values (
        $1, $2, $3, $4, $5, $6, $7,
        $8::jsonb, $9::jsonb, $10::jsonb, $11::jsonb,
        $12, $13, $14, $15, $16, $17, $18
      )
      on conflict (slug) do update set
        name = excluded.name,
        official_url = excluded.official_url,
        summary = excluded.summary,
        description = excluded.description,
        primary_tag = excluded.primary_tag,
        secondary_tags = excluded.secondary_tags,
        search_aliases = excluded.search_aliases,
        best_for = excluded.best_for,
        quick_start = excluded.quick_start,
        pricing = excluded.pricing,
        korean_support = excluded.korean_support,
        platform = excluded.platform,
        status = excluded.status,
        featured = excluded.featured,
        updated_at = excluded.updated_at`,
      [
        tool.id,
        tool.name,
        tool.slug,
        tool.officialUrl,
        tool.summary,
        tool.description,
        tool.primaryTag,
        JSON.stringify(tool.secondaryTags),
        JSON.stringify(tool.searchAliases),
        JSON.stringify(tool.bestFor),
        JSON.stringify(tool.quickStart),
        tool.pricing,
        tool.koreanSupport,
        tool.platform,
        tool.status,
        tool.featured,
        tool.createdAt,
        tool.updatedAt
      ]
    );
  }

  await pool.end();
  console.log(`Seed completed: ${tools.length} tools`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
