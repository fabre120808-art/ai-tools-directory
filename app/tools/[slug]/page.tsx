import Link from "next/link";
import { notFound } from "next/navigation";
import { extraTools100 } from "@/data/extra-tools-100";
import { tools as baseTools } from "@/data/tools";

const allTools = [...baseTools, ...extraTools100];

export function generateStaticParams() {
  return allTools.map((tool) => ({ slug: tool.slug }));
}

type ToolDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ToolDetailPage({ params }: ToolDetailPageProps) {
  const { slug } = await params;
  const tool = allTools.find((item) => item.slug === slug);

  if (!tool) {
    notFound();
  }

  const quickStartSteps = [
    `${tool.name} 공식 사이트에 접속해서 계정을 만듭니다.`,
    `${tool.primaryTag} 작업 하나를 가볍게 넣어보며 기본 흐름을 익힙니다.`,
    `실제 프로젝트에 가까운 작업으로 결과를 비교해보며 계속 쓸지 판단합니다.`
  ];

  return (
    <main className="space-y-6 py-6">
      <section className="border-b border-[var(--line)] pb-6">
        <Link href="/tools" className="mb-4 inline-flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--foreground)]">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          툴 목록으로
        </Link>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{tool.name}</h1>
            <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">{tool.summary}</p>
          </div>
          <a
            href={tool.officialUrl}
            target="_blank"
            rel="noreferrer"
            className="button-primary shrink-0"
          >
            공식 사이트
          </a>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-md bg-[var(--accent)] px-3 py-1 text-sm font-medium text-[var(--accent-strong)]">
            {tool.primaryTag}
          </span>
          {tool.secondaryTags.map((tag) => (
            <span key={tag} className="rounded-md border border-[var(--line)] px-3 py-1 text-sm text-[var(--muted)]">
              {tag}
            </span>
          ))}
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-xl border border-[var(--line)] bg-white p-5">
          <h2 className="text-lg font-bold">이럴 때 쓰면 좋음</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{tool.bestFor}</p>
        </section>

        <section className="rounded-xl border border-[var(--line)] bg-white p-5">
          <h2 className="text-lg font-bold">기본 정보</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-[var(--muted)]">요금제</dt>
              <dd className="font-medium">{tool.pricing}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[var(--muted)]">한국어 지원</dt>
              <dd className="font-medium">{tool.koreanSupport}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[var(--muted)]">플랫폼</dt>
              <dd className="font-medium">{tool.platform.join(", ")}</dd>
            </div>
          </dl>
        </section>
      </div>

      <section className="rounded-xl border border-[var(--line)] bg-white p-5">
        <h2 className="text-lg font-bold">빠르게 시작하는 방법</h2>
        <ol className="mt-4 space-y-3">
          {quickStartSteps.map((step, index) => (
            <li key={step} className="flex gap-3 text-sm">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-[var(--accent-strong)]">
                {index + 1}
              </span>
              <p className="pt-0.5 leading-relaxed text-[var(--muted)]">{step}</p>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
