import Link from "next/link";
import { ToolCard } from "@/components/tool-card";
import { getTagsByClicks } from "@/lib/tags";
import { listFeaturedPublicTools } from "@/lib/tools-repository";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featuredTools = await listFeaturedPublicTools(6);
  const quickTags = getTagsByClicks(6);

  return (
    <div className="space-y-12 py-6">
      <section className="border-b border-[var(--line)] px-2 py-8 md:py-10">
        <p className="eyebrow">AI Tool Directory</p>
        <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-[-0.03em] md:text-4xl">
          지금 필요한 AI 도구를
          <br />
          작업 기준으로 빠르게 찾아보세요
        </h1>
        <p className="mt-3 max-w-2xl text-base text-[var(--muted)]">
          아이디어 발굴부터 코드 작성까지, 지금 필요한 작업 태그와 검색으로 바로 좁혀볼 수 있습니다.
        </p>

        <form action="/tools" className="mt-6 max-w-xl">
          <label className="input flex items-center gap-3 rounded-lg border border-[var(--line)] bg-[var(--surface)] text-sm text-[var(--muted)]">
            <svg className="h-4 w-4 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              name="q"
              placeholder="예: 이미지 생성, 코드 작성, 자료 요약"
              className="w-full bg-transparent outline-none"
            />
          </label>
        </form>

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

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/tools" className="button-primary">
            전체 툴 보기
          </Link>
          <Link href="/submit" className="button-secondary">
            툴 제보하기
          </Link>
        </div>
      </section>

      <section className="space-y-5 px-2">
        <div className="flex items-baseline justify-between gap-4">
          <div className="flex items-baseline gap-4">
            <h2 className="text-2xl font-bold tracking-[-0.03em]">추천 툴</h2>
            <span className="text-sm text-[var(--muted)]">바로 둘러보기 좋은 대표 도구</span>
          </div>
          <Link
            href="/tools"
            className="flex items-center gap-1 rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium transition-colors hover:border-[var(--foreground)]"
          >
            전체 보기
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-[var(--line)] bg-[var(--surface)] px-6 py-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold tracking-[-0.03em]">인기 작업 태그</h2>
          <Link href="/tools" className="text-sm font-medium underline-offset-2 hover:underline">
            태그로 더 보기
          </Link>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {quickTags.map((tag) => (
            <Link key={tag.slug} href={`/tools?tag=${tag.slug}`} className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm">
              {tag.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-[var(--line)] bg-[var(--surface)] px-6 py-8">
        <h2 className="text-xl font-bold tracking-[-0.03em]">사용 방법</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            { step: "1", title: "작업 기준으로 찾기", body: "검색창이나 인기 태그를 눌러 지금 하려는 작업과 가까운 도구부터 좁혀보세요." },
            { step: "2", title: "요약과 추천 상황 확인", body: "도구마다 한 줄 설명과 추천 상황을 먼저 보고 내 작업에 맞는지 빠르게 판단할 수 있습니다." },
            { step: "3", title: "공식 사이트에서 바로 시작", body: "자세히 보기에서 정보를 확인한 뒤 공식 사이트로 이동해 바로 써볼 수 있습니다." }
          ].map((item) => (
            <div key={item.step} className="rounded-xl border border-[var(--line)] bg-white p-5">
              <span className="eyebrow">{item.step}</span>
              <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-[var(--line)] bg-white px-6 py-8 text-center">
        <h2 className="text-xl font-bold tracking-[-0.03em]">새로운 AI 도구를 제보해 주세요</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-[var(--muted)]">
          아직 등록되지 않은 도구가 있다면 알려 주세요. 검토 후 디렉토리에 반영할 수 있도록 정리하고 있습니다.
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
