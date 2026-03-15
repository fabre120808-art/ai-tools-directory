import { extraTools100 } from "@/data/extra-tools-100";
import { mockTools } from "@/data/tools";
import { getPool, isDatabaseConfigured } from "@/lib/db";
import type { ToolMutationInput, ToolRecord, ToolStatus } from "@/lib/tool-types";

export type AdminToolFilters = {
  query?: string;
  status?: ToolStatus | "all";
  primaryTag?: string | "all";
};

export type DatabaseStatus = {
  configured: boolean;
  ready: boolean;
  message?: string;
};

const fallbackTools = [...mockTools, ...extraTools100];

function asStringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => String(item));
}

function mapRow(row: Record<string, unknown>): ToolRecord {
  return {
    id: String(row.id),
    name: String(row.name),
    slug: String(row.slug),
    officialUrl: String(row.official_url),
    summary: String(row.summary),
    description: String(row.description ?? ""),
    primaryTag: String(row.primary_tag),
    secondaryTags: asStringArray(row.secondary_tags),
    searchAliases: asStringArray(row.search_aliases),
    bestFor: asStringArray(row.best_for),
    quickStart: asStringArray(row.quick_start),
    pricing: row.pricing as ToolRecord["pricing"],
    koreanSupport: Boolean(row.korean_support),
    platform: row.platform as ToolRecord["platform"],
    status: row.status as ToolRecord["status"],
    featured: Boolean(row.featured),
    createdAt: new Date(String(row.created_at)).toISOString(),
    updatedAt: new Date(String(row.updated_at)).toISOString()
  };
}

export async function getDatabaseStatus(): Promise<DatabaseStatus> {
  if (!isDatabaseConfigured()) {
    return {
      configured: false,
      ready: false,
      message: "DATABASE_URL이 설정되지 않았습니다."
    };
  }

  const pool = getPool();
  if (!pool) {
    return {
      configured: false,
      ready: false,
      message: "데이터베이스 연결을 초기화할 수 없습니다."
    };
  }

  try {
    const result = await pool.query<{ table_name: string | null }>(
      "select to_regclass('public.tools') as table_name"
    );

    if (!result.rows[0]?.table_name) {
      return {
        configured: true,
        ready: false,
        message: "tools 테이블이 없습니다. schema 적용과 seed가 필요합니다."
      };
    }

    return {
      configured: true,
      ready: true
    };
  } catch {
    return {
      configured: true,
      ready: false,
      message: "데이터베이스에 연결하지 못했습니다."
    };
  }
}

async function queryPublishedToolsFromDb() {
  const pool = getPool();
  if (!pool) {
    return null;
  }

  const result = await pool.query(
    `select * from tools
     where status = 'published'
     order by featured desc, updated_at desc, name asc`
  );

  return result.rows.map(mapRow);
}

export async function listPublicTools() {
  try {
    const dbTools = await queryPublishedToolsFromDb();
    if (dbTools) {
      return dbTools;
    }
  } catch {
    // Public pages fall back to mock data when DB is unavailable.
  }

  return fallbackTools
    .filter((tool) => tool.status === "published")
    .sort((a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name, "ko"));
}

export async function listFeaturedPublicTools(limit = 6) {
  const tools = await listPublicTools();
  const featured = tools.filter((tool) => tool.featured);
  if (featured.length >= limit) {
    return featured.slice(0, limit);
  }

  const fallback = tools.filter((tool) => !tool.featured);
  return [...featured, ...fallback].slice(0, limit);
}

export async function getPublicToolBySlug(slug: string) {
  const tools = await listPublicTools();
  return tools.find((tool) => tool.slug === slug) ?? null;
}

export async function getPublicToolSlugs() {
  const tools = await listPublicTools();
  return tools.map((tool) => tool.slug);
}

