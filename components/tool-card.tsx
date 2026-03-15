import Link from "next/link";
import type { Tool } from "@/data/tools";

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <article className="card flex h-full flex-col rounded-[28px] p-5">
      <div>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent-strong)]">
            {tool.primaryTag}
          </span>
          {tool.secondaryTags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--muted)]"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-black tracking-[-0.05em]">{tool.name}</h3>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{tool.summary}</p>
        <p className="mt-4 rounded-2xl bg-white/60 px-4 py-3 text-sm leading-6 text-[var(--muted)]">
          {tool.bestFor}
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-[var(--line)] pt-4">
        <Link href={`/tools/${tool.slug}`} className="text-sm font-semibold text-[var(--accent-strong)]">
          상세 보기
        </Link>
        <a
          href={tool.officialUrl}
          target="_blank"
          rel="noreferrer"
          className="button-primary border-0 px-4 py-2 text-sm"
        >
          공식 사이트
        </a>
      </div>
    </article>
  );
}
