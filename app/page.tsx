import Link from "next/link";
import { ToolCard } from "@/components/tool-card";
import { tools } from "@/data/tools";

const featuredTools = tools.slice(0, 6);
const popularTags = ["자료 요약", "이미지 생성", "개발 코드 작성", "본문 글쓰기", "영상 대본", "반복 업무 자동화"];

const steps = [
  {
    num: "01",
    title: "작업별로 검색",
    description: "원하는 작업이나 고민을 검색해서 관련 툴을 빠르게 좁혀보세요."
  },
  {
    num: "02",
    title: "비교하고 선택",
    description: "태그, 추천 상황, 가격 정보를 보고 지금 필요한 툴만 골라보세요."
  },
  {
    num: "03",
    title: "바로 시작",
    description: "마음에 드는 툴은 공식 사이트로 바로 이동해서 직접 사용해보세요."
  }
];

export default function HomePage() {
  return (
    <div className="space-y-12 pt-8">
      {/* Hero Section */}
      <section className="space-y-6">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] md:text-5xl">
            필요한 작업에 맞는
            <br />
            <span className="text-[var(--accent)]">AI 툴</span>을 빠르게 찾아보세요
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">
            검색하고, 태그로 좁히고, 추천 툴을 비교한 뒤 공식 사이트로 바로 이동하세요.
          </p>
        </div>
        
        {/* Quick Tags */}
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Link
              key={tag}
              href="/tools"
              className="rounded-lg border border-[var(--line)] bg-[var(--card)] px-4 py-2 text-sm font-medium text-[var(--muted)] transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {tag}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Tools */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight">추천 도구</h2>
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
        <h2 className="text-xl font-bold tracking-tight">이용 방법</h2>
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
          좋은 툴이 있다면 알려주세요
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[var(--muted)]">
          아직 없는 AI 툴이나 꼭 넣고 싶은 서비스를 추천해주시면 다음 업데이트에 반영합니다.
        </p>
        <div className="mt-6">
          <Link href="/submit" className="button-primary">
            도구 제보하기
          </Link>
        </div>
      </section>
    </div>
  );
}
