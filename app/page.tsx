import Link from "next/link";
import { ToolCard } from "@/components/tool-card";
import { tools } from "@/data/tools";
import { TASK_TAGS } from "@/data/tags";

const featuredTools = tools.slice(0, 6);
const quickTags = TASK_TAGS.slice(0, 6);

const steps = [
  {
    title: "작업부터 검색하기",
    description: "툴 이름보다 먼저, 지금 하고 싶은 작업 기준으로 찾아보세요."
  },
  {
    title: "잘 맞는 툴 비교하기",
    description: "태그, 설명, 추천 상황을 보고 지금 필요한 툴만 빠르게 골라보세요."
  },
  {
    title: "공식 사이트에서 바로 써보기",
    description: "마음에 드는 툴은 공식 사이트로 이동해서 실제 작업에 바로 적용해보면 됩니다."
  }
];

export default function HomePage() {
  return (
    <div className="space-y-8 pt-6">
      <section className="card rounded-[36px] px-6 py-10 md:px-10 md:py-14">
        <span className="eyebrow">AI 툴 디렉토리</span>
        <h1 className="mt-4 max-w-4xl text-5xl font-black tracking-[-0.08em] md:text-7xl">
          내가 하려는 작업에 맞는 AI 툴을 빠르게 찾는 한국어 중심 디렉토리
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)] md:text-lg">
          작업 기준으로 검색하고, 태그로 좁히고, 추천 툴을 비교한 뒤 바로 공식 사이트로 이동해보세요.
        </p>
        <div className="mt-8 max-w-2xl">
          <Link href="/tools" className="block">
            <div className="input flex items-center gap-3 text-sm text-[var(--muted)]">
              <span>PPT 제작, 자료 요약, 자막/번역, 코드 작성 같은 작업으로 검색해보세요</span>
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
            <span className="eyebrow">추천 툴</span>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.06em]">먼저 살펴볼 만한 툴</h2>
          </div>
          <Link href="/tools" className="text-sm font-semibold text-[var(--accent-strong)]">
            전체 툴 보기
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      <section className="card rounded-[36px] px-6 py-10 md:px-10">
        <span className="eyebrow">이용 방법</span>
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
          여기 없는 툴이 있다면 직접 제보해주세요
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">
          더 유용한 한국어 기반 디렉토리를 만들 수 있도록 좋은 AI 툴을 추천해주시면 반영하기 쉬워집니다.
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
