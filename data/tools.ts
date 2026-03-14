export type Tool = {
  name: string;
  slug: string;
  officialUrl: string;
  summary: string;
  primaryTag: string;
  secondaryTags: string[];
  bestFor: string[];
  pricing: string;
  koreanSupport: string;
  platform: string[];
  searchAliases?: string[];
};

// 공개 작업 태그 목록
export const TASK_TAGS = [
  '아이디어 발굴',
  '키워드 조사',
  '카피 작성',
  '글쓰기',
  '이미지 생성',
  '썸네일 제작',
  '영상 대본',
  '자막 생성',
  '번역',
  '음성 합성',
  '자료 요약',
  '고객응대',
  '업무 자동화',
  'PPT 제작',
  '코드 작성',
] as const;

export type TaskTag = typeof TASK_TAGS[number];

// 검색어 → 작업 태그 매핑 (내부 해석용)
export const SEARCH_ALIASES: Record<TaskTag, string[]> = {
  'PPT 제작': ['ppt', '발표자료', '슬라이드', '프레젠테이션', '발표', '피피티'],
  '자료 요약': ['요약', '핵심정리', '문서요약', '논문요약', '문서정리', '정리'],
  '코드 작성': ['코딩', '프로그래밍', '개발', '코드생성', '스크립트', '코드'],
  '글쓰기': ['글작성', '리포트작성', '보고서작성', '초안작성', '에세이', '리포트', '보고서'],
  '카피 작성': ['제목작성', '광고문구', '소개문구', '후킹문구', '카피', '헤드라인'],
  '번역': ['영어번역', '한영번역', '영한번역', '문서번역', '통역'],
  '자막 생성': ['자막', '캡션', '영상자막', '자막생성'],
  '이미지 생성': ['이미지', '그림', '일러스트', '그림생성'],
  '썸네일 제작': ['썸네일', '유튜브썸네일', '커버이미지', '표지'],
  '영상 대본': ['대본', '스크립트', '영상스크립트', '쇼츠대본', '영상대본'],
  '음성 합성': ['tts', '음성생성', '나레이션', '음성', '보이스'],
  '업무 자동화': ['자동화', '반복업무', '워크플로우', '자동처리', '노코드'],
  '고객응대': ['cs', '상담', '문의응대', '챗봇', '고객상담'],
  '아이디어 발굴': ['아이디어', '브레인스토밍', '발상', '주제추천', '기획'],
  '키워드 조사': ['키워드', '검색어조사', 'seo키워드', 'seo', '검색'],
};

