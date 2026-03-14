import type { Tool } from "./tools";

const priceCycle = ["Free", "Freemium", "Paid", "Freemium"] as const;
const supportCycle = ["Good", "Partial", "Limited", "Good"] as const;
const platformMap: Record<string, string[]> = {
  "Idea Generation": ["Web"],
  "Keyword Research": ["Web"],
  "Copywriting": ["Web"],
  "Longform Writing": ["Web", "Desktop"],
  "Image Generation": ["Web"],
  "Thumbnail Design": ["Web", "iOS"],
  "Video Script": ["Web"],
  "Captions Translation": ["Web"],
  "Text to Speech": ["Web"],
  "Summarization": ["Web", "Desktop"],
  "Customer Support": ["Web"],
  "Workflow Automation": ["Web"],
  Presentation: ["Web"],
  Coding: ["Desktop"]
};

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function makeGroup(
  primaryTag: string,
  secondaryTags: string[],
  names: string[],
  summaryTemplate: string,
  bestForTemplate: string
): Tool[] {
  return names.map((name, index) => ({
    name,
    slug: slugify(name),
    officialUrl: `https://${slugify(name)}.example.com`,
    summary: summaryTemplate.replace("{name}", name),
    primaryTag,
    secondaryTags,
    bestFor: bestForTemplate.replace("{name}", name),
    pricing: priceCycle[index % priceCycle.length],
    koreanSupport: supportCycle[index % supportCycle.length],
    platform: platformMap[primaryTag] ?? ["Web"],
    searchAliases: [name.toLowerCase(), primaryTag.toLowerCase(), ...secondaryTags.map((tag) => tag.toLowerCase())]
  }));
}

export const extraTools100: Tool[] = [
  ...makeGroup(
    "Idea Generation",
    ["Copywriting", "Longform Writing"],
    ["Jasper", "HyperWrite", "Miro AI", "FigJam AI", "Whimsical AI", "IdeaFlow", "SparkNotes AI", "ConceptMint", "DraftMap", "Brainboard AI"],
    "{name} helps teams generate directions, prompts, and rough concepts faster.",
    "Early brainstorming, first-pass planning, and turning vague requests into clearer directions."
  ),
  ...makeGroup(
    "Keyword Research",
    ["Summarization", "Copywriting"],
    ["Ahrefs AI", "Semrush AI", "Surfer", "Clearscope", "MarketMuse", "WriterZen", "TopicFinder", "SearchPilot AI", "RankScope", "QueryPath"],
    "{name} is built for search discovery, topic mapping, and research-first content planning.",
    "Finding search topics, exploring content opportunities, and validating ideas before writing."
  ),
  ...makeGroup(
    "Copywriting",
    ["Idea Generation", "Longform Writing"],
    ["Copy.ai", "Writesonic", "Rytr", "Anyword", "Hypotenuse", "AdCreative AI", "HookLab", "LaunchCopy", "BrandVoice AI", "CTA Forge"],
    "{name} focuses on short-form copy, ad messaging, and quick conversion-oriented drafts.",
    "Hooks, campaign copy, landing page sections, and fast message testing."
  ),
  ...makeGroup(
    "Longform Writing",
    ["Summarization", "Idea Generation"],
    ["Sudowrite", "QuillBot", "Wordtune", "Jenni AI", "Paperpal", "Draftwise", "EssayFlow", "StorySmith AI", "DocPilot", "Rewrite Studio"],
    "{name} helps with structured writing, rewrites, and longer text workflows.",
    "Reports, essays, rewritten drafts, and polishing long-form writing."
  ),
  ...makeGroup(
    "Image Generation",
    ["Thumbnail Design", "Presentation"],
    ["Ideogram", "Playground AI", "Recraft", "Getimg AI", "DreamStudio", "Clipdrop", "Krea AI", "PhotoRoom", "ImageSmith", "PixelWave AI"],
    "{name} generates visuals for creative concepts, marketing assets, and design exploration.",
    "Creative image generation, visual concepts, and asset creation for campaigns."
  ),
  ...makeGroup(
    "Thumbnail Design",
    ["Image Generation", "Presentation"],
    ["Adobe Express", "Pixa", "Fotor", "Picsart", "ThumbLab", "BannerForge", "CoverCraft AI", "QuickPoster", "SnapLayout", "ClickFrame"],
    "{name} helps build thumbnails, banners, and simple promotional visuals quickly.",
    "YouTube thumbnails, social banners, and lightweight visual packaging."
  ),
  ...makeGroup(
    "Video Script",
    ["Captions Translation", "Text to Speech"],
    ["Synthesia", "HeyGen", "InVideo", "Pictory", "Lumen5", "Fliki", "Steve AI", "VideoPrompt AI", "SceneDraft", "StoryCut AI"],
    "{name} supports script-led video creation and lightweight AI video workflows.",
    "Explainer videos, short promos, narrated clips, and fast production experiments."
  ),
  ...makeGroup(
    "Captions Translation",
    ["Video Script", "Summarization"],
    ["Submagic", "Happy Scribe", "Sonix", "TurboScribe", "Captions", "Trint", "Rask AI", "SubtitleFlow", "TranscribeKit", "ClipTranslate"],
    "{name} helps with subtitles, transcripts, and translation-heavy media workflows.",
    "Captions, meeting transcripts, translated clips, and subtitle cleanup."
  ),
  ...makeGroup(
    "Text to Speech",
    ["Customer Support", "Video Script"],
    ["Murf", "PlayHT", "LOVO", "WellSaid", "Speechify", "Resemble AI", "VoiceCraft AI", "NarrateNow", "VocalForge", "AgentVoice"],
    "{name} focuses on TTS, voice generation, and spoken-output experiences.",
    "Narration, AI voice prototypes, and audio-first content delivery."
  ),
  ...makeGroup(
    "Summarization",
    ["Longform Writing", "Workflow Automation"],
    ["Elicit", "SciSpace", "Consensus", "Scholarcy", "Humata", "AskYourPDF", "Otter", "tl;dv", "Read AI", "Glean"],
    "{name} is built to condense documents, notes, and dense information into usable takeaways.",
    "Meeting recaps, PDF review, research summaries, and document triage."
  )
];
