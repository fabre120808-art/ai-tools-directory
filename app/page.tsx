import Link from "next/link";
import { ToolCard } from "@/components/tool-card";
import { tools } from "@/data/tools";
import { getTagsByClicks } from "@/data/tags";

const featuredTools = tools.slice(0, 6);
const quickTags = getTagsByClicks(6);

const steps = [
  {
    title: "작업으로 검색",
    description: "툴 이름 대신, 하고 싶은 작업으로 바로 검색하세요."
  },
  {
    title: "비교해서 선택",
    description: "태그와 설명을 보고 딱 맞는 툴을 고르세요."
  },
  {
    title: "바로 사용",
    description: "공식 사이트로 이동해서 바로 시작하세요."
  }
];

export default function HomePage() {
  return (
    <div className="space-y-8 pt-6">
      <section className="card rounded-[36px] px-6 py-10 md:px-10 md:py-14">
        <span className="eyebrow">All In AI</span>
        <h1 className="mt-4 max-w-4xl text-5xl font-black tracking-[-0.08em] md:text-7xl">
          지금 딱 필요한 AI 툴을 찾아보세요
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)] md:text-lg">
          하고 싶은 작업으로 검색하고, 태그로 좁히고, 바로 사용해보세요.
        </p>
        <div className="mt-8 max-w-2xl">
          <Link href="/tools" className="block">
            <div className="input flex items-center gap-3 text-sm text-[var(--muted)]">
              <span>이미지 생성, 코드 작성, 자막 번역 등 원하는 작업을 검색하세요</span>
            </div>
          </Link>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {quickTags.map((tag) => (
            <Link
              key={tag.slug}
              href={`/tools?tag=${tag.slug}`}
              className="rounded-full border border-[var(--line)] bg-white/70 px-4 py-2 text-sm font-semibold text-[var(--muted)]"
            >
              {tag.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="eyebrow">인기 툴</span>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.06em]">지금 많이 찾는 AI 툴</h2>
          </div>
          <Link href="/tools" className="text-sm font-semibold text-[var(--accent-strong)]">
            전체 보기
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      <section className="card rounded-[36px] px-6 py-10 md:px-10">
        <span className="eyebrow">사용 방법</span>
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
        <span className="eyebrow">툴 제보</span>
        <h2 className="mt-4 text-4xl font-black tracking-[-0.06em]">
          새로운 AI 툴을 알려주세요
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">
          아직 없는 유용한 AI 툴이 있다면 제보해주세요. 검토 후 추가됩니다.
        </p>
        <div className="mt-8">
          <Link href="/submit" className="button-primary">
            툴 제보하기
          </Link>
        </div>
      </section>
    </div>
  );
}
