import { extraTools100 } from "@/data/extra-tools-100";
import { mockTools } from "@/data/tools";
import { createClient } from "@/lib/supabase/server";
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

function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export async function getDatabaseStatus(): Promise<DatabaseStatus> {
  if (!isSupabaseConfigured()) {
    return {
      configured: false,
      ready: false,
      message: "Supabase 환경변수가 설정되지 않았습니다."
    };
  }

  try {
    const supabase = await createClient();
    
    const { error } = await supabase
      .from("tools")
      .select("id")
      .limit(1);

    if (error) {
      if (error.code === "42P01" || error.message.includes("does not exist")) {
        return {
          configured: true,
          ready: false,
          message: "tools 테이블이 없습니다. schema 적용과 seed가 필요합니다."
        };
      }
      
      return {
        configured: true,
        ready: false,
        message: `데이터베이스 오류: ${error.message}`
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
  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from("tools")
      .select("*")
      .eq("status", "published")
      .order("featured", { ascending: false })
      .order("updated_at", { ascending: false })
      .order("name", { ascending: true });

    if (error) {
      return null;
    }

    return data.map(mapRow);
  } catch {
    return null;
  }
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

  const supabase = await createClient();
  
  let query = supabase
    .from("tools")
    .select("*")
    .order("updated_at", { ascending: false })
    .order("name", { ascending: true });

  if (filters.query) {
    query = query.or(`name.ilike.%${filters.query}%,slug.ilike.%${filters.query}%,summary.ilike.%${filters.query}%`);
  }

  if (filters.status && filters.status !== "all") {
    query = query.eq("status", filters.status);
  }

  if (filters.primaryTag && filters.primaryTag !== "all") {
    query = query.eq("primary_tag", filters.primaryTag);
  }

  const { data, error } = await query;

  if (error) {
    return {
      tools: [],
      databaseStatus: {
        ...status,
        ready: false,
        message: `쿼리 오류: ${error.message}`
      }
    };
  }

  return {
    tools: data.map(mapRow),
    databaseStatus: status
  };
}

export async function getAdminToolById(id: string) {
  const status = await getDatabaseStatus();
  if (!status.ready) {
    return null;
  }

  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("tools")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }

  return mapRow(data);
}

export async function getAdminToolBySlug(slug: string) {
  const status = await getDatabaseStatus();
  if (!status.ready) {
    return null;
  }

  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("tools")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return null;
  }

  return mapRow(data);
}

export async function createTool(input: ToolMutationInput) {
  const status = await getDatabaseStatus();
  if (!status.ready) {
    throw new Error(status.message ?? "DB 설정이 필요합니다.");
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tools")
    .insert({
      name: input.name,
      slug: input.slug,
      official_url: input.officialUrl,
      summary: input.summary,
      description: input.description,
      primary_tag: input.primaryTag,
      secondary_tags: input.secondaryTags,
      search_aliases: input.searchAliases,
      best_for: input.bestFor,
      quick_start: input.quickStart,
      pricing: input.pricing,
      korean_support: input.koreanSupport,
      platform: input.platform,
      status: input.status,
      featured: input.featured
    })
    .select()
    .single();

  if (error) {
    throw new Error(`도구 생성 실패: ${error.message}`);
  }

  return mapRow(data);
}

export async function updateTool(id: string, input: ToolMutationInput) {
  const status = await getDatabaseStatus();
  if (!status.ready) {
    throw new Error(status.message ?? "DB 설정이 필요합니다.");
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tools")
    .update({
      name: input.name,
      slug: input.slug,
      official_url: input.officialUrl,
      summary: input.summary,
      description: input.description,
      primary_tag: input.primaryTag,
      secondary_tags: input.secondaryTags,
      search_aliases: input.searchAliases,
      best_for: input.bestFor,
      quick_start: input.quickStart,
      pricing: input.pricing,
      korean_support: input.koreanSupport,
      platform: input.platform,
      status: input.status,
      featured: input.featured,
      updated_at: new Date().toISOString()
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(`도구 수정 실패: ${error.message}`);
  }

  if (!data) {
    throw new Error("수정할 도구를 찾지 못했습니다.");
  }

  return mapRow(data);
}

export async function deleteTool(id: string) {
  const status = await getDatabaseStatus();
  if (!status.ready) {
    throw new Error(status.message ?? "DB 설정이 필요합니다.");
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("tools")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(`도구 삭제 실패: ${error.message}`);
  }

  return true;
}

export async function getAllPrimaryTags() {
  const status = await getDatabaseStatus();
  if (!status.ready) {
    const tagSet = new Set(fallbackTools.map((t) => t.primaryTag));
    return Array.from(tagSet).sort((a, b) => a.localeCompare(b, "ko"));
  }

  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("tools")
    .select("primary_tag");

  if (error || !data) {
    const tagSet = new Set(fallbackTools.map((t) => t.primaryTag));
    return Array.from(tagSet).sort((a, b) => a.localeCompare(b, "ko"));
  }

  const tagSet = new Set(data.map((row) => String(row.primary_tag)));
  return Array.from(tagSet).sort((a, b) => a.localeCompare(b, "ko"));
}
