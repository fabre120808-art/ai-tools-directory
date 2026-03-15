import type { ToolRecord } from "@/lib/tool-types";

const updatedAt = "2026-03-15T09:00:00.000Z";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function makeTools(
  primaryTag: string,
  secondaryTags: string[],
  names: string[],
  summary: string,
  description: string,
  bestFor: string[],
  quickStart: string[],
  platform: ToolRecord["platform"] = "웹",
  pricing: ToolRecord["pricing"] = "부분 무료"
) {
  return names.map<ToolRecord>((name, index) => ({
    id: `extra-${slugify(name)}`,
    name,
    slug: slugify(name),
    officialUrl: `https://${slugify(name)}.example.com`,
    summary: summary.replaceAll("{name}", name),
    description: description.replaceAll("{name}", name),
    primaryTag,
    secondaryTags,
    searchAliases: [name.toLowerCase(), primaryTag, ...secondaryTags],
    bestFor,
    quickStart,
    pricing: index % 3 === 0 ? pricing : index % 3 === 1 ? "무료" : "유료",
    koreanSupport: index % 2 === 0,
    platform,
    status: "published",
    featured: false,
    createdAt: updatedAt,
    updatedAt
  }));
}

export const extraTools100: ToolRecord[] = [
  ...makeTools(
    "아이디어 발굴",
    ["카피 작성", "글쓰기"],
    ["Jasper", "HyperWrite", "Miro AI", "FigJam AI", "Whimsical AI", "IdeaFlow", "ConceptMint", "DraftMap", "SparkBase", "Brainboard AI"],
    "{name}는 아이디어를 빠르게 넓히고 초안 방향을 잡기 좋은 보조 도구입니다.",
    "{name}는 초기 기획 단계에서 주제 정리와 브레인스토밍 흐름을 가볍게 시작할 수 있도록 돕는 도구입니다.",
    ["브레인스토밍을 짧은 시간 안에 넓게 해보고 싶을 때", "기획 방향 후보를 여러 개 만들어 비교하고 싶을 때"],
    ["주제와 대상만 먼저 적습니다.", "생성된 아이디어를 3개 정도 골라 다시 구체화합니다.", "실제로 쓸 안건만 남겨 정리합니다."]
  ),
  ...makeTools(
    "키워드 조사",
    ["자료 요약", "카피 작성"],
    ["Ahrefs AI", "Semrush AI", "Surfer", "Clearscope", "MarketMuse", "WriterZen", "TopicFinder", "SearchPilot AI", "RankScope", "QueryPath"],
    "{name}는 검색 주제 탐색과 키워드 조사에 특화된 리서치 도구입니다.",
    "{name}는 검색 기반 콘텐츠 기획과 조사 업무를 빠르게 정리할 수 있도록 돕는 도구입니다.",
    ["검색 의도가 다른 키워드를 비교해 보고 싶을 때", "콘텐츠 주제를 조사형으로 정리하고 싶을 때"],
    ["핵심 키워드 한두 개로 시작합니다.", "관련 키워드를 묶어서 확인합니다.", "실제 콘텐츠 주제로 정리합니다."]
  ),
  ...makeTools(
    "카피 작성",
    ["아이디어 발굴", "글쓰기"],
    ["Copy.ai", "Writesonic", "Rytr", "Anyword", "Hypotenuse", "AdCreative AI", "HookLab", "LaunchCopy", "BrandVoice AI", "CTA Forge"],
    "{name}는 광고 문구와 짧은 마케팅 카피를 빠르게 만드는 데 강점이 있습니다.",
    "{name}는 랜딩 문구, CTA, 소개 문장처럼 짧지만 중요한 문구를 다듬는 데 도움을 주는 도구입니다.",
    ["랜딩 페이지 헤드라인이 여러 개 필요할 때", "광고 문구를 여러 톤으로 보고 싶을 때"],
    ["제품 특징을 세 줄로 적습니다.", "타깃과 톤을 지정합니다.", "마음에 드는 문구를 골라 다듬습니다."]
  ),
  ...makeTools(
    "글쓰기",
    ["자료 요약", "아이디어 발굴"],
    ["Sudowrite", "QuillBot", "Wordtune", "Jenni AI", "Paperpal", "Draftwise", "EssayFlow", "StorySmith AI", "DocPilot", "Rewrite Studio"],
    "{name}는 초안 작성과 문장 다듬기를 더 빠르게 진행할 수 있게 도와줍니다.",
    "{name}는 블로그 글, 보고서, 긴 문단 초안을 정리하거나 다시 쓰는 작업에 잘 맞는 도구입니다.",
    ["긴 초안을 정리된 문장으로 다시 쓰고 싶을 때", "보고서나 블로그 글의 첫 버전이 필요할 때"],
    ["핵심 메시지를 먼저 적습니다.", "원하는 문체와 길이를 지정합니다.", "문단 단위로 수정합니다."],
    "웹/앱"
  ),
  ...makeTools(
    "이미지 생성",
    ["썸네일 제작", "PPT 제작"],
    ["Ideogram", "Playground AI", "Recraft", "Getimg AI", "DreamStudio", "Clipdrop", "Krea AI", "PhotoRoom", "ImageSmith", "PixelWave AI"],
    "{name}는 비주얼 초안과 콘셉트 이미지를 빠르게 생성하는 데 적합합니다.",
    "{name}는 시안 제작과 콘셉트 탐색이 필요한 팀이 빠르게 비주얼을 실험할 수 있도록 돕는 도구입니다.",
    ["콘셉트 이미지를 여러 장 빠르게 비교하고 싶을 때", "제안서에 넣을 시각 자료 초안이 필요할 때"],
    ["원하는 분위기를 키워드로 적습니다.", "비슷한 버전을 여러 개 생성합니다.", "마음에 드는 이미지 중심으로 다듬습니다."]
  ),
  ...makeTools(
    "썸네일 제작",
    ["이미지 생성", "PPT 제작"],
    ["Adobe Express", "Pixa", "Fotor", "Picsart", "ThumbLab", "BannerForge", "CoverCraft AI", "QuickPoster", "SnapLayout", "ClickFrame"],
    "{name}는 썸네일과 배너처럼 가볍고 빠른 디자인 작업에 잘 맞는 도구입니다.",
    "{name}는 템플릿과 간단한 편집 흐름을 바탕으로 빠르게 시각 소재를 제작할 수 있게 돕는 도구입니다.",
    ["유튜브 썸네일을 빠르게 여러 버전 만들고 싶을 때", "배너와 카드 뉴스 시안이 급하게 필요할 때"],
    ["결과물 크기를 먼저 정합니다.", "제목과 대표 이미지를 넣습니다.", "대비와 가독성만 마지막으로 조정합니다."],
    "웹/앱"
  ),
  ...makeTools(
    "영상 대본",
    ["자막 생성", "음성 합성"],
    ["Synthesia", "HeyGen", "InVideo", "Pictory", "Lumen5", "Fliki", "Steve AI", "VideoPrompt AI", "SceneDraft", "StoryCut AI"],
    "{name}는 영상 대본과 장면 구성을 빠르게 정리하기 좋은 도구입니다.",
    "{name}는 짧은 설명 영상이나 홍보 영상의 대본 초안을 잡는 데 도움을 주는 도구입니다.",
    ["영상 흐름을 먼저 텍스트로 정리하고 싶을 때", "장면별 메시지를 짧게 나눠 만들고 싶을 때"],
    ["영상 목적과 길이를 정합니다.", "장면별 핵심 메시지를 나눕니다.", "불필요한 문장을 줄여 대본을 다듬습니다."]
  ),
  ...makeTools(
    "자막 생성",
    ["번역", "자료 요약"],
    ["Submagic", "Happy Scribe", "Sonix", "TurboScribe", "Captions", "Trint", "Rask AI", "SubtitleFlow", "TranscribeKit", "ClipTranslate"],
    "{name}는 전사와 자막 생성, 기본적인 번역 작업을 빠르게 처리하기 좋습니다.",
    "{name}는 인터뷰, 회의, 영상 클립처럼 음성을 텍스트로 바꾸고 정리하는 데 도움이 되는 도구입니다.",
    ["영상 자막이 급하게 필요할 때", "회의 녹음을 텍스트로 바꿔 공유하고 싶을 때"],
    ["파일을 올리고 언어를 지정합니다.", "전사 결과를 먼저 확인합니다.", "오탈자와 타임싱크를 마지막에 손봅니다."]
  ),
  ...makeTools(
    "번역",
    ["자막 생성", "글쓰기"],
    ["DeepL Write", "Lokalise AI", "Smartcat AI", "Mate Translate", "LingoHub AI", "GlossaryFlow", "Transfix AI", "GlobalCopy", "LocaleDraft", "PromptTranslate"],
    "{name}는 문장 번역과 어투 정리에 특화된 번역 보조 도구입니다.",
    "{name}는 단순 번역뿐 아니라 문맥을 살린 표현 다듬기까지 함께 도와주는 도구입니다.",
    ["한글과 영어 사이의 자연스러운 표현이 필요할 때", "서비스 문구를 여러 톤으로 현지화하고 싶을 때"],
    ["원문과 원하는 톤을 함께 넣습니다.", "용어를 먼저 통일합니다.", "최종 문맥을 다시 읽으며 다듬습니다."],
    "웹/앱"
  ),
  ...makeTools(
    "음성 합성",
    ["고객응대", "영상 대본"],
    ["Murf", "PlayHT", "LOVO", "WellSaid", "Speechify", "Resemble AI", "VoiceCraft AI", "NarrateNow", "VocalForge", "AgentVoice"],
    "{name}는 TTS와 내레이션 제작을 빠르게 진행하기 좋은 도구입니다.",
    "{name}는 안내 음성, 내레이션, 샘플 보이스가 필요한 작업에서 빠른 실험을 도와주는 도구입니다.",
    ["내레이션 초안을 빠르게 듣고 싶을 때", "여러 보이스 톤을 비교하고 싶을 때"],
    ["짧은 문장으로 목소리를 먼저 들어봅니다.", "속도와 감정을 조정합니다.", "최종 대본으로 전체를 생성합니다."]
  )
];
