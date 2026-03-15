import type { Tool } from "./tools";

const priceCycle = ["Free", "Freemium", "Paid", "Freemium"] as const;
const supportCycle = ["좋음", "부분 지원", "제한적", "좋음"] as const;
const platformMap: Record<string, string[]> = {
  "아이디어 발상": ["Web"],
  "키워드 조사": ["Web"],
  "카피 작성": ["Web"],
  글쓰기: ["Web", "Desktop"],
  "이미지 생성": ["Web"],
  "썸네일 제작": ["Web", "iOS"],
  "영상 대본": ["Web"],
  "자막/번역": ["Web"],
  "음성 생성": ["Web"],
  "자료 요약": ["Web", "Desktop"],
  "고객 응대": ["Web"],
  "업무 자동화": ["Web"],
  "PPT 제작": ["Web"],
  "코드 작성": ["Desktop"]
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
    searchAliases: [name.toLowerCase(), primaryTag, ...secondaryTags]
  }));
}

export const extraTools100: Tool[] = [
  ...makeGroup(
    "아이디어 발상",
    ["카피 작성", "글쓰기"],
    ["Jasper", "HyperWrite", "Miro AI", "FigJam AI", "Whimsical AI", "IdeaFlow", "SparkNotes AI", "ConceptMint", "DraftMap", "Brainboard AI"],
    "{name}은 아이디어 정리와 초기 방향 설정을 빠르게 도와주는 서비스입니다.",
    "브레인스토밍, 초안 방향 잡기, 주제 정리가 필요할 때 잘 맞습니다."
  ),
  ...makeGroup(
    "키워드 조사",
    ["자료 요약", "카피 작성"],
    ["Ahrefs AI", "Semrush AI", "Surfer", "Clearscope", "MarketMuse", "WriterZen", "TopicFinder", "SearchPilot AI", "RankScope", "QueryPath"],
    "{name}은 검색 주제 발굴과 리서치 중심 콘텐츠 기획에 적합한 도구입니다.",
    "검색형 주제 탐색, 자료 조사, SEO 관점의 아이디어 검증이 필요할 때 좋습니다."
  ),
  ...makeGroup(
    "카피 작성",
    ["아이디어 발상", "글쓰기"],
    ["Copy.ai", "Writesonic", "Rytr", "Anyword", "Hypotenuse", "AdCreative AI", "HookLab", "LaunchCopy", "BrandVoice AI", "CTA Forge"],
    "{name}은 짧은 카피와 마케팅 문구를 빠르게 만드는 데 강한 서비스입니다.",
    "광고 문구, CTA, 랜딩페이지 헤드라인, 짧은 마케팅 텍스트가 필요할 때 적합합니다."
  ),
  ...makeGroup(
    "글쓰기",
    ["자료 요약", "아이디어 발상"],
    ["Sudowrite", "QuillBot", "Wordtune", "Jenni AI", "Paperpal", "Draftwise", "EssayFlow", "StorySmith AI", "DocPilot", "Rewrite Studio"],
    "{name}은 장문 작성과 문장 다듬기, 초안 정리에 강한 도구입니다.",
    "보고서, 에세이, 블로그 글, 문장 리라이팅처럼 긴 텍스트 작업에 잘 맞습니다."
  ),
  ...makeGroup(
    "이미지 생성",
    ["썸네일 제작", "PPT 제작"],
    ["Ideogram", "Playground AI", "Recraft", "Getimg AI", "DreamStudio", "Clipdrop", "Krea AI", "PhotoRoom", "ImageSmith", "PixelWave AI"],
    "{name}은 비주얼 생성과 크리에이티브 시안 제작을 빠르게 도와주는 서비스입니다.",
    "컨셉 비주얼, 마케팅 이미지, 시안용 그래픽이 필요할 때 유용합니다."
  ),
  ...makeGroup(
    "썸네일 제작",
    ["이미지 생성", "PPT 제작"],
    ["Adobe Express", "Pixa", "Fotor", "Picsart", "ThumbLab", "BannerForge", "CoverCraft AI", "QuickPoster", "SnapLayout", "ClickFrame"],
    "{name}은 썸네일, 배너, 카드뉴스 같은 가벼운 디자인 작업을 빠르게 처리해주는 도구입니다.",
    "유튜브 썸네일, SNS 배너, 홍보용 이미지를 빠르게 만들어야 할 때 좋습니다."
  ),
  ...makeGroup(
    "영상 대본",
    ["자막/번역", "음성 생성"],
    ["Synthesia", "HeyGen", "InVideo", "Pictory", "Lumen5", "Fliki", "Steve AI", "VideoPrompt AI", "SceneDraft", "StoryCut AI"],
    "{name}은 영상 기획, 대본 작성, AI 영상 제작 흐름을 빠르게 도와주는 서비스입니다.",
    "설명 영상, 짧은 프로모션 영상, 발표용 영상 제작을 시작할 때 적합합니다."
  ),
  ...makeGroup(
    "자막/번역",
    ["영상 대본", "자료 요약"],
    ["Submagic", "Happy Scribe", "Sonix", "TurboScribe", "Captions", "Trint", "Rask AI", "SubtitleFlow", "TranscribeKit", "ClipTranslate"],
    "{name}은 자막 생성과 번역, 전사 중심의 미디어 작업을 돕는 서비스입니다.",
    "자막 작업, 회의 전사, 영상 번역, 클립 현지화가 필요할 때 유용합니다."
  ),
  ...makeGroup(
    "음성 생성",
    ["고객 응대", "영상 대본"],
    ["Murf", "PlayHT", "LOVO", "WellSaid", "Speechify", "Resemble AI", "VoiceCraft AI", "NarrateNow", "VocalForge", "AgentVoice"],
    "{name}은 TTS와 보이스오버, 음성 출력 경험 제작에 강한 서비스입니다.",
    "나레이션, 음성 샘플, AI 보이스 실험처럼 소리가 중요한 작업에 적합합니다."
  ),
  ...makeGroup(
    "자료 요약",
    ["글쓰기", "업무 자동화"],
    ["Elicit", "SciSpace", "Consensus", "Scholarcy", "Humata", "AskYourPDF", "Otter", "tl;dv", "Read AI", "Glean"],
    "{name}은 문서와 회의, 리서치 자료를 빠르게 정리해주는 요약 중심 서비스입니다.",
    "PDF 요약, 회의 정리, 리서치 문서 파악, 빠른 핵심 정리가 필요할 때 좋습니다."
  )
];
