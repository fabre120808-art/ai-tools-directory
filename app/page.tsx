import Link from "next/link";
import { ToolCard } from "@/components/tool-card";
import { tools } from "@/data/tools";
import { getTagsByClicks } from "@/data/tags";

const featuredTools = tools.slice(0, 6);
const quickTags = getTagsByClicks(6);

export default function HomePage() {
  return (
    <div className="space-y-10 py-6">
      <section className="border-b border-[var(--line)] px-2 py-8 md:py-10">
        <h1 className="max-w-3xl text-3xl font-bold tracking-[-0.03em] md:text-4xl">
          지금 딱 필요한 AI 툴을 찾아보세요
        </h1>
        <p className="mt-3 max-w-2xl text-base text-[var(--muted)]">
          하고 싶은 작업으로 검색하고, 태그로 좁히고, 바로 사용해보세요.
        </p>
        <div className="mt-6 max-w-xl">
          <Link href="/tools" className="block">
            <div className="input flex items-center gap-3 rounded-lg border border-[var(--line)] bg-[var(--surface)] text-sm text-[var(--muted)]">
              <svg className="h-4 w-4 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>이미지 생성, 코드 작성, 자막 번역 등</span>
            </div>
          </Link>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {quickTags.map((tag) => (
            <Link
              key={tag.slug}
              href={`/tools?tag=${tag.slug}`}
              className="rounded-md border border-[var(--line)] bg-white px-3 py-1.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]"
            >
              {tag.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-5 px-2">
        <div className="flex items-baseline justify-between gap-4">
          <div className="flex items-baseline gap-4">
            <h2 className="text-2xl font-bold tracking-[-0.03em]">인기 툴</h2>
            <span className="text-sm text-[var(--muted)]">지금 많이 찾는 AI 툴</span>
          </div>
          <Link href="/tools" className="flex items-center gap-1 rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium transition-colors hover:border-[var(--foreground)]">
            전체 보기
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-6 py-8 text-center md:px-10">
        <h2 className="text-xl font-bold tracking-[-0.03em]">
          새로운 AI 툴을 알려주세요
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-[var(--muted)]">
          아직 없는 유용한 AI 툴이 있다면 제보해주세요. 검토 후 추가됩니다.
        </p>
        <div className="mt-5">
          <Link href="/submit" className="button-primary">
            툴 제보하기
          </Link>
        </div>
      </section>
    </div>
  );
}
