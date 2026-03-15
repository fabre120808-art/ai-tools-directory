import {
  PLATFORM_OPTIONS,
  PRICING_OPTIONS,
  TOOL_STATUSES,
  type ToolMutationInput,
  type ToolRecord
} from "@/lib/tool-types";
import { CANONICAL_TASK_TAGS } from "@/lib/tags";

export type ToolFormValues = {
  name: string;
  slug: string;
  officialUrl: string;
  summary: string;
  description: string;
  primaryTag: string;
  secondaryTagsText: string;
  searchAliasesText: string;
  bestForText: string;
  quickStartText: string;
  pricing: ToolRecord["pricing"];
  koreanSupport: boolean;
  platform: ToolRecord["platform"];
  status: ToolRecord["status"];
  featured: boolean;
};

export type ToolFormErrors = Partial<Record<keyof ToolFormValues, string>>;

export function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function splitCommaSeparated(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitLines(value: string) {
  return value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function getDefaultToolFormValues(): ToolFormValues {
  return {
    name: "",
    slug: "",
    officialUrl: "",
    summary: "",
    description: "",
    primaryTag: CANONICAL_TASK_TAGS[0].label,
    secondaryTagsText: "",
    searchAliasesText: "",
    bestForText: "",
    quickStartText: "",
    pricing: "부분 무료",
    koreanSupport: true,
    platform: "웹",
    status: "draft",
    featured: false
  };
}

export function toolToFormValues(tool: ToolRecord): ToolFormValues {
  return {
    name: tool.name,
    slug: tool.slug,
    officialUrl: tool.officialUrl,
    summary: tool.summary,
    description: tool.description,
    primaryTag: tool.primaryTag,
    secondaryTagsText: tool.secondaryTags.join(", "),
    searchAliasesText: tool.searchAliases.join(", "),
    bestForText: tool.bestFor.join("\n"),
    quickStartText: tool.quickStart.join("\n"),
    pricing: tool.pricing,
    koreanSupport: tool.koreanSupport,
    platform: tool.platform,
    status: tool.status,
    featured: tool.featured
  };
}

export function formDataToToolFormValues(formData: FormData): ToolFormValues {
  return {
    name: String(formData.get("name") ?? "").trim(),
    slug: String(formData.get("slug") ?? "").trim(),
    officialUrl: String(formData.get("officialUrl") ?? "").trim(),
    summary: String(formData.get("summary") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    primaryTag: String(formData.get("primaryTag") ?? "").trim(),
    secondaryTagsText: String(formData.get("secondaryTagsText") ?? "").trim(),
    searchAliasesText: String(formData.get("searchAliasesText") ?? "").trim(),
    bestForText: String(formData.get("bestForText") ?? "").trim(),
    quickStartText: String(formData.get("quickStartText") ?? "").trim(),
    pricing: String(formData.get("pricing") ?? "부분 무료") as ToolRecord["pricing"],
    koreanSupport: String(formData.get("koreanSupport") ?? "") === "on",
    platform: String(formData.get("platform") ?? "웹") as ToolRecord["platform"],
    status: String(formData.get("status") ?? "draft") as ToolRecord["status"],
    featured: String(formData.get("featured") ?? "") === "on"
  };
}

export function validateToolFormValues(values: ToolFormValues) {
  const errors: ToolFormErrors = {};
  const normalizedSlug = slugify(values.slug || values.name);
  const secondaryTags = splitCommaSeparated(values.secondaryTagsText);
  const searchAliases = splitCommaSeparated(values.searchAliasesText);
  const bestFor = splitLines(values.bestForText);
  const quickStart = splitLines(values.quickStartText);

  if (!values.name) errors.name = "도구 이름을 입력해 주세요.";
  if (!normalizedSlug) errors.slug = "슬러그를 입력해 주세요.";
  if (!values.officialUrl) errors.officialUrl = "공식 사이트 링크를 입력해 주세요.";
  else {
    try {
      const url = new URL(values.officialUrl);
      if (!["http:", "https:"].includes(url.protocol)) {
        errors.officialUrl = "http 또는 https 주소를 입력해 주세요.";
      }
    } catch {
      errors.officialUrl = "올바른 링크 형식이 아닙니다.";
    }
  }

  if (!values.summary) errors.summary = "한 줄 설명을 입력해 주세요.";
  if (!CANONICAL_TASK_TAGS.some((tag) => tag.label === values.primaryTag)) {
    errors.primaryTag = "대표 태그를 선택해 주세요.";
  }

  if (!PRICING_OPTIONS.includes(values.pricing)) {
    errors.pricing = "가격 정보를 다시 선택해 주세요.";
  }

  if (!PLATFORM_OPTIONS.includes(values.platform)) {
    errors.platform = "플랫폼 정보를 다시 선택해 주세요.";
  }

  if (!TOOL_STATUSES.includes(values.status)) {
    errors.status = "상태 값을 다시 선택해 주세요.";
  }

  if (values.status === "published") {
    if (!values.description) errors.description = "게시하려면 상세 설명을 입력해 주세요.";
    if (bestFor.length === 0) errors.bestForText = "게시하려면 잘 맞는 상황을 한 줄 이상 입력해 주세요.";
    if (quickStart.length === 0) errors.quickStartText = "게시하려면 시작 가이드를 한 줄 이상 입력해 주세요.";
  }

  const input: ToolMutationInput = {
    name: values.name,
    slug: normalizedSlug,
    officialUrl: values.officialUrl,
    summary: values.summary,
    description: values.description,
    primaryTag: values.primaryTag,
    secondaryTags,
    searchAliases,
    bestFor,
    quickStart,
    pricing: values.pricing,
    koreanSupport: values.koreanSupport,
    platform: values.platform,
    status: values.status,
    featured: values.featured
  };

  return {
    values: {
      ...values,
      slug: normalizedSlug
    },
    input,
    errors
  };
}
