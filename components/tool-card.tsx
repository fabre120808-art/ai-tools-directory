import Link from "next/link";
import type { Tool } from "@/data/tools";

function PricingBadge({ pricing }: { pricing: string }) {
  const config: Record<string, { label: string; className: string }> = {
    Free: { label: "무료", className: "bg-emerald-100 text-emerald-700" },
    Freemium: { label: "부분 무료", className: "bg-blue-100 text-blue-700" },
    Paid: { label: "유료", className: "bg-amber-100 text-amber-700" },
    "Paid Add-on": { label: "유료 애드온", className: "bg-orange-100 text-orange-700" },
  };
  const { label, className } = config[pricing] || { label: pricing, className: "bg-gray-100 text-gray-700" };
  
  return (
    <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}

function KoreanSupportBadge({ support }: { support: string }) {
  if (support === "지원") {
    return (
      <span className="rounded-md bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
        한국어
      </span>
    );
  }
  if (support === "제한적") {
    return (
      <span className="rounded-md bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">
        한국어 제한
      </span>
    );
  }
  return null;
}

function PlatformBadge({ platforms }: { platforms: string[] }) {
  const label = platforms.slice(0, 2).join(", ");
  return (
    <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
      {label}
    </span>
  );
}

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <article className="card flex h-full flex-col p-5 transition-shadow hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-[var(--foreground)]">{tool.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-[var(--muted)]">
            {tool.summary}
          </p>
        </div>
      </div>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        <span className="rounded-md bg-[var(--accent-soft)] px-2 py-1 text-xs font-semibold text-[var(--accent)]">
          {tool.primaryTag}
        </span>
        {tool.secondaryTags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-[var(--line)] px-2 py-1 text-xs text-[var(--muted)]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Best For (한 줄) */}
      {tool.bestFor.length > 0 && (
        <div className="mt-4 rounded-lg bg-[var(--background)] px-3 py-2 text-xs text-[var(--muted)]">
          추천: {tool.bestFor[0]}
        </div>
      )}

      {/* Badges */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        <PricingBadge pricing={tool.pricing} />
        <KoreanSupportBadge support={tool.koreanSupport} />
        <PlatformBadge platforms={tool.platform} />
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-end gap-2 border-t border-[var(--line)] pt-4 mt-4">
        <Link
          href={`/tools/${tool.slug}`}
          className="rounded-md border border-[var(--line)] px-3 py-1.5 text-xs font-medium text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          상세 보기
        </Link>
        <a
          href={tool.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-md bg-[var(--accent)] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[var(--accent-strong)]"
        >
          공식 사이트 가기
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </article>
  );
}
