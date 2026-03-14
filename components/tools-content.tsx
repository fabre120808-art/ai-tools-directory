"use client";

import { useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ToolCard } from "@/components/tool-card";
import { tools, TASK_TAGS, SEARCH_ALIASES, type TaskTag } from "@/data/tools";

type SortOption = "recommended" | "name";

// 검색어를 작업 태그로 해석
function interpretSearchQuery(query: string): { matchedTags: TaskTag[]; normalizedQuery: string } {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return { matchedTags: [], normalizedQuery: "" };

  const matchedTags: TaskTag[] = [];

  for (const [tag, aliases] of Object.entries(SEARCH_ALIASES)) {
    const tagLower = tag.toLowerCase();
    const allTerms = [tagLower, ...aliases.map(a => a.toLowerCase())];
    
    for (const term of allTerms) {
      if (normalizedQuery.includes(term)) {
        matchedTags.push(tag as TaskTag);
        break;
      }
    }
  }

  return { matchedTags, normalizedQuery };
}

// 도구 점수 계산
function scoreToolForQuery(
  tool: typeof tools[0],
  normalizedQuery: string,
  matchedTags: TaskTag[],
  selectedTag: string | null
): number {
  let score = 0;
  
  if (selectedTag) {
    if (tool.primaryTag === selectedTag) score += 100;
    if (tool.secondaryTags.includes(selectedTag)) score += 50;
  }
  
  for (const tag of matchedTags) {
    if (tool.primaryTag === tag) score += 80;
    if (tool.secondaryTags.includes(tag)) score += 40;
  }
  
  if (normalizedQuery) {
    const searchableText = [
      tool.name,
      tool.summary,
      tool.primaryTag,
      ...tool.secondaryTags,
      ...(tool.searchAliases || []),
      ...tool.bestFor,
    ].join(" ").toLowerCase();
    
    if (searchableText.includes(normalizedQuery)) score += 30;
    if (tool.name.toLowerCase().includes(normalizedQuery)) score += 50;
  }
  
  return score;
}

export function ToolsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const query = searchParams.get("q") || "";
  const activeTag = searchParams.get("tag") || "";
  const sortBy = (searchParams.get("sort") as SortOption) || "recommended";

  const updateParams = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    for (const [key, value] of Object.entries(updates)) {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }
    
    const newUrl = params.toString() ? `?${params.toString()}` : "/tools";
    router.push(newUrl, { scroll: false });
  }, [router, searchParams]);

  const handleReset = useCallback(() => {
    router.push("/tools", { scroll: false });
  }, [router]);

  const { matchedTags, normalizedQuery } = useMemo(() => 
    interpretSearchQuery(query), [query]
  );

  const filteredTools = useMemo(() => {
    let results = tools.map(tool => ({
      tool,
      score: scoreToolForQuery(tool, normalizedQuery, matchedTags, activeTag || null)
    }));

    if (activeTag || normalizedQuery) {
      results = results.filter(r => r.score > 0);
    }

    if (sortBy === "name") {
      results.sort((a, b) => a.tool.name.localeCompare(b.tool.name, "ko"));
    } else {
      results.sort((a, b) => b.score - a.score);
    }

    return results.map(r => r.tool);
  }, [activeTag, normalizedQuery, matchedTags, sortBy]);

  // 결과 메시지 생성 - 자연스러운 UX writing
  const resultMessage = useMemo(() => {
    if (!activeTag && !query) {
      return null;
    }
    
    if (matchedTags.length > 0 && query) {
      const tagNames = matchedTags.slice(0, 2).join(", ");
      if (matchedTags.length === 1 && query.toLowerCase() !== matchedTags[0].toLowerCase()) {
        return `'${query}'은 '${tagNames}' 작업과 가깝게 보고 정리했어요`;
      }
      return `${tagNames}에 어울리는 도구를 모아봤어요`;
    }
    
    if (activeTag) {
      return `${activeTag}과 관련해 함께 살펴볼 만한 도구예요`;
    }
    
    if (query) {
      return `'${query}' 검색 결과`;
    }
    
    return null;
  }, [activeTag, query, matchedTags]);

  const suggestedTags = useMemo(() => {
    if (filteredTools.length > 0) return [];
    return TASK_TAGS.slice(0, 5);
  }, [filteredTools.length]);

  const hasFilters = activeTag || query || sortBy !== "recommended";

  return (
    <div className="space-y-8 py-12">
      {/* Page Header */}
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight">작업을 기준으로 둘러보기</h1>
        <p className="mt-3 leading-relaxed text-[var(--muted)]">
          하고 있는 작업을 기준으로 도구를 좁혀보면 선택이 한결 수월해져요.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-lg">
        <input
          className="input pl-10 pr-10"
          type="search"
          value={query}
          onChange={(e) => updateParams({ q: e.target.value })}
          placeholder="발표자료, 논문 요약, 코딩, 자막 만들기"
        />
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {query && (
          <button
            type="button"
            onClick={() => updateParams({ q: null })}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--foreground)]"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Tag Filter Section */}
      <div>
        <p className="mb-3 text-sm font-medium text-[var(--muted)]">작업 태그</p>
        <div className="tag-scroll border-b border-[var(--line)] pb-3">
          {TASK_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => updateParams({ tag: activeTag === tag ? null : tag })}
              className={`tag-item ${activeTag === tag ? "active" : ""}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Status & Sort */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {resultMessage && (
            <p className="text-sm text-[var(--muted)]">{resultMessage}</p>
          )}
          <span className="text-sm text-[var(--muted)]">
            {filteredTools.length}개
          </span>
          {hasFilters && (
            <button
              type="button"
              onClick={handleReset}
              className="text-sm font-medium text-[var(--accent)] hover:underline"
            >
              초기화
            </button>
          )}
        </div>
        
        {/* Sort Options */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-[var(--muted)]">정렬</span>
          <button
            type="button"
            onClick={() => updateParams({ sort: "recommended" })}
            className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
              sortBy === "recommended"
                ? "bg-[var(--accent)] text-white"
                : "bg-[var(--card)] text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            추천순
          </button>
          <button
            type="button"
            onClick={() => updateParams({ sort: "name" })}
            className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
              sortBy === "name"
                ? "bg-[var(--accent)] text-white"
                : "bg-[var(--card)] text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            이름순
          </button>
        </div>
      </div>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="card p-10 text-center">
          <h2 className="text-lg font-bold">아직 꼭 맞는 도구는 보이지 않네요</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            다른 작업으로 좁혀보면 더 잘 맞는 도구를 찾을 수 있어요.
          </p>
          
          {suggestedTags.length > 0 && (
            <div className="mt-8">
              <p className="text-sm font-medium text-[var(--muted)]">함께 보면 좋은 작업</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {suggestedTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => updateParams({ tag, q: null })}
                    className="rounded-full border border-[var(--line)] px-4 py-2 text-sm text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
