export type Tool = {
  name: string;
  slug: string;
  officialUrl: string;
  summary: string;
  primaryTag: string;
  secondaryTags: string[];
  bestFor: string;
  pricing: string;
  koreanSupport: string;
  platform: string[];
  searchAliases?: string[];
};

export const tools: Tool[] = [
  {
    name: "ChatGPT",
    slug: "chatgpt",
    officialUrl: "https://chatgpt.com",
    summary: "A flexible AI assistant for writing, research, summaries, and coding help.",
    primaryTag: "Summarization",
    secondaryTags: ["Idea Generation", "Longform Writing", "Coding"],
    bestFor: "Drafting, summarizing documents, and getting quick help across mixed tasks.",
    pricing: "Freemium",
    koreanSupport: "Good",
    platform: ["Web", "iOS", "Android", "Desktop"],
    searchAliases: ["gpt", "assistant", "writing", "coding"]
  },
  {
    name: "Claude",
    slug: "claude",
    officialUrl: "https://claude.ai",
    summary: "A strong general assistant that works especially well with long documents and careful writing.",
    primaryTag: "Summarization",
    secondaryTags: ["Longform Writing", "Idea Generation", "Coding"],
    bestFor: "Reading long files, rewriting content, and organizing strategy notes.",
    pricing: "Freemium",
    koreanSupport: "Good",
    platform: ["Web", "iOS"],
    searchAliases: ["anthropic", "documents", "pdf", "writing"]
  },
  {
    name: "Perplexity",
    slug: "perplexity",
    officialUrl: "https://www.perplexity.ai",
    summary: "A search-first AI tool that answers questions with current web context and sources.",
    primaryTag: "Keyword Research",
    secondaryTags: ["Summarization", "Idea Generation"],
    bestFor: "Research, source-backed answers, and fast topic discovery.",
    pricing: "Freemium",
    koreanSupport: "Good",
    platform: ["Web", "iOS", "Android"],
    searchAliases: ["research", "search", "sources", "citations"]
  },
  {
    name: "Gamma",
    slug: "gamma",
    officialUrl: "https://gamma.app",
    summary: "An AI presentation builder for fast decks, docs, and lightweight pages.",
    primaryTag: "Presentation",
    secondaryTags: ["Summarization", "Copywriting"],
    bestFor: "Turning ideas or notes into presentation-ready pages quickly.",
    pricing: "Freemium",
    koreanSupport: "Partial",
    platform: ["Web"],
    searchAliases: ["ppt", "slides", "deck", "presentation"]
  },
  {
    name: "Canva",
    slug: "canva",
    officialUrl: "https://www.canva.com",
    summary: "A design tool with AI helpers for thumbnails, social creatives, and simple slide work.",
    primaryTag: "Thumbnail Design",
    secondaryTags: ["Image Generation", "Presentation"],
    bestFor: "Creating thumbnails, quick social visuals, and lightweight branded assets.",
    pricing: "Freemium",
    koreanSupport: "Good",
    platform: ["Web", "iOS", "Android"],
    searchAliases: ["design", "thumbnail", "slides", "social"]
  },
  {
    name: "Midjourney",
    slug: "midjourney",
    officialUrl: "https://www.midjourney.com",
    summary: "A visual generation tool known for stylized concepts and polished image outputs.",
    primaryTag: "Image Generation",
    secondaryTags: ["Thumbnail Design"],
    bestFor: "Concept art, campaign visuals, and moodboard-quality image generation.",
    pricing: "Paid",
    koreanSupport: "Partial",
    platform: ["Web", "Discord"],
    searchAliases: ["art", "images", "concept", "visuals"]
  },
  {
    name: "Runway",
    slug: "runway",
    officialUrl: "https://runwayml.com",
    summary: "A creative video tool for generation, editing, and lightweight production workflows.",
    primaryTag: "Video Script",
    secondaryTags: ["Image Generation", "Text to Speech"],
    bestFor: "Short video concepts, visual tests, and quick AI-assisted edits.",
    pricing: "Freemium",
    koreanSupport: "Partial",
    platform: ["Web", "iOS"],
    searchAliases: ["video", "edit", "gen video", "creative"]
  },
  {
    name: "ElevenLabs",
    slug: "elevenlabs",
    officialUrl: "https://elevenlabs.io",
    summary: "A voice AI tool focused on natural text-to-speech and dubbing workflows.",
    primaryTag: "Text to Speech",
    secondaryTags: ["Captions Translation", "Customer Support"],
    bestFor: "Voiceovers, demos, dubbed clips, and prototype voice experiences.",
    pricing: "Freemium",
    koreanSupport: "Partial",
    platform: ["Web"],
    searchAliases: ["tts", "voice", "narration", "dub"]
  },
  {
    name: "Notion AI",
    slug: "notion-ai",
    officialUrl: "https://www.notion.com/product/ai",
    summary: "An AI layer inside Notion for meeting notes, writing help, and workspace cleanup.",
    primaryTag: "Workflow Automation",
    secondaryTags: ["Summarization", "Longform Writing"],
    bestFor: "Meeting notes, wiki drafts, and organizing team docs in one workspace.",
    pricing: "Paid",
    koreanSupport: "Good",
    platform: ["Web", "Desktop", "iOS", "Android"],
    searchAliases: ["notes", "docs", "workspace", "meeting"]
  },
  {
    name: "Cursor",
    slug: "cursor",
    officialUrl: "https://www.cursor.com",
    summary: "An AI-first editor that helps with code generation, editing, and refactors.",
    primaryTag: "Coding",
    secondaryTags: ["Workflow Automation"],
    bestFor: "Shipping prototypes faster, refactoring code, and navigating repositories.",
    pricing: "Freemium",
    koreanSupport: "Partial",
    platform: ["Desktop"],
    searchAliases: ["ide", "code", "programming", "editor"]
  }
];

export function getToolBySlug(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}
