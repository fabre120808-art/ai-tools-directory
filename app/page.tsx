import Link from "next/link";
import { ToolCard } from "@/components/tool-card";
import { tools } from "@/data/tools";
import { TASK_TAGS } from "@/data/tags";

const featuredTools = tools.slice(0, 6);
const quickTags = TASK_TAGS.slice(0, 6);

const steps = [
  {
    title: "Search by task",
    description: "Start from the job you need to do, not from tool brands."
  },
  {
    title: "Compare the fit",
    description: "Use tags, summaries, and best-for notes to narrow the list quickly."
  },
  {
    title: "Try the real tool",
    description: "Jump to the official site and test the tool on a real workflow."
  }
];

export default function HomePage() {
  return (
    <div className="space-y-8 pt-6">
      <section className="card rounded-[36px] px-6 py-10 md:px-10 md:py-14">
        <span className="eyebrow">AI Tool Directory</span>
        <h1 className="mt-4 max-w-4xl text-5xl font-black tracking-[-0.08em] md:text-7xl">
          Find the right AI tool for the work you actually need to do
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)] md:text-lg">
          Search by task, scan popular tags, compare recommended tools, and jump to the official site.
        </p>
        <div className="mt-8 max-w-2xl">
          <Link href="/tools" className="block">
            <div className="input flex items-center gap-3 text-sm text-[var(--muted)]">
              <span>Search tasks like presentation, summarization, coding, or image generation</span>
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
            <span className="eyebrow">Recommended</span>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.06em]">Recommended tools</h2>
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
          Know a tool that should be listed here?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">
          Send a recommendation and make the directory more useful for the next search.
        </p>
        <div className="mt-8">
          <Link href="/submit" className="button-primary">
            Submit a tool
          </Link>
        </div>
      </section>
    </div>
  );
}
