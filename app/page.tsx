import Link from "next/link";
import { ToolCard } from "@/components/tool-card";
import { tools } from "@/data/tools";

const featuredTools = tools.slice(0, 6);
const popularTags = ["Writing", "Coding", "Research", "Image", "Video", "Productivity"];

const steps = [
  {
    title: "Search by task",
    description: "원하는 작업이나 고민을 검색해서 관련 툴을 빠르게 좁혀보세요."
  },
  {
    title: "Compare fit",
    description: "태그, 추천 상황, 가격 정보를 보고 지금 필요한 툴만 골라보세요."
  },
  {
    title: "Visit official site",
    description: "마음에 드는 툴은 공식 사이트로 바로 이동해서 직접 사용해보면 됩니다."
  }
];

export default function HomePage() {
  return (
    <div className="space-y-8 pt-6">
      <section className="card rounded-[36px] px-6 py-10 md:px-10 md:py-14">
        <span className="eyebrow">AI Tool Directory</span>
        <h1 className="mt-4 max-w-4xl text-5xl font-black tracking-[-0.08em] md:text-7xl">
          필요한 작업에 맞는 AI 툴을 빠르게 찾는 가벼운 디렉토리
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)] md:text-lg">
          검색하고, 태그로 좁히고, 추천 툴을 비교한 뒤 공식 사이트로 바로 이동해보세요.
        </p>
        <div className="mt-8 max-w-2xl">
          <label className="block">
            <span className="mb-3 block text-sm font-semibold">Search tools</span>
            <input
              className="input"
              type="search"
              placeholder="예: 블로그 글쓰기, 코드 리뷰, 이미지 생성"
            />
          </label>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {popularTags.map((tag) => (
            <Link
              key={tag}
              href="/tools"
              className="rounded-full border border-[var(--line)] bg-white/70 px-4 py-2 text-sm font-semibold text-[var(--muted)] transition hover:bg-white"
            >
              {tag}
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="eyebrow">Recommended</span>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.06em]">추천 툴 6개</h2>
          </div>
          <Link href="/tools" className="text-sm font-semibold text-[var(--accent-strong)]">
            See all tools
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      <section className="card rounded-[36px] px-6 py-10 md:px-10">
        <span className="eyebrow">How It Works</span>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="rounded-[28px] bg-white/55 p-6">
              <p className="text-sm font-semibold text-[var(--accent-strong)]">Step {index + 1}</p>
              <h3 className="mt-3 text-2xl font-black tracking-[-0.05em]">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card rounded-[36px] px-6 py-10 text-center md:px-10">
        <span className="eyebrow">Submit A Tool</span>
        <h2 className="mt-4 text-4xl font-black tracking-[-0.06em]">
          좋은 툴이 있다면 디렉토리에 제보해주세요
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">
          아직 없는 AI 툴이나 꼭 넣고 싶은 서비스를 추천해주시면 다음 업데이트에 반영하기 쉬워집니다.
        </p>
        <div className="mt-8">
          <Link href="/submit" className="button-primary">
            툴 제보하러 가기
          </Link>
        </div>
      </section>
    </div>
  );
}
