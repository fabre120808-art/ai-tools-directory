import Link from "next/link";
import type { ToolRecord } from "@/lib/tool-types";

export function ToolCard({ tool }: { tool: ToolRecord }) {
  return (
    <article className="group flex h-full flex-col rounded-xl border border-[var(--line)] bg-white p-5 transition-colors hover:border-[var(--accent)]">
      <div className="flex-1">
        <div className="mb-3 flex items-start justify-between gap-3">
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

        <p className="text-sm leading-relaxed text-[var(--foreground)]">{tool.summary}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          <span className="rounded-md bg-[var(--accent)] px-2.5 py-1 text-xs font-semibold text-[var(--accent-strong)]">
            {tool.primaryTag}
          </span>
          {tool.secondaryTags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1 text-xs text-[var(--muted)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-4 text-sm text-[var(--muted)]">
          추천 상황: {tool.bestFor[0] ?? "빠르게 도입해 볼 수 있는 범용 작업"}
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-[var(--line)] pt-4">
        <a
          href={tool.officialUrl}
          target="_blank"
          rel="noreferrer"
          className="button-secondary"
        >
          공식 사이트
        </a>
        <Link
          href={`/tools/${tool.slug}`}
          className="text-sm font-medium text-[var(--foreground)] underline-offset-2 hover:underline"
        >
          자세히 보기
        </Link>
      </div>
    </article>
  );
}
