export const TOOL_STATUSES = ["draft", "published", "archived"] as const;
export const PRICING_OPTIONS = ["무료", "부분 무료", "유료"] as const;
export const PLATFORM_OPTIONS = ["웹", "앱", "웹/앱"] as const;

export type ToolStatus = (typeof TOOL_STATUSES)[number];
export type PricingOption = (typeof PRICING_OPTIONS)[number];
export type PlatformOption = (typeof PLATFORM_OPTIONS)[number];

export type ToolRecord = {
  id: string;
  name: string;
  slug: string;
  officialUrl: string;
  summary: string;
  description: string;
  primaryTag: string;
  secondaryTags: string[];
  searchAliases: string[];
  bestFor: string[];
  quickStart: string[];
  pricing: PricingOption;
  koreanSupport: boolean;
  platform: PlatformOption;
  status: ToolStatus;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ToolMutationInput = Omit<ToolRecord, "id" | "createdAt" | "updatedAt">;
