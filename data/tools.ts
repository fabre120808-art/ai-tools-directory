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
    summary: "글쓰기, 리서치, 문서 요약, 코딩 보조까지 폭넓게 쓸 수 있는 범용 AI 어시스턴트입니다.",
    primaryTag: "자료 요약",
    secondaryTags: ["아이디어 발상", "글쓰기", "코드 작성"],
    bestFor: "초안 작성, 문서 요약, 질문 정리, 다양한 업무 보조가 필요할 때 잘 맞습니다.",
    pricing: "Freemium",
    koreanSupport: "좋음",
    platform: ["Web", "iOS", "Android", "Desktop"],
    searchAliases: ["챗지피티", "gpt", "요약", "글쓰기", "코딩"]
  },
  {
    name: "Claude",
    slug: "claude",
    officialUrl: "https://claude.ai",
    summary: "긴 문서 읽기와 차분한 장문 작성, 구조화된 정리에 강한 AI 어시스턴트입니다.",
    primaryTag: "자료 요약",
    secondaryTags: ["글쓰기", "아이디어 발상", "코드 작성"],
    bestFor: "PDF나 긴 보고서를 읽고 정리하거나, 긴 글 초안을 매끄럽게 다듬고 싶을 때 좋습니다.",
    pricing: "Freemium",
    koreanSupport: "좋음",
    platform: ["Web", "iOS"],
    searchAliases: ["클로드", "anthropic", "문서 요약", "장문 작성"]
  },
  {
    name: "Perplexity",
    slug: "perplexity",
    officialUrl: "https://www.perplexity.ai",
    summary: "웹 검색 기반 답변과 출처 확인이 쉬운 리서치 중심 AI 검색 도구입니다.",
    primaryTag: "키워드 조사",
    secondaryTags: ["자료 요약", "아이디어 발상"],
    bestFor: "시장 조사, 자료 출처 확인, 검색형 리서치를 빠르게 끝내고 싶을 때 유용합니다.",
    pricing: "Freemium",
    koreanSupport: "좋음",
    platform: ["Web", "iOS", "Android"],
    searchAliases: ["퍼플렉시티", "검색", "출처", "리서치"]
  },
  {
    name: "Gamma",
    slug: "gamma",
    officialUrl: "https://gamma.app",
    summary: "발표 자료, 문서, 간단한 소개 페이지를 빠르게 만들어주는 AI 프레젠테이션 도구입니다.",
    primaryTag: "PPT 제작",
    secondaryTags: ["자료 요약", "카피 작성"],
    bestFor: "회의 자료, 제안서 초안, 설명용 슬라이드를 빠르게 만들고 싶을 때 잘 맞습니다.",
    pricing: "Freemium",
    koreanSupport: "부분 지원",
    platform: ["Web"],
    searchAliases: ["감마", "ppt", "슬라이드", "발표 자료"]
  },
  {
    name: "Canva",
    slug: "canva",
    officialUrl: "https://www.canva.com",
    summary: "썸네일, 배너, 카드뉴스, 간단한 발표 자료까지 폭넓게 만드는 디자인 중심 서비스입니다.",
    primaryTag: "썸네일 제작",
    secondaryTags: ["이미지 생성", "PPT 제작"],
    bestFor: "유튜브 썸네일, SNS 디자인, 간단한 발표용 비주얼이 필요할 때 좋습니다.",
    pricing: "Freemium",
    koreanSupport: "좋음",
    platform: ["Web", "iOS", "Android"],
    searchAliases: ["캔바", "디자인", "썸네일", "배너"]
  },
  {
    name: "Midjourney",
    slug: "midjourney",
    officialUrl: "https://www.midjourney.com",
    summary: "스타일리시한 비주얼과 컨셉 이미지를 만들어주는 이미지 생성 도구입니다.",
    primaryTag: "이미지 생성",
    secondaryTags: ["썸네일 제작"],
    bestFor: "컨셉 아트, 무드보드, 시안용 비주얼을 빠르게 만들고 싶을 때 강합니다.",
    pricing: "Paid",
    koreanSupport: "부분 지원",
    platform: ["Web", "Discord"],
    searchAliases: ["미드저니", "이미지", "컨셉 아트", "비주얼"]
  },
  {
    name: "Runway",
    slug: "runway",
    officialUrl: "https://runwayml.com",
    summary: "영상 생성과 편집, 실험적인 비주얼 작업을 도와주는 크리에이티브 비디오 도구입니다.",
    primaryTag: "영상 대본",
    secondaryTags: ["이미지 생성", "음성 생성"],
    bestFor: "짧은 영상 시안, 비주얼 테스트, 간단한 AI 영상 편집이 필요할 때 좋습니다.",
    pricing: "Freemium",
    koreanSupport: "부분 지원",
    platform: ["Web", "iOS"],
    searchAliases: ["런웨이", "비디오", "영상 생성", "영상 편집"]
  },
  {
    name: "ElevenLabs",
    slug: "elevenlabs",
    officialUrl: "https://elevenlabs.io",
    summary: "자연스러운 TTS와 더빙 워크플로우에 강한 음성 AI 도구입니다.",
    primaryTag: "음성 생성",
    secondaryTags: ["자막/번역", "고객 응대"],
    bestFor: "나레이션, 더빙, 음성 샘플 제작처럼 말소리가 중요한 작업에 적합합니다.",
    pricing: "Freemium",
    koreanSupport: "부분 지원",
    platform: ["Web"],
    searchAliases: ["일레븐랩스", "tts", "나레이션", "더빙"]
  },
  {
    name: "Notion AI",
    slug: "notion-ai",
    officialUrl: "https://www.notion.com/product/ai",
    summary: "회의록, 문서 초안, 위키 정리를 한 곳에서 처리하기 좋은 워크스페이스형 AI 도구입니다.",
    primaryTag: "업무 자동화",
    secondaryTags: ["자료 요약", "글쓰기"],
    bestFor: "회의 정리, 팀 문서 관리, 초안 작성처럼 문서 중심 협업이 많을 때 유용합니다.",
    pricing: "Paid",
    koreanSupport: "좋음",
    platform: ["Web", "Desktop", "iOS", "Android"],
    searchAliases: ["노션", "회의록", "문서 정리", "위키"]
  },
  {
    name: "Cursor",
    slug: "cursor",
    officialUrl: "https://www.cursor.com",
    summary: "코드 생성, 수정, 리팩터링을 빠르게 도와주는 AI 중심 개발 에디터입니다.",
    primaryTag: "코드 작성",
    secondaryTags: ["업무 자동화"],
    bestFor: "프로토타입 제작, 코드 수정, 코드베이스 탐색처럼 개발 생산성을 높이고 싶을 때 좋습니다.",
    pricing: "Freemium",
    koreanSupport: "부분 지원",
    platform: ["Desktop"],
    searchAliases: ["커서", "코딩", "개발", "에디터"]
  }
];

export function getToolBySlug(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}
