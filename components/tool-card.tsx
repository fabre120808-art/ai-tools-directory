import Link from "next/link";
import type { Tool } from "@/data/tools";

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <article className="card flex h-full flex-col p-5 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-[var(--accent-soft)] px-2 py-1 text-xs font-semibold text-[var(--accent)]">
              {tool.primaryTag}
            </span>
            <span className="text-xs text-[var(--muted)]">{tool.pricing}</span>
          </div>
          <h3 className="mt-3 text-lg font-bold text-[var(--foreground)]">{tool.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-[var(--muted)]">
            {tool.summary}
          </p>
        </div>
      </div>

      {/* Secondary Tags */}
      {tool.secondaryTags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tool.secondaryTags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-[var(--line)] px-2 py-1 text-xs text-[var(--muted)]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Best For Preview */}
      <div className="mt-4 space-y-1.5">
        {tool.bestFor.slice(0, 2).map((item) => (
          <div
            key={item}
            className="rounded-lg bg-[var(--background)] px-3 py-2 text-xs text-[var(--muted)]"
          >
            {item}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-[var(--line)] pt-4 mt-4">
        <span className="text-xs text-[var(--muted)]">
          한국어: {tool.koreanSupport}
        </span>
        <div className="flex items-center gap-2">
          <Link
            href={`/tools/${tool.slug}`}
            className="text-xs font-medium text-[var(--muted)] hover:text-[var(--foreground)]"
          >
            상세
          </Link>
          <a
            href={tool.officialUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-md bg-[var(--accent)] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[var(--accent-strong)]"
          >
            바로가기
          </a>
        </div>
      </div>
    </article>
  );
}
