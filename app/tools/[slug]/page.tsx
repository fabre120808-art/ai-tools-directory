import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublicToolBySlug, getPublicToolSlugs } from "@/lib/tools-repository";

type ToolDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const slugs = await getPublicToolSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ToolDetailPage({ params }: ToolDetailPageProps) {
  const { slug } = await params;
  const tool = await getPublicToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  return (
    <main className="space-y-6 py-6">
      <nav className="text-sm text-[var(--muted)]" aria-label="breadcrumb">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/">홈</Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/tools">툴 찾기</Link>
          </li>
          <li>/</li>
          <li className="text-[var(--foreground)]">{tool.name}</li>
        </ol>
      </nav>

      <section className="border-b border-[var(--line)] pb-6">
        <Link href="/tools" className="mb-4 inline-flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--foreground)]">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          툴 목록으로
        </Link>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{tool.name}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
              {tool.description || tool.summary}
            </p>
          </div>
          <a
            href={tool.officialUrl}
            target="_blank"
            rel="noreferrer"
            className="button-primary shrink-0"
          >
            공식 사이트
          </a>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={`/tools?tag=all&q=${encodeURIComponent(tool.primaryTag)}&sort=recommended`}
            className="rounded-md bg-[var(--accent)] px-3 py-1 text-sm font-medium text-[var(--accent-strong)]"
          >
            {tool.primaryTag}
          </Link>
          {tool.secondaryTags.map((tag) => (
            <Link
              key={tag}
              href={`/tools?q=${encodeURIComponent(tag)}&sort=recommended`}
              className="rounded-md border border-[var(--line)] px-3 py-1 text-sm text-[var(--muted)]"
            >
              {tag}
            </Link>
          ))}
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-xl border border-[var(--line)] bg-white p-5">
          <h2 className="text-lg font-bold">이 도구가 잘하는 작업</h2>
          <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
            {tool.bestFor.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--accent-strong)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-[var(--line)] bg-white p-5">
          <h2 className="text-lg font-bold">이럴 때 쓰면 좋음</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            {tool.summary}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            대표 태그는 <strong className="text-[var(--foreground)]">{tool.primaryTag}</strong>이며,
            {tool.secondaryTags.length > 0
              ? ` 함께 자주 보는 작업 태그는 ${tool.secondaryTags.join(", ")}입니다.`
              : " 다른 보조 태그 없이 단일 작업에 초점을 둔 도구입니다."}
          </p>
        </section>
      </div>

      <section className="rounded-xl border border-[var(--line)] bg-white p-5">
        <h2 className="text-lg font-bold">빠르게 시작하는 방법</h2>
        <ol className="mt-4 space-y-3">
          {tool.quickStart.map((step, index) => (
            <li key={step} className="flex gap-3 text-sm">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-[var(--accent-strong)]">
                {index + 1}
              </span>
              <p className="pt-0.5 leading-relaxed text-[var(--muted)]">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-xl border border-[var(--line)] bg-white p-5">
        <h2 className="text-lg font-bold">기본 정보</h2>
        <dl className="mt-4 grid gap-3 text-sm md:grid-cols-2">
          <div className="rounded-lg bg-[var(--surface)] p-4">
            <dt className="text-[var(--muted)]">가격</dt>
            <dd className="mt-1 font-medium">{tool.pricing}</dd>
          </div>
          <div className="rounded-lg bg-[var(--surface)] p-4">
            <dt className="text-[var(--muted)]">한국어 지원</dt>
            <dd className="mt-1 font-medium">{tool.koreanSupport ? "지원" : "제한적"}</dd>
          </div>
          <div className="rounded-lg bg-[var(--surface)] p-4">
            <dt className="text-[var(--muted)]">플랫폼</dt>
            <dd className="mt-1 font-medium">{tool.platform}</dd>
          </div>
          <div className="rounded-lg bg-[var(--surface)] p-4">
            <dt className="text-[var(--muted)]">공식 링크</dt>
            <dd className="mt-1 font-medium break-all">
              <a href={tool.officialUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2">
                {tool.officialUrl}
              </a>
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-xl border border-[var(--line)] bg-[var(--surface)] px-6 py-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-bold">다른 도구도 함께 찾아보세요</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              비슷한 작업 태그나 전체 목록으로 돌아가 다른 도구와 비교해 볼 수 있습니다.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={`/tools?tag=all&q=${encodeURIComponent(tool.primaryTag)}&sort=recommended`} className="button-secondary">
              비슷한 태그 보기
            </Link>
            <Link href="/tools" className="button-primary">
              전체 툴 보기
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
