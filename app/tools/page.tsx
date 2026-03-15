import Link from "next/link";
import { getTagCounts, isTaskTagSlug } from "@/lib/tags";
import { filterTools } from "@/lib/filter-tools";
import { listPublicTools } from "@/lib/tools-repository";

type ToolsPageProps = {
  searchParams: Promise<{
    q?: string;
    tag?: string;
    sort?: "recommended" | "name";
  }>;
};

export const dynamic = "force-dynamic";

export default async function ToolsPage({ searchParams }: ToolsPageProps) {
  const { q = "", tag = "all", sort = "recommended" } = await searchParams;

  const safeTag = tag !== "all" && isTaskTagSlug(tag) ? tag : "all";
  const safeSort = sort === "name" ? "name" : "recommended";

  const allTools = await listPublicTools();
  const visibleTags = getTagCounts(allTools).filter((item) => item.count > 0);
  const filteredTools = filterTools(allTools, {
    query: q,
    tagSlug: safeTag,
    sort: safeSort
  });

  return (
    <main className="space-y-6 py-6">
      <nav className="text-sm text-[var(--muted)]" aria-label="breadcrumb">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/">홈</Link>
          </li>
          <li>/</li>
          <li className="text-[var(--foreground)]">툴 찾기</li>
        </ol>
      </nav>

      <section className="border-b border-[var(--line)] pb-6">
        <h1 className="text-2xl font-bold tracking-[-0.03em]">AI 툴 찾기</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          작업 태그와 검색으로 지금 필요한 AI 도구를 빠르게 좁혀보세요.
        </p>

        <form className="mt-5 flex gap-2">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="예: 이미지 생성, 코드 작성, 자막 생성"
              className="input w-full pl-10"
            />
          </div>
          <input type="hidden" name="tag" value={safeTag} />
          <button className="button-primary" type="submit">
            검색
          </button>
        </form>
      </section>

      <div className="flex flex-wrap gap-2">
        <Link
          href={`/tools?tag=all&q=${encodeURIComponent(q)}&sort=${safeSort}`}
          className={
            safeTag === "all"
              ? "rounded-md bg-[var(--accent-strong)] px-3 py-1.5 text-sm font-medium text-white"
              : "rounded-md border border-[var(--line)] px-3 py-1.5 text-sm font-medium text-[var(--muted)] hover:border-[var(--foreground)]"
          }
        >
          전체
        </Link>

        {visibleTags.map((tagItem) => (
          <Link
            key={tagItem.slug}
            href={`/tools?tag=${tagItem.slug}&q=${encodeURIComponent(q)}&sort=${safeSort}`}
            className={
              safeTag === tagItem.slug
                ? "rounded-md bg-[var(--accent-strong)] px-3 py-1.5 text-sm font-medium text-white"
                : "rounded-md border border-[var(--line)] px-3 py-1.5 text-sm font-medium text-[var(--muted)] hover:border-[var(--foreground)]"
            }
          >
            {tagItem.label} ({tagItem.count})
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-between gap-4 text-sm text-[var(--muted)]">
        <p>{filteredTools.length}개 결과</p>
        <div className="flex gap-3">
          <Link
            href={`/tools?tag=${safeTag}&q=${encodeURIComponent(q)}&sort=recommended`}
            className={safeSort === "recommended" ? "font-semibold text-[var(--foreground)]" : ""}
          >
            추천순
          </Link>
          <Link
            href={`/tools?tag=${safeTag}&q=${encodeURIComponent(q)}&sort=name`}
            className={safeSort === "name" ? "font-semibold text-[var(--foreground)]" : ""}
          >
            이름순
          </Link>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredTools.map((tool) => (
          <article key={tool.id} className="group flex flex-col rounded-xl border border-[var(--line)] bg-white p-5 transition-colors hover:border-[var(--accent)]">
            <div className="flex-1">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-lg font-bold">{tool.name}</h2>
                <svg className="h-5 w-5 text-[var(--muted)] transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <p className="text-sm leading-relaxed">{tool.summary}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                <span className="rounded-md bg-[var(--accent)] px-2.5 py-1 text-xs font-semibold text-[var(--accent-strong)]">
                  {tool.primaryTag}
                </span>
                {tool.secondaryTags.slice(0, 3).map((item) => (
                  <span key={item} className="rounded-md border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1 text-xs text-[var(--muted)]">
                    {item}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm text-[var(--muted)]">
                추천 상황: {tool.bestFor[0] ?? "빠르게 시작할 수 있는 기본 작업"}
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
              <Link href={`/tools/${tool.slug}`} className="text-sm font-medium underline-offset-2 hover:underline">
                자세히 보기
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-xl border border-[var(--line)] bg-[var(--surface)] px-6 py-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-bold">원하는 도구가 아직 없나요?</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              찾는 툴이 보이지 않으면 제보 페이지에서 알려 주세요.
            </p>
          </div>
          <Link href="/submit" className="button-primary">
            툴 제보하러 가기
          </Link>
        </div>
      </section>
    </main>
  );
}