export const tools: Tool[] = [
  // 1. ChatGPT
  {
    name: 'ChatGPT',
    slug: 'chatgpt',
    officialUrl: 'https://chatgpt.com/',
    summary: '과제와 업무 전반에서 글쓰기, 요약, 아이디어 발굴, 코드 보조까지 두루 쓰기 좋은 범용 AI',
    primaryTag: '자료 요약',
    secondaryTags: ['아이디어 발굴', '글쓰기'],
    bestFor: ['과제 초안', '회의 내용 정리', '이메일/문서 작성', '간단한 코드 보조'],
    pricing: 'Freemium',
    koreanSupport: '지원',
    platform: ['Web', 'iOS', 'Android'],
    searchAliases: ['gpt', '챗지피티', 'openai'],
  },

  // 2. Claude
  {
    name: 'Claude',
    slug: 'claude',
    officialUrl: 'https://claude.ai/',
    summary: '긴 문서 분석, 글 정리, 브레인스토밍, 코드 설명에 강한 범용 AI',
    primaryTag: '자료 요약',
    secondaryTags: ['아이디어 발굴', '글쓰기'],
    bestFor: ['리포트 정리', '긴 PDF 분석', '문서 요약', '코드 리뷰'],
    pricing: 'Freemium',
    koreanSupport: '지원',
    platform: ['Web', 'iOS', 'Android'],
    searchAliases: ['클로드', 'anthropic'],
  },

  // 3. Gemini
  {
    name: 'Gemini',
    slug: 'gemini',
    officialUrl: 'https://gemini.google.com/',
    summary: '글쓰기, 계획 세우기, 브레인스토밍을 빠르게 도와주는 Google 기반 범용 AI',
    primaryTag: '아이디어 발굴',
    secondaryTags: ['글쓰기', '자료 요약'],
    bestFor: ['작업 아이디어 정리', '초안 작성', 'Google 문서/메일 작업 보조'],
    pricing: 'Free',
    koreanSupport: '지원',
    platform: ['Web', 'iOS', 'Android'],
    searchAliases: ['제미나이', '구글', 'google', 'bard'],
  },

  // 4. Perplexity
  {
    name: 'Perplexity',
    slug: 'perplexity',
    officialUrl: 'https://www.perplexity.ai/',
    summary: '웹 기반 답변과 출처 확인이 쉬운 AI 검색 도구',
    primaryTag: '키워드 조사',
    secondaryTags: ['자료 요약', '아이디어 발굴'],
    bestFor: ['레포트 조사', '키워드 탐색', '논문/기사 출처 확인'],
    pricing: 'Freemium',
    koreanSupport: '지원',
    platform: ['Web', 'iOS', 'Android'],
    searchAliases: ['퍼플렉시티', '검색'],
  },

  // 5. NotebookLM
  {
    name: 'NotebookLM',
    slug: 'notebooklm',
    officialUrl: 'https://notebooklm.google.com/',
    summary: 'PDF와 웹페이지를 넣고 핵심 내용을 정리해주는 AI 연구 보조 도구',
    primaryTag: '자료 요약',
    secondaryTags: ['아이디어 발굴', '글쓰기'],
    bestFor: ['강의자료', '논문', '보고서', '참고자료 묶음 정리'],
    pricing: 'Free',
    koreanSupport: '지원',
    platform: ['Web'],
    searchAliases: ['노트북lm', 'pdf', '논문'],
  },

  // 6. Notion AI
  {
    name: 'Notion AI',
    slug: 'notion-ai',
    officialUrl: 'https://www.notion.com/product/ai',
    summary: '회의 기록, 보고서 초안, 검색과 반복 업무를 한 워크스페이스 안에서 돕는 AI',
    primaryTag: '자료 요약',
    secondaryTags: ['업무 자동화', '글쓰기'],
    bestFor: ['회의록 정리', '프로젝트 문서 초안', '팀 협업 문서 관리'],
    pricing: 'Paid Add-on',
    koreanSupport: '지원',
    platform: ['Web', 'Desktop', 'iOS', 'Android'],
    searchAliases: ['노션', '회의록'],
  },

  // 7. Grammarly
  {
    name: 'Grammarly',
    slug: 'grammarly',
    officialUrl: 'https://www.grammarly.com/ai-writing-assistant',
    summary: '이메일, 보고서, 과제 글을 더 자연스럽고 명확하게 다듬는 AI 글쓰기 보조 도구',
    primaryTag: '글쓰기',
    secondaryTags: ['카피 작성'],
    bestFor: ['메일 작성', '보고서 문장 다듬기', '과제 문체 정리'],
    pricing: 'Freemium',
    koreanSupport: '제한적',
    platform: ['Web', 'Desktop', 'iOS', 'Android'],
    searchAliases: ['그래머리', '영어', '문법'],
  },

  // 8. Canva AI
  {
    name: 'Canva AI',
    slug: 'canva-ai',
    officialUrl: 'https://www.canva.com/magic/',
    summary: '썸네일, 이미지, 발표 자료 초안을 빠르게 만드는 디자인 AI',
    primaryTag: '썸네일 제작',
    secondaryTags: ['이미지 생성', 'PPT 제작'],
    bestFor: ['유튜브 썸네일', '카드뉴스', '발표 슬라이드 초안 제작'],
    pricing: 'Freemium',
    koreanSupport: '지원',
    platform: ['Web', 'iOS', 'Android'],
    searchAliases: ['캔바', '디자인', '카드뉴스'],
  },

  // 9. Gamma
  {
    name: 'Gamma',
    slug: 'gamma',
    officialUrl: 'https://gamma.app/',
    summary: '주제만 넣으면 발표자료, 문서, 간단한 웹페이지 초안을 빠르게 만드는 AI',
    primaryTag: 'PPT 제작',
    secondaryTags: ['자료 요약', '글쓰기'],
    bestFor: ['발표자료 초안', '제안서', '요약형 문서 제작'],
    pricing: 'Freemium',
    koreanSupport: '지원',
    platform: ['Web'],
    searchAliases: ['감마', '피피티'],
  },

  // 10. Midjourney
  {
    name: 'Midjourney',
    slug: 'midjourney',
    officialUrl: 'https://www.midjourney.com/home',
    summary: '감도 높은 콘셉트 이미지와 비주얼 시안을 만드는 생성형 AI',
    primaryTag: '이미지 생성',
    secondaryTags: ['썸네일 제작'],
    bestFor: ['콘셉트 아트', '포스터', '썸네일용 이미지 시안'],
    pricing: 'Paid',
    koreanSupport: '제한적',
    platform: ['Web', 'Discord'],
    searchAliases: ['미드저니', '그림생성'],
  },

  // 11. Adobe Firefly
  {
    name: 'Adobe Firefly',
    slug: 'adobe-firefly',
    officialUrl: 'https://www.adobe.com/products/firefly.html',
    summary: '이미지뿐 아니라 영상, 오디오, 디자인 생성까지 연결되는 Adobe 계열 생성형 AI',
    primaryTag: '이미지 생성',
    secondaryTags: ['썸네일 제작'],
    bestFor: ['브랜드 이미지', '광고 시안', '편집용 비주얼 생성'],
    pricing: 'Freemium',
    koreanSupport: '지원',
    platform: ['Web', 'Desktop'],
    searchAliases: ['어도비', '파이어플라이', 'firefly'],
  },

  // 12. Leonardo AI
  {
    name: 'Leonardo AI',
    slug: 'leonardo-ai',
    officialUrl: 'https://leonardo.ai/',
    summary: '프롬프트 기반 이미지 생성과 편집, 업스케일링까지 한 번에 하기 좋은 비주얼 AI',
    primaryTag: '이미지 생성',
    secondaryTags: ['썸네일 제작'],
    bestFor: ['게임/제품 콘셉트', 'SNS 비주얼', '썸네일 시안'],
    pricing: 'Freemium',
    koreanSupport: '지원',
    platform: ['Web', 'iOS', 'Android'],
    searchAliases: ['레오나르도'],
  },

  // 13. Descript
  {
    name: 'Descript',
    slug: 'descript',
    officialUrl: 'https://www.descript.com/',
    summary: '음성·영상 파일을 자막, 전사, 번역, 편집까지 연결해주는 AI 편집 도구',
    primaryTag: '자막 생성',
    secondaryTags: ['영상 대본', '음성 합성'],
    bestFor: ['인터뷰/강의 영상 자막', '팟캐스트 편집', '음성 콘텐츠 정리'],
    pricing: 'Freemium',
    koreanSupport: '지원',
    platform: ['Web', 'Desktop'],
    searchAliases: ['디스크립트', '팟캐스트'],
  },

  // 14. VEED
  {
    name: 'VEED',
    slug: 'veed',
    officialUrl: 'https://www.veed.io/',
    summary: '텍스트를 영상으로 바꾸고 자막, 번역, AI 음성까지 붙이기 쉬운 온라인 영상 도구',
    primaryTag: '영상 대본',
    secondaryTags: ['자막 생성', '음성 합성'],
    bestFor: ['짧은 영상 제작', '자동 자막', 'SNS용 영상 편집'],
    pricing: 'Freemium',
    koreanSupport: '지원',
    platform: ['Web'],
    searchAliases: ['비드', '영상편집', '쇼츠'],
  },

  // 15. DeepL
  {
    name: 'DeepL',
    slug: 'deepl',
    officialUrl: 'https://www.deepl.com/translator',
    summary: '문장과 문서를 정확하게 번역하고 글을 다듬는 데 강한 언어 AI',
    primaryTag: '번역',
    secondaryTags: ['글쓰기'],
    bestFor: ['논문/메일 번역', '다국어 문장 교정'],
    pricing: 'Freemium',
    koreanSupport: '지원',
    platform: ['Web', 'Desktop', 'iOS', 'Android'],
    searchAliases: ['딥엘', '번역기'],
  },

  // 16. ElevenLabs
  {
    name: 'ElevenLabs',
    slug: 'elevenlabs',
    officialUrl: 'https://elevenlabs.io/',
    summary: '자연스러운 TTS, 보이스 클로닝, 음성 에이전트에 강한 음성 AI',
    primaryTag: '음성 합성',
    secondaryTags: ['고객응대'],
    bestFor: ['나레이션', '더빙', 'AI 보이스 챗봇'],
    pricing: 'Freemium',
    koreanSupport: '제한적',
    platform: ['Web'],
    searchAliases: ['일레븐랩스', 'tts', '음성'],
  },

  // 17. Zapier
  {
    name: 'Zapier',
    slug: 'zapier',
    officialUrl: 'https://zapier.com/',
    summary: '앱과 앱을 연결해 AI 워크플로와 자동화를 만드는 업무 자동화 도구',
    primaryTag: '업무 자동화',
    secondaryTags: ['고객응대'],
    bestFor: ['폼 응답 정리', '알림 자동화', '이메일·시트·CRM 연동'],
    pricing: 'Freemium',
    koreanSupport: '미지원',
    platform: ['Web'],
    searchAliases: ['재피어', '자동화'],
  },

  // 18. Make
  {
    name: 'Make',
    slug: 'make',
    officialUrl: 'https://www.make.com/en',
    summary: '복잡한 자동화 시나리오를 시각적으로 설계하기 쉬운 no-code 자동화 도구',
    primaryTag: '업무 자동화',
    secondaryTags: ['고객응대'],
    bestFor: ['반복 보고', '데이터 옮기기', '앱 간 연동 자동화'],
    pricing: 'Freemium',
    koreanSupport: '미지원',
    platform: ['Web'],
    searchAliases: ['메이크', 'integromat'],
  },

  // 19. GitHub Copilot
  {
    name: 'GitHub Copilot',
    slug: 'github-copilot',
    officialUrl: 'https://github.com/features/copilot',
    summary: 'IDE 안에서 코드 작성, 설명, 수정, 리뷰를 도와주는 AI 코딩 도구',
    primaryTag: '코드 작성',
    secondaryTags: [],
    bestFor: ['코드 초안', '함수 작성', '버그 수정', '코드 설명'],
    pricing: 'Paid',
    koreanSupport: '제한적',
    platform: ['VS Code', 'JetBrains', 'Neovim'],
    searchAliases: ['코파일럿', '깃허브', 'github'],
  },

  // 20. Cursor
  {
    name: 'Cursor',
    slug: 'cursor',
    officialUrl: 'https://cursor.com/',
    summary: 'AI와 대화하며 프로젝트 단위로 코드를 수정하고 생성하기 좋은 AI IDE',
    primaryTag: '코드 작성',
    secondaryTags: [],
    bestFor: ['사이드 프로젝트', '빠른 프로토타입', '코드 리팩터링'],
    pricing: 'Freemium',
    koreanSupport: '제한적',
    platform: ['Desktop'],
    searchAliases: ['커서', 'ide'],
  },
];

export function getToolBySlug(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}
