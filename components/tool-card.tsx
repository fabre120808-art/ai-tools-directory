import Link from "next/link";
import type { Tool } from "@/data/tools";

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <article className="group flex h-full flex-col rounded-xl border border-[var(--line)] bg-white p-5 transition-colors hover:border-[var(--accent)]">
      <div className="flex-1">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-bold">{tool.name}</h3>
          <a
            href={tool.officialUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full p-1 text-[var(--muted)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--foreground)]"
            aria-label={`${tool.name} 공식 사이트 방문`}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
        <p className="text-sm text-[var(--muted)]">{tool.primaryTag}</p>
        <p className="mt-3 text-sm leading-relaxed text-[var(--foreground)]">{tool.summary}</p>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-[var(--line)] pt-4">
        <div className="flex flex-wrap gap-1.5">
          {tool.secondaryTags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded bg-[var(--surface)] px-2 py-0.5 text-xs text-[var(--muted)]"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={`/tools/${tool.slug}`}
          className="text-sm font-medium text-[var(--foreground)] underline-offset-2 hover:underline"
        >
          자세히
        </Link>
      </div>
    </article>
  );
}
