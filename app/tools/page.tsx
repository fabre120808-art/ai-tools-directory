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
    <main className="space-y-6 pt-6">
      <section className="card rounded-[36px] px-6 py-10 md:px-10">
        <span className="eyebrow">Tool Finder</span>
        <h1 className="mt-4 text-5xl font-black tracking-[-0.08em]">Find AI tools by task</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">
          Search with a keyword, narrow by task tag, and sort by recommendation or name.
        </p>

        <form className="mt-8 grid gap-3 md:grid-cols-[1fr_auto]">
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Try presentation, summarize PDF, subtitle video, or coding"
            className="input"
          />
          <input type="hidden" name="tag" value={safeTag} />
          <button className="button-primary border-0" type="submit">
            Search
          </button>
        </form>
      </section>

      <div className="flex flex-wrap gap-2">
        <a
          href={`/tools?tag=all&q=${encodeURIComponent(q)}&sort=${safeSort}`}
          className={
            safeTag === "all"
              ? "rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white"
              : "rounded-full border border-[var(--line)] px-4 py-2 text-sm font-semibold text-[var(--muted)]"
          }
        >
          All
        </a>

        {visibleTags.map((tagItem) => (
          <a
            key={tagItem.slug}
            href={`/tools?tag=${tagItem.slug}&q=${encodeURIComponent(q)}&sort=${safeSort}`}
            className={
              safeTag === tagItem.slug
                ? "rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white"
                : "rounded-full border border-[var(--line)] px-4 py-2 text-sm font-semibold text-[var(--muted)]"
            }
          >
            {tagItem.label} ({tagItem.count})
          </a>
        ))}
      </div>

      <div className="flex items-center justify-between gap-4 text-sm text-[var(--muted)]">
        <p>{filteredTools.length} results</p>
        <div className="flex gap-3">
          <a
            href={`/tools?tag=${safeTag}&q=${encodeURIComponent(q)}&sort=recommended`}
            className={safeSort === "recommended" ? "font-semibold text-[var(--accent-strong)]" : ""}
          >
            Recommended
          </a>
          <a
            href={`/tools?tag=${safeTag}&q=${encodeURIComponent(q)}&sort=name`}
            className={safeSort === "name" ? "font-semibold text-[var(--accent-strong)]" : ""}
          >
            Name
          </a>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredTools.map((tool) => (
          <article key={tool.slug} className="card rounded-[28px] p-5">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">{tool.name}</h2>
                <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{tool.summary}</p>
              </div>
              <a
                href={tool.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 rounded-lg border border-[var(--line)] px-3 py-2 text-sm"
              >
                Official site
              </a>
            </div>

            <div className="mb-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent-strong)]">
                {tool.primaryTag}
              </span>
              {tool.secondaryTags.slice(0, 3).map((item) => (
                <span key={item} className="rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--muted)]">
                  {item}
                </span>
              ))}
            </div>

            <p className="mb-4 text-sm leading-6 text-[var(--muted)]">{tool.bestFor}</p>

            <Link href={`/tools/${tool.slug}`} className="inline-flex rounded-lg bg-[var(--accent)] px-3 py-2 text-sm text-white">
              View details
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
