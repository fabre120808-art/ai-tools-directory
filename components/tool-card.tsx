import Link from "next/link";
import type { Tool } from "@/data/tools";

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <article className="card flex h-full flex-col justify-between rounded-[28px] p-6">
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent-strong)]">
            {tool.primaryTag}
          </span>
          <span className="text-sm text-[var(--muted)]">{tool.pricing}</span>
        </div>
        <div>
          <h3 className="text-2xl font-black tracking-[-0.06em]">{tool.name}</h3>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{tool.summary}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {tool.secondaryTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--line)] bg-white/60 px-3 py-1 text-xs font-medium text-[var(--muted)]"
            >
              {tag}
            </span>
          ))}
        </div>
        <div>
          <p className="text-sm font-semibold">추천 상황</p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--muted)]">
            {tool.bestFor.slice(0, 3).map((item) => (
              <li key={item} className="rounded-2xl bg-white/60 px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-8 flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-[var(--muted)]">
          Korean: {tool.koreanSupport}
        </span>
        <div className="flex items-center gap-3">
          <Link
            href={`/tools/${tool.slug}`}
            className="text-sm font-semibold text-[var(--accent-strong)]"
          >
            Details
          </Link>
          <a
            href={tool.officialUrl}
            target="_blank"
            rel="noreferrer"
            className="button-primary border-0 px-4 py-2 text-sm"
          >
            Official site
          </a>
        </div>
      </div>
    </article>
  );
}
