import Link from "next/link";
import { notFound } from "next/navigation";
import { getToolBySlug, tools } from "@/data/tools";

export function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug
  }));
}

export default async function ToolDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const quickStartSteps = [
    `Open ${tool.name} on its official site and create an account.`,
    `Start with one core ${tool.primaryTag.toLowerCase()} feature to get a quick feel for it.`,
    `Try a real task from your workflow and compare the output with your current process.`
  ];

  const goodWhenList = [
    `You want to start a ${tool.primaryTag.toLowerCase()} task quickly.`,
    `You are comparing tools for ${tool.secondaryTags.slice(0, 2).join(" and ")} work.`,
    `You want to test a ${tool.pricing.toLowerCase()} option before going deeper.`
  ];

  return (
    <div className="space-y-8 pt-6">
      <section className="card rounded-[36px] px-6 py-10 md:px-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent-strong)]">
            {tool.primaryTag}
          </span>
          <span className="text-sm text-[var(--muted)]">{tool.pricing}</span>
          <span className="text-sm text-[var(--muted)]">Korean: {tool.koreanSupport}</span>
        </div>
        <h1 className="mt-5 text-5xl font-black tracking-[-0.08em]">{tool.name}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--muted)]">{tool.summary}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={tool.officialUrl}
            target="_blank"
            rel="noreferrer"
            className="button-primary border-0"
          >
            Official site
          </a>
          <Link href="/tools" className="button-secondary">
            Back to tools
          </Link>
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
              <span
                key={tag}
                className="rounded-full border border-[var(--line)] bg-white/60 px-3 py-2 text-sm font-medium text-[var(--muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <div className="card rounded-[28px] p-6">
          <h2 className="text-2xl font-black tracking-[-0.05em]">What this tool does well</h2>
          <ul className="mt-5 space-y-3 text-[var(--muted)]">
            {tool.bestFor.map((item) => (
              <li key={item} className="rounded-2xl bg-white/60 px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="card rounded-[28px] p-6">
          <h2 className="text-2xl font-black tracking-[-0.05em]">Good time to use it</h2>
          <ul className="mt-5 space-y-3 text-[var(--muted)]">
            {goodWhenList.map((item) => (
              <li key={item} className="rounded-2xl bg-white/60 px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-[1.2fr_0.8fr]">
        <div className="card rounded-[28px] p-6">
          <h2 className="text-2xl font-black tracking-[-0.05em]">Quick start</h2>
          <ol className="mt-5 space-y-3">
            {quickStartSteps.map((step, index) => (
              <li key={step} className="rounded-2xl bg-white/60 px-4 py-4">
                <p className="text-sm font-semibold text-[var(--accent-strong)]">Step {index + 1}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{step}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="card rounded-[28px] p-6">
          <h2 className="text-2xl font-black tracking-[-0.05em]">Basic info</h2>
          <div className="mt-5 space-y-3 text-sm">
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
    </div>
  );
}
