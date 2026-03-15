export const CANONICAL_TASK_TAGS = [
  { label: "아이디어 발굴", slug: "idea-generation", description: "주제 정리와 아이디어 확장에 잘 맞는 작업입니다.", clicks: 1420 },
  { label: "키워드 조사", slug: "keyword-research", description: "검색 주제 조사와 자료 탐색에 잘 맞는 작업입니다.", clicks: 980 },
  { label: "카피 작성", slug: "copywriting", description: "광고 문구와 CTA 초안 작성에 잘 맞는 작업입니다.", clicks: 2150 },
  { label: "글쓰기", slug: "writing", description: "블로그 글, 보고서, 초안 정리에 잘 맞는 작업입니다.", clicks: 1890 },
  { label: "이미지 생성", slug: "image-generation", description: "콘셉트 이미지와 비주얼 초안 제작에 잘 맞는 작업입니다.", clicks: 3200 },
  { label: "썸네일 제작", slug: "thumbnail-design", description: "썸네일, 배너, 간단한 디자인 작업에 잘 맞는 작업입니다.", clicks: 1750 },
  { label: "영상 대본", slug: "video-script", description: "영상 기획과 대본 초안 정리에 잘 맞는 작업입니다.", clicks: 2480 },
  { label: "자막 생성", slug: "captions", description: "자막, 전사, 번역 작업에 잘 맞는 작업입니다.", clicks: 2890 },
  { label: "번역", slug: "translation", description: "문장 번역과 현지화 보조에 잘 맞는 작업입니다.", clicks: 1560 },
  { label: "음성 합성", slug: "text-to-speech", description: "TTS와 내레이션 작업에 잘 맞는 작업입니다.", clicks: 1330 },
  { label: "자료 요약", slug: "summarization", description: "문서와 회의 내용 요약에 잘 맞는 작업입니다.", clicks: 2670 },
  { label: "고객응대", slug: "customer-support", description: "문의 대응과 응답 초안 작성에 잘 맞는 작업입니다.", clicks: 890 },
  { label: "업무 자동화", slug: "workflow-automation", description: "반복 업무 자동화와 연동 흐름 설계에 잘 맞는 작업입니다.", clicks: 1320 },
  { label: "PPT 제작", slug: "presentation", description: "슬라이드 초안과 발표 자료 구성에 잘 맞는 작업입니다.", clicks: 2100 },
  { label: "코드 작성", slug: "coding", description: "코드 생성, 수정, 설명에 잘 맞는 작업입니다.", clicks: 3450 }
] as const;

export type TaskTag = (typeof CANONICAL_TASK_TAGS)[number]["label"];
export type TaskTagSlug = (typeof CANONICAL_TASK_TAGS)[number]["slug"];

const TAG_BY_SLUG = Object.fromEntries(
  CANONICAL_TASK_TAGS.map((tag) => [tag.slug, tag])
) as Record<TaskTagSlug, (typeof CANONICAL_TASK_TAGS)[number]>;

export function isTaskTagSlug(value: string): value is TaskTagSlug {
  return CANONICAL_TASK_TAGS.some((tag) => tag.slug === value);
}

export function getTaskTagLabelBySlug(slug?: string) {
  if (!slug || !isTaskTagSlug(slug)) {
    return null;
  }

  return TAG_BY_SLUG[slug].label;
}

export function getTagsByClicks(count?: number) {
  const sorted = [...CANONICAL_TASK_TAGS].sort((a, b) => b.clicks - a.clicks);
  return typeof count === "number" ? sorted.slice(0, count) : sorted;
}

export function getTagCounts(
  tools: Array<{ primaryTag: string; secondaryTags: string[] }>
) {
  return CANONICAL_TASK_TAGS.map((tag) => {
    const count = tools.filter((tool) => {
      const tags = new Set([tool.primaryTag, ...tool.secondaryTags]);
      return tags.has(tag.label);
    }).length;

    return {
      ...tag,
      count
    };
  });
}
