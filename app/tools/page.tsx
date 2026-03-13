"use client";

import { useMemo, useState } from "react";
import { ToolCard } from "@/components/tool-card";
import { tools } from "@/data/tools";

export default function ToolsPage() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string>("전체");

  const tags = useMemo(() => {
    const tagSet = new Set<string>();
    tools.forEach((tool) => {
      tagSet.add(tool.primaryTag);
      tool.secondaryTags.forEach((tag) => tagSet.add(tag));
    });
    return ["전체", ...Array.from(tagSet)];
  }, []);

  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return tools.filter((tool) => {
      const matchesTag =
        activeTag === "전체" ||
        tool.primaryTag === activeTag ||
        tool.secondaryTags.includes(activeTag);

      const matchesQuery =
        normalizedQuery.length === 0 ||
        [
          tool.name,
          tool.summary,
          tool.primaryTag,
          ...tool.secondaryTags,
          ...tool.bestFor
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesTag && matchesQuery;
    });
  }, [activeTag, query]);

  return (
    <div className="space-y-6 pt-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">전체 도구</h1>
        <p className="mt-2 text-[var(--muted)]">
          카테고리별로 AI 도구를 탐색하고 필요한 도구를 찾아보세요.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <input
          className="input pl-10"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="도구명, 태그, 용도로 검색"
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
      </div>

      {/* Horizontal Tag Filter */}
      <div className="border-b border-[var(--line)]">
        <div className="tag-scroll">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`tag-item ${activeTag === tag ? "active" : ""}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--muted)]">
          {filteredTools.length}개의 도구
        </p>
        {activeTag !== "전체" && (
          <button
            type="button"
            onClick={() => setActiveTag("전체")}
            className="text-sm font-medium text-[var(--accent)] hover:underline"
          >
            필터 초기화
          </button>
        )}
      </div>

      {/* Tools Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
        {filteredTools.length === 0 && (
          <div className="card col-span-full p-8 text-center">
            <h2 className="text-lg font-bold">일치하는 도구가 없습니다</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              다른 키워드나 태그로 검색해보세요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
