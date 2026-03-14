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
    `Open ${tool.name} on its official site and create an account.`,
    `Start with a simple ${tool.primaryTag.toLowerCase()} task to learn the workflow.`,
    `Use one real project and compare the output with your current process.`
  ];

  const goodWhenList = [
    `You need help with ${tool.primaryTag.toLowerCase()} work right now.`,
    `You are comparing tools around ${tool.secondaryTags.join(", ")}.`,
    `You want a ${tool.pricing.toLowerCase()} option to test before committing.`
  ];

  return (
    <main className="space-y-8 pt-6">
      <section className="card rounded-[36px] px-6 py-10 md:px-10">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{tool.name}</h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-[var(--muted)]">{tool.summary}</p>
          </div>

          <a
            href={tool.officialUrl}
            target="_blank"
            rel="noreferrer"
            className="button-primary shrink-0 border-0"
          >
            Official site
          </a>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <div className="card rounded-[28px] p-6">
          <span className="eyebrow">Primary Tag</span>
          <p className="mt-4 text-2xl font-black tracking-[-0.05em]">{tool.primaryTag}</p>
        </div>
        <div className="card rounded-[28px] p-6">
          <span className="eyebrow">Secondary Tags</span>
          <div className="mt-4 flex flex-wrap gap-2">
            {tool.secondaryTags.map((tag) => (
              <span key={tag} className="rounded-full border border-[var(--line)] px-3 py-2 text-sm text-[var(--muted)]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="card rounded-[28px] p-6">
          <h2 className="text-xl font-semibold">What this tool does well</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-[var(--muted)]">
            <li>{tool.primaryTag}</li>
            {tool.secondaryTags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>

        <div className="card rounded-[28px] p-6">
          <h2 className="text-xl font-semibold">Good time to use it</h2>
          <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{tool.bestFor}</p>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-[var(--muted)]">
            {goodWhenList.map((item) => (
              <li key={item} className="rounded-2xl bg-white/60 px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
        <div className="card rounded-[28px] p-6">
          <h2 className="text-xl font-semibold">Quick start</h2>
          <ol className="mt-4 space-y-3">
            {quickStartSteps.map((step, index) => (
              <li key={step} className="rounded-2xl bg-white/60 px-4 py-4">
                <p className="text-sm font-semibold text-[var(--accent-strong)]">Step {index + 1}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="card rounded-[28px] p-6">
          <h2 className="text-xl font-semibold">Basic info</h2>
          <div className="mt-4 space-y-3 text-sm">
            <div className="rounded-2xl bg-white/60 px-4 py-3">
              <p className="font-semibold">Pricing</p>
              <p className="mt-1 text-[var(--muted)]">{tool.pricing}</p>
            </div>
            <div className="rounded-2xl bg-white/60 px-4 py-3">
              <p className="font-semibold">Korean support</p>
              <p className="mt-1 text-[var(--muted)]">{tool.koreanSupport}</p>
            </div>
            <div className="rounded-2xl bg-white/60 px-4 py-3">
              <p className="font-semibold">Platform</p>
              <p className="mt-1 text-[var(--muted)]">{tool.platform.join(", ")}</p>
            </div>
            <div className="rounded-2xl bg-white/60 px-4 py-3">
              <p className="font-semibold">Official URL</p>
              <a
                href={tool.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-1 block break-all text-[var(--accent-strong)] underline underline-offset-4"
              >
                {tool.officialUrl}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