export async function listAdminTools(filters: AdminToolFilters = {}) {
  const status = await getDatabaseStatus();
  if (!status.ready) {
    return {
      tools: [] as ToolRecord[],
      databaseStatus: status
    };
  }

  const pool = getPool();
  if (!pool) {
    return {
      tools: [],
      databaseStatus: status
    };
  }

  const conditions: string[] = [];
  const values: unknown[] = [];

  if (filters.query) {
    values.push(`%${filters.query}%`);
    conditions.push(`(name ilike $${values.length} or slug ilike $${values.length} or summary ilike $${values.length})`);
  }

  if (filters.status && filters.status !== "all") {
    values.push(filters.status);
    conditions.push(`status = $${values.length}`);
  }

  if (filters.primaryTag && filters.primaryTag !== "all") {
    values.push(filters.primaryTag);
    conditions.push(`primary_tag = $${values.length}`);
  }

  const whereClause = conditions.length > 0 ? `where ${conditions.join(" and ")}` : "";
  const result = await pool.query(
    `select * from tools
     ${whereClause}
     order by updated_at desc, name asc`,
    values
  );

  return {
    tools: result.rows.map(mapRow),
    databaseStatus: status
  };
}

export async function getAdminToolById(id: string) {
  const status = await getDatabaseStatus();
  if (!status.ready) {
    return null;
  }

  const pool = getPool();
  if (!pool) {
    return null;
  }

  const result = await pool.query("select * from tools where id = $1 limit 1", [id]);
  return result.rows[0] ? mapRow(result.rows[0]) : null;
}

export async function getAdminToolBySlug(slug: string) {
  const status = await getDatabaseStatus();
  if (!status.ready) {
    return null;
  }

  const pool = getPool();
  if (!pool) {
    return null;
  }

  const result = await pool.query("select * from tools where slug = $1 limit 1", [slug]);
  return result.rows[0] ? mapRow(result.rows[0]) : null;
}

function getMutationValues(input: ToolMutationInput) {
  return [
    input.name,
    input.slug,
    input.officialUrl,
    input.summary,
    input.description,
    input.primaryTag,
    JSON.stringify(input.secondaryTags),
    JSON.stringify(input.searchAliases),
    JSON.stringify(input.bestFor),
    JSON.stringify(input.quickStart),
    input.pricing,
    input.koreanSupport,
    input.platform,
    input.status,
    input.featured
  ];
}

export async function createTool(input: ToolMutationInput) {
  const status = await getDatabaseStatus();
  if (!status.ready) {
    throw new Error(status.message ?? "DB 설정이 필요합니다.");
  }

  const pool = getPool();
  if (!pool) {
    throw new Error("DB 연결을 사용할 수 없습니다.");
  }

  const result = await pool.query(
    `insert into tools (
      name, slug, official_url, summary, description, primary_tag,
      secondary_tags, search_aliases, best_for, quick_start,
      pricing, korean_support, platform, status, featured
    ) values (
      $1, $2, $3, $4, $5, $6,
      $7::jsonb, $8::jsonb, $9::jsonb, $10::jsonb,
      $11, $12, $13, $14, $15
    )
    returning *`,
    getMutationValues(input)
  );

  return mapRow(result.rows[0]);
}

export async function updateTool(id: string, input: ToolMutationInput) {
  const status = await getDatabaseStatus();
  if (!status.ready) {
    throw new Error(status.message ?? "DB 설정이 필요합니다.");
  }

  const pool = getPool();
  if (!pool) {
    throw new Error("DB 연결을 사용할 수 없습니다.");
  }

  const result = await pool.query(
    `update tools
     set
       name = $2,
       slug = $3,
       official_url = $4,
       summary = $5,
       description = $6,
       primary_tag = $7,
       secondary_tags = $8::jsonb,
       search_aliases = $9::jsonb,
       best_for = $10::jsonb,
       quick_start = $11::jsonb,
       pricing = $12,
       korean_support = $13,
       platform = $14,
       status = $15,
       featured = $16,
       updated_at = now()
     where id = $1
     returning *`,
    [id, ...getMutationValues(input)]
  );

  if (!result.rows[0]) {
    throw new Error("수정할 도구를 찾지 못했습니다.");
  }

  return mapRow(result.rows[0]);
}
