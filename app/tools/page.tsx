"use client";

import { useMemo, useState } from "react";
import { ToolCard } from "@/components/tool-card";
import { tools } from "@/data/tools";

export default function ToolsPage() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string>("All");

  const tags = useMemo(() => {
    const tagSet = new Set<string>();

    tools.forEach((tool) => {
      tagSet.add(tool.primaryTag);
      tool.secondaryTags.forEach((tag) => tagSet.add(tag));
    });

    return ["All", ...Array.from(tagSet)];
  }, []);

  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return tools.filter((tool) => {
      const matchesTag =
        activeTag === "All" ||
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
    <div className="space-y-8 pt-6">
      <section className="card rounded-[36px] px-6 py-10 md:px-10">
        <span className="eyebrow">Tool List</span>
        <h1 className="mt-4 text-5xl font-black tracking-[-0.08em]">Explore AI tools</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">
          Browse the starter catalog by category, pricing, and overall fit. This
          MVP uses local sample data, so you can later replace it with an API,
          database, or CMS without changing the page structure.
        </p>
        <div className="mt-8">
          <label className="block">
            <span className="mb-3 block text-sm font-semibold">Search tools</span>
            <input
              className="input"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by tool name, tag, or best-for use case"
            />
          </label>
        </div>
        <div className="mt-6">
          <p className="text-sm font-semibold">Task tags</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {tags.map((tag) => {
              const isActive = activeTag === tag;

              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(tag)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-[var(--accent)] text-white"
                      : "border border-[var(--line)] bg-white/70 text-[var(--muted)]"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="flex items-center justify-between gap-4">
        <p className="text-sm text-[var(--muted)]">
          {filteredTools.length} tool{filteredTools.length === 1 ? "" : "s"} found
        </p>
        {activeTag !== "All" ? (
          <button
            type="button"
            onClick={() => setActiveTag("All")}
            className="text-sm font-semibold text-[var(--accent-strong)]"
          >
            Clear tag filter
          </button>
        ) : null}
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredTools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
        {filteredTools.length === 0 ? (
          <div className="card rounded-[28px] p-8 md:col-span-2 xl:col-span-3">
            <h2 className="text-2xl font-black tracking-[-0.05em]">No tools matched</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              Try a different keyword or switch to another task tag.
            </p>
          </div>
        ) : null}
      </section>
    </div>
  );
}
