import Link from "next/link";
import { extraTools100 } from "@/data/extra-tools-100";
import { tools as baseTools } from "@/data/tools";
import { getTagCounts, isTaskTagSlug } from "@/data/tags";
import { filterTools } from "@/lib/filter-tools";

type ToolsPageProps = {
  searchParams: Promise<{
    q?: string;
    tag?: string;
    sort?: "recommended" | "name";
  }>;
};

export default async function ToolsPage({ searchParams }: ToolsPageProps) {
  const { q = "", tag = "all", sort = "recommended" } = await searchParams;

  const safeTag = tag !== "all" && isTaskTagSlug(tag) ? tag : "all";
  const safeSort = sort === "name" ? "name" : "recommended";

  const allTools = [...baseTools, ...extraTools100];
  const visibleTags = getTagCounts(allTools).filter((item) => item.count > 0);
  const filteredTools = filterTools(allTools, {
    query: q,
    tagSlug: safeTag,
    sort: safeSort
  });

  return (
    <main className="space-y-6 py-6">
      <section className="border-b border-[var(--line)] pb-6">
        <h1 className="text-2xl font-bold tracking-[-0.03em]">AI 툴 찾기</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          원하는 작업을 검색하고, 태그로 필터링하세요.
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
              placeholder="이미지 생성, 코드 작성, 자막 번역 등"
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
        <a
          href={`/tools?tag=all&q=${encodeURIComponent(q)}&sort=${safeSort}`}
          className={
            safeTag === "all"
              ? "rounded-md bg-[var(--accent-strong)] px-3 py-1.5 text-sm font-medium text-white"
              : "rounded-md border border-[var(--line)] px-3 py-1.5 text-sm font-medium text-[var(--muted)] hover:border-[var(--foreground)]"
          }
        >
          전체
        </a>

        {visibleTags.map((tagItem) => (
          <a
            key={tagItem.slug}
            href={`/tools?tag=${tagItem.slug}&q=${encodeURIComponent(q)}&sort=${safeSort}`}
            className={
              safeTag === tagItem.slug
                ? "rounded-md bg-[var(--accent-strong)] px-3 py-1.5 text-sm font-medium text-white"
                : "rounded-md border border-[var(--line)] px-3 py-1.5 text-sm font-medium text-[var(--muted)] hover:border-[var(--foreground)]"
            }
          >
            {tagItem.label} ({tagItem.count})
          </a>
        ))}
      </div>

      <div className="flex items-center justify-between gap-4 text-sm text-[var(--muted)]">
        <p>{filteredTools.length}개 결과</p>
        <div className="flex gap-3">
          <a
            href={`/tools?tag=${safeTag}&q=${encodeURIComponent(q)}&sort=recommended`}
            className={safeSort === "recommended" ? "font-semibold text-[var(--foreground)]" : ""}
          >
            추천순
          </a>
          <a
            href={`/tools?tag=${safeTag}&q=${encodeURIComponent(q)}&sort=name`}
            className={safeSort === "name" ? "font-semibold text-[var(--foreground)]" : ""}
          >
            이름순
          </a>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredTools.map((tool) => (
          <article key={tool.slug} className="group flex flex-col rounded-xl border border-[var(--line)] bg-white p-5 transition-colors hover:border-[var(--accent)]">
            <div className="flex-1">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-lg font-bold">{tool.name}</h2>
                <svg className="h-5 w-5 text-[var(--muted)] transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <p className="text-sm text-[var(--muted)]">{tool.primaryTag}</p>
              <p className="mt-3 text-sm leading-relaxed">{tool.summary}</p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-[var(--line)] pt-4">
              <div className="flex flex-wrap gap-1.5">
                {tool.secondaryTags.slice(0, 2).map((item) => (
                  <span key={item} className="rounded bg-[var(--surface)] px-2 py-0.5 text-xs text-[var(--muted)]">
                    {item}
                  </span>
                ))}
              </div>
              <Link href={`/tools/${tool.slug}`} className="text-sm font-medium underline-offset-2 hover:underline">
                자세히
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
