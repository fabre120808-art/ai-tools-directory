import Link from "next/link";
import { ToolCard } from "@/components/tool-card";
import { tools, TASK_TAGS } from "@/data/tools";

const featuredTools = tools.slice(0, 6);
const quickTags = TASK_TAGS.slice(0, 8);

const steps = [
  {
    num: "01",
    title: "작업으로 시작하기",
    description: "PPT 정리, 자료 요약처럼 손이 가는 작업을 기준으로 도구를 좁혀보세요."
  },
  {
    num: "02",
    title: "비교하고 고르기",
    description: "태그와 추천 상황을 보며 지금 필요한 도구를 찾아보세요."
  },
  {
    num: "03",
    title: "바로 써보기",
    description: "마음에 드는 도구가 있다면 공식 사이트로 이어서 확인할 수 있어요."
  }
];

export default function HomePage() {
  return (
    <div className="space-y-16 py-12">
      {/* Hero Section */}
      <section className="space-y-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] md:text-5xl">
            자주 마주치는 작업부터,
            <br />
            <span className="text-[var(--accent)]">나에게 맞는 도구를</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[var(--muted)]">
            PPT 정리, 자료 요약, 코드 초안처럼 손이 많이 가는 일을 중심으로 살펴보세요.
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="max-w-lg">
          <Link href="/tools" className="group block">
            <div className="input flex items-center gap-3 text-[var(--muted)] transition-colors group-hover:border-[var(--accent)]">
              <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-sm">PPT 제작, 논문 요약, 코드 작성, 발표자료 만들기</span>
            </div>
          </Link>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-3">
          <Link href="/tools" className="button-primary">
            작업부터 살펴보기
          </Link>
          <Link href="/tools" className="button-secondary">
            전체 도구 보기
          </Link>
        </div>
      </section>

      {/* Quick Tags */}
      <section className="space-y-5">
        <h2 className="text-sm font-medium text-[var(--muted)]">먼저 살펴보기 좋은 작업</h2>
        <div className="flex flex-wrap gap-2">
          {quickTags.map((tag) => (
            <Link
              key={tag}
              href={`/tools?tag=${encodeURIComponent(tag)}`}
              className="rounded-lg border border-[var(--line)] bg-[var(--card)] px-4 py-2.5 text-sm font-medium text-[var(--muted)] transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {tag}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Tools */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight">눈여겨볼 만한 도구</h2>
          <Link
            href="/tools"
            className="text-sm font-medium text-[var(--accent)] hover:underline"
          >
            전체 보기
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight">처음이라면 이렇게 둘러보세요</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.num} className="card p-6">
              <span className="text-xs font-bold text-[var(--accent)]">{step.num}</span>
              <h3 className="mt-3 text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="card p-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight">
          함께 채워가는 도구 목록
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[var(--muted)]">
          더해지면 좋을 도구가 있다면 알려주세요. 검토 후 목록에 반영합니다.
        </p>
        <div className="mt-6">
          <Link href="/submit" className="button-primary">
            도구 알려주기
          </Link>
        </div>
      </section>
    </div>
  );
}
