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

  // 검색어에서 각 태그와 별칭을 찾아 매칭
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

// 도구 점수 계산 (다중 의도 검색 지원)
function scoreToolForQuery(
  tool: typeof tools[0],
  normalizedQuery: string,
  matchedTags: TaskTag[],
  selectedTag: string | null
): number {
  let score = 0;
  
  // 선택된 태그 일치
  if (selectedTag) {
    if (tool.primaryTag === selectedTag) score += 100;
    if (tool.secondaryTags.includes(selectedTag)) score += 50;
  }
  
  // 검색어로 매칭된 태그들과 일치 (다중 의도)
  for (const tag of matchedTags) {
    if (tool.primaryTag === tag) score += 80;
    if (tool.secondaryTags.includes(tag)) score += 40;
  }
  
  // 직접 텍스트 매칭
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

export default function ToolsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const query = searchParams.get("q") || "";
  const activeTag = searchParams.get("tag") || "";
  const sortBy = (searchParams.get("sort") as SortOption) || "recommended";

  // URL 업데이트 함수
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

  // 초기화
  const handleReset = useCallback(() => {
    router.push("/tools", { scroll: false });
  }, [router]);

  // 검색어 해석
  const { matchedTags, normalizedQuery } = useMemo(() => 
    interpretSearchQuery(query), [query]
  );

  // 필터링 및 정렬된 도구
  const filteredTools = useMemo(() => {
    let results = tools.map(tool => ({
      tool,
      score: scoreToolForQuery(tool, normalizedQuery, matchedTags, activeTag || null)
    }));

    // 필터링: 태그나 검색어가 있으면 점수가 있는 것만
    if (activeTag || normalizedQuery) {
      results = results.filter(r => r.score > 0);
    }

    // 정렬
    if (sortBy === "name") {
      results.sort((a, b) => a.tool.name.localeCompare(b.tool.name, "ko"));
    } else {
      // 추천순 (점수 높은 순)
      results.sort((a, b) => b.score - a.score);
    }

    return results.map(r => r.tool);
  }, [activeTag, normalizedQuery, matchedTags, sortBy]);

  // 결과 메시지 생성
  const resultMessage = useMemo(() => {
    if (!activeTag && !query) {
      return `총 ${filteredTools.length}개의 도구`;
    }
    
    if (matchedTags.length > 0 && query) {
      const tagNames = matchedTags.slice(0, 2).join(", ");
      if (matchedTags.length === 1 && query.toLowerCase() !== matchedTags[0].toLowerCase()) {
        return `'${query}' 검색을 '${tagNames}' 작업으로 해석했어요`;
      }
      return `'${tagNames}'에 맞는 도구를 찾았어요`;
    }
    
    if (activeTag) {
      return `'${activeTag}'과 관련된 도구를 보여드려요`;
    }
    
    if (query) {
      return `'${query}' 검색 결과`;
    }
    
    return `총 ${filteredTools.length}개의 도구`;
  }, [activeTag, query, matchedTags, filteredTools.length]);

  // 추천 태그 (빈 결과일 때)
  const suggestedTags = useMemo(() => {
    if (filteredTools.length > 0) return [];
    return TASK_TAGS.slice(0, 5);
  }, [filteredTools.length]);

  const hasFilters = activeTag || query || sortBy !== "recommended";

  return (
    <div className="space-y-6 pt-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">원하는 작업에 맞는 AI 도구 찾기</h1>
        <p className="mt-2 text-[var(--muted)]">
          작업 태그를 선택하거나 검색어를 입력해 필요한 도구를 찾아보세요.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-lg">
        <input
          className="input pl-10 pr-10"
          type="search"
          value={query}
          onChange={(e) => updateParams({ q: e.target.value })}
          placeholder="예: 발표자료, 논문 요약, 코딩, 자막 만들기"
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
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm text-[var(--muted)]">
            {resultMessage} · {filteredTools.length}개
          </p>
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
          <span className="text-sm text-[var(--muted)]">정렬:</span>
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
        <div className="card p-8 text-center">
          <h2 className="text-lg font-bold">조건에 맞는 도구를 찾지 못했어요</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            다른 작업 태그를 선택하거나 검색어를 바꿔보세요.
          </p>
          
          {suggestedTags.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-medium text-[var(--muted)]">이 태그도 함께 살펴보세요</p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
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
