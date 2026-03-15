import type { Tool } from "./tools";
import { extraTools100 } from "./extra-tools-100";
import { tools as baseTools } from "./tools";

export const TASK_TAGS = [
  { label: "아이디어 발상", slug: "idea-generation", description: "주제 정리, 브레인스토밍, 방향 잡기에 적합합니다.", clicks: 1420 },
  { label: "키워드 조사", slug: "keyword-research", description: "검색 주제 찾기, 자료 탐색, 리서치에 적합합니다.", clicks: 980 },
  { label: "카피 작성", slug: "copywriting", description: "광고 문구, CTA, 짧은 마케팅 문구 작성에 적합합니다.", clicks: 2150 },
  { label: "글쓰기", slug: "longform-writing", description: "장문 초안, 보고서, 블로그 글 작성에 적합합니다.", clicks: 1890 },
  { label: "이미지 생성", slug: "image-generation", description: "비주얼 시안, 컨셉 이미지, 크리에이티브 생성에 적합합니다.", clicks: 3200 },
  { label: "썸네일 제작", slug: "thumbnail-design", description: "썸네일, 배너, 카드뉴스 같은 가벼운 디자인 작업에 적합합니다.", clicks: 1750 },
  { label: "영상 대본", slug: "video-script", description: "영상 기획, 스크립트 작성, 영상 제작 보조에 적합합니다.", clicks: 2480 },
  { label: "자막/번역", slug: "captions-translation", description: "자막 생성, 전사, 번역, 더빙 보조에 적합합니다.", clicks: 2890 },
  { label: "음성 생성", slug: "text-to-speech", description: "TTS, 나레이션, 보이스오버 작업에 적합합니다.", clicks: 1560 },
  { label: "자료 요약", slug: "summarization", description: "PDF, 문서, 회의록, 리서치 요약에 적합합니다.", clicks: 2670 },
  { label: "고객 응대", slug: "customer-support", description: "챗봇, 문의 분류, 고객 지원 자동화에 적합합니다.", clicks: 890 },
  { label: "업무 자동화", slug: "workflow-automation", description: "반복 업무와 도구 연결 자동화에 적합합니다.", clicks: 1320 },
  { label: "PPT 제작", slug: "presentation", description: "슬라이드, 발표 자료, 제안서 초안 제작에 적합합니다.", clicks: 2100 },
  { label: "코드 작성", slug: "coding", description: "코드 생성, 수정, 개발 보조 작업에 적합합니다.", clicks: 3450 }
] as const;

export function getTagsByClicks(count?: number) {
  const sorted = [...TASK_TAGS].sort((a, b) => b.clicks - a.clicks);
  return count ? sorted.slice(0, count) : sorted;
}

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
