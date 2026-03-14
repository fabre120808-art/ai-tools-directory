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

  // 자연스러운 시작 가이드
  const quickStartSteps = [
    `${tool.name} 공식 사이트에서 계정을 만들어보세요.`,
    `${tool.primaryTag} 관련 기능을 가볍게 테스트해보세요.`,
    `실제 작업에 적용해보며 흐름을 익혀보세요.`
  ];

  // 추천 타이밍 - 상황 중심 문구
  const goodWhenList = [
    `${tool.primaryTag} 작업의 초안을 먼저 잡고 싶을 때`,
    tool.secondaryTags.length > 0
      ? `${tool.secondaryTags.slice(0, 2).join(", ")} 관련 작업을 함께 처리하고 싶을 때`
      : "여러 작업을 하나의 도구로 이어가고 싶을 때",
    tool.pricing === "Free" || tool.pricing === "Freemium"
      ? "부담 없이 먼저 테스트해보고 싶을 때"
      : "전문적인 결과물이 필요할 때"
  ];

  // 비슷한 결의 도구
  const similarTools = tools
    .filter(t => 
      t.slug !== tool.slug && 
      (t.primaryTag === tool.primaryTag || t.secondaryTags.some(tag => tool.secondaryTags.includes(tag)))
    )
    .slice(0, 3);

  return (
    <div className="space-y-8 py-12">
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
      <header className="card p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-[var(--accent-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--accent)]">
            {tool.primaryTag}
          </span>
          {tool.secondaryTags.slice(0, 2).map(tag => (
            <span key={tag} className="rounded-md border border-[var(--line)] px-2 py-1 text-xs text-[var(--muted)]">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="mt-5 text-3xl font-bold tracking-tight">{tool.name}</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">{tool.summary}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={tool.officialUrl}
            target="_blank"
            rel="noreferrer"
            className="button-primary inline-flex items-center gap-2"
          >
            공식 사이트로 이동
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <Link href="/tools" className="button-secondary">
            전체 도구 보기
          </Link>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Left Column */}
        <div className="space-y-6">
          {/* 이 도구가 잘하는 작업 */}
          <section className="card p-6">
            <h2 className="text-lg font-bold">이 도구가 잘하는 작업</h2>
            <ul className="mt-5 space-y-2">
              {tool.bestFor.map((item) => (
                <li
                  key={item}
                  className="rounded-lg bg-[var(--background)] px-4 py-3 text-sm leading-relaxed text-[var(--muted)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* 이런 순간에 잘 맞아요 */}
          <section className="card p-6">
            <h2 className="text-lg font-bold">이런 순간에 잘 맞아요</h2>
            <ul className="mt-5 space-y-2">
              {goodWhenList.map((item) => (
                <li
                  key={item}
                  className="rounded-lg bg-[var(--background)] px-4 py-3 text-sm leading-relaxed text-[var(--muted)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* 가볍게 시작해보기 */}
          <section className="card p-6">
            <h2 className="text-lg font-bold">가볍게 시작해보기</h2>
            <ol className="mt-5 space-y-3">
              {quickStartSteps.map((step, index) => (
                <li key={step} className="rounded-lg bg-[var(--background)] p-4">
                  <span className="text-xs font-bold text-[var(--accent)]">
                    {index + 1}
                  </span>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">{step}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* 기본 정보 */}
          <aside className="card p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--muted)]">기본 정보</h2>
            <div className="mt-5 space-y-4 text-sm">
              <div>
                <p className="font-medium">가격</p>
                <p className="mt-1 text-[var(--muted)]">{tool.pricing}</p>
              </div>
              <div>
                <p className="font-medium">한국어 지원</p>
                <p className="mt-1 text-[var(--muted)]">{tool.koreanSupport}</p>
              </div>
              <div>
                <p className="font-medium">플랫폼</p>
                <p className="mt-1 text-[var(--muted)]">{tool.platform.join(", ")}</p>
              </div>
              <div>
                <p className="font-medium">공식 사이트</p>
                <a
                  href={tool.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block break-all text-sm text-[var(--accent)] hover:underline"
                >
                  {tool.officialUrl.replace(/^https?:\/\//, "")}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* 비슷한 결의 도구 */}
      {similarTools.length > 0 && (
        <section className="space-y-5">
          <h2 className="text-lg font-bold">비슷한 작업에 쓰이는 도구</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {similarTools.map(t => (
              <Link
                key={t.slug}
                href={`/tools/${t.slug}`}
                className="card p-5 transition-shadow hover:shadow-md"
              >
                <h3 className="font-bold">{t.name}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--muted)]">{t.summary}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="rounded-md bg-[var(--accent-soft)] px-2 py-1 text-xs font-semibold text-[var(--accent)]">
                    {t.primaryTag}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="card p-8 text-center">
        <h2 className="text-lg font-bold">이 도구에 대해 더 알고 계신가요?</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          추가 정보나 수정이 필요한 내용이 있다면 알려주세요.
        </p>
        <div className="mt-5">
          <Link href="/submit" className="button-secondary">
            정보 제보하기
          </Link>
        </div>
      </section>
    </div>
  );
}
