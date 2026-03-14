import type { Tool } from "./tools";
import { extraTools100 } from "./extra-tools-100";
import { tools as baseTools } from "./tools";

export const TASK_TAGS = [
  { label: "Idea Generation", slug: "idea-generation", description: "Brainstorming topics, directions, and rough concepts." },
  { label: "Keyword Research", slug: "keyword-research", description: "Search topics, source discovery, and SEO-adjacent research." },
  { label: "Copywriting", slug: "copywriting", description: "Ads, hooks, CTAs, and short-form marketing copy." },
  { label: "Longform Writing", slug: "longform-writing", description: "Reports, articles, and polished long-form text." },
  { label: "Image Generation", slug: "image-generation", description: "AI visuals, concept art, and creative image outputs." },
  { label: "Thumbnail Design", slug: "thumbnail-design", description: "Thumbnails, banners, and lightweight visual design." },
  { label: "Video Script", slug: "video-script", description: "Video planning, scripts, and AI-led video production." },
  { label: "Captions Translation", slug: "captions-translation", description: "Captions, transcription, translation, and subtitles." },
  { label: "Text to Speech", slug: "text-to-speech", description: "Narration, voiceover, and synthetic voice workflows." },
  { label: "Summarization", slug: "summarization", description: "PDFs, notes, meetings, and dense document summaries." },
  { label: "Customer Support", slug: "customer-support", description: "Support automation, chat, and customer operations." },
  { label: "Workflow Automation", slug: "workflow-automation", description: "Connecting tools and automating repeatable work." },
  { label: "Presentation", slug: "presentation", description: "Slides, decks, and presentation-first outputs." },
  { label: "Coding", slug: "coding", description: "Code generation, editing, and developer workflows." }
] as const;

export type TaskTagSlug = (typeof TASK_TAGS)[number]["slug"];

export const TAG_BY_SLUG: Record<TaskTagSlug, (typeof TASK_TAGS)[number]> = Object.fromEntries(
  TASK_TAGS.map((tag) => [tag.slug, tag])
) as Record<TaskTagSlug, (typeof TASK_TAGS)[number]>;

export const allTools: Tool[] = [...baseTools, ...extraTools100];

export function isTaskTagSlug(value: string): value is TaskTagSlug {
  return TASK_TAGS.some((tag) => tag.slug === value);
}

export function getTaskTagLabelBySlug(slug?: string) {
  if (!slug || !isTaskTagSlug(slug)) {
    return null;
  }

  return TAG_BY_SLUG[slug].label;
}

export function getTagCounts(tools: Tool[] = allTools) {
  return TASK_TAGS.map((tag) => {
    const count = tools.filter((tool) => {
      const matchedTags = new Set([tool.primaryTag, ...tool.secondaryTags]);
      return matchedTags.has(tag.label);
    }).length;

    return {
      ...tag,
      count
    };
  });
}
