import Link from "next/link";
import { notFound } from "next/navigation";
import { getToolBySlug, tools } from "@/data/tools";

export function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug
  }));
}

export default async function ToolDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const quickStartSteps = [
    `${tool.name} 공식 사이트에서 계정을 만드세요.`,
    `${tool.primaryTag} 기능부터 간단히 테스트해보세요.`,
    `실제 작업에 적용해보고 기존 방식과 비교해보세요.`
  ];

  const goodWhenList = [
    `${tool.primaryTag} 작업을 빠르게 시작하고 싶을 때`,
    tool.secondaryTags.length > 0
      ? `${tool.secondaryTags.slice(0, 2).join(", ")} 관련 작업을 할 때`
      : "다양한 작업을 하나의 도구로 처리하고 싶을 때",
    tool.pricing === "Free" || tool.pricing === "Freemium"
      ? "무료로 먼저 테스트해보고 싶을 때"
      : "전문적인 기능이 필요할 때"
  ];

  return (
    <div className="space-y-6 pt-8">
      {/* Back Link */}
      <Link
        href="/tools"
        className="inline-flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        전체 도구
      </Link>

      {/* Header */}
      <div className="card p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-[var(--accent-soft)] px-2 py-1 text-xs font-semibold text-[var(--accent)]">
            {tool.primaryTag}
          </span>
          <span className="text-sm text-[var(--muted)]">{tool.pricing}</span>
          <span className="text-sm text-[var(--muted)]">한국어: {tool.koreanSupport}</span>
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">{tool.name}</h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-[var(--muted)]">{tool.summary}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={tool.officialUrl}
            target="_blank"
            rel="noreferrer"
            className="button-primary"
          >
            공식 사이트
          </a>
          <Link href="/tools" className="button-secondary">
            목록으로
          </Link>
        </div>
      </div>

      {/* Tags Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="card p-5">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
            Primary Tag
          </h2>
          <p className="mt-2 text-lg font-bold">{tool.primaryTag}</p>
        </div>
        <div className="card p-5">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
            Secondary Tags
          </h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {tool.secondaryTags.length > 0 ? (
              tool.secondaryTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-[var(--line)] px-2 py-1 text-sm"
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-sm text-[var(--muted)]">-</span>
            )}
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="card p-5">
          <h2 className="text-lg font-bold">이런 상황에 좋아요</h2>
          <ul className="mt-4 space-y-2">
            {tool.bestFor.map((item) => (
              <li
                key={item}
                className="rounded-lg bg-[var(--background)] px-4 py-3 text-sm text-[var(--muted)]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-5">
          <h2 className="text-lg font-bold">추천 타이밍</h2>
          <ul className="mt-4 space-y-2">
            {goodWhenList.map((item) => (
              <li
                key={item}
                className="rounded-lg bg-[var(--background)] px-4 py-3 text-sm text-[var(--muted)]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Quick Start & Info */}
      <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
        <div className="card p-5">
          <h2 className="text-lg font-bold">빠른 시작 가이드</h2>
          <ol className="mt-4 space-y-3">
            {quickStartSteps.map((step, index) => (
              <li key={step} className="rounded-lg bg-[var(--background)] p-4">
                <span className="text-xs font-bold text-[var(--accent)]">
                  Step {index + 1}
                </span>
                <p className="mt-1 text-sm text-[var(--muted)]">{step}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="card p-5">
          <h2 className="text-lg font-bold">기본 정보</h2>
          <div className="mt-4 space-y-3 text-sm">
            <div className="rounded-lg bg-[var(--background)] p-3">
              <p className="font-medium">가격</p>
              <p className="mt-1 text-[var(--muted)]">{tool.pricing}</p>
            </div>
            <div className="rounded-lg bg-[var(--background)] p-3">
              <p className="font-medium">한국어 지원</p>
              <p className="mt-1 text-[var(--muted)]">{tool.koreanSupport}</p>
            </div>
            <div className="rounded-lg bg-[var(--background)] p-3">
              <p className="font-medium">플랫폼</p>
              <p className="mt-1 text-[var(--muted)]">{tool.platform.join(", ")}</p>
            </div>
            <div className="rounded-lg bg-[var(--background)] p-3">
              <p className="font-medium">공식 URL</p>
              <a
                href={tool.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-1 block break-all text-[var(--accent)] hover:underline"
              >
                {tool.officialUrl}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
