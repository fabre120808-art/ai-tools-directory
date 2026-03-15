import type { ToolRecord } from "@/lib/tool-types";
import { getTaskTagLabelBySlug, type TaskTagSlug } from "@/lib/tags";

export type ToolSort = "recommended" | "name";

export type ToolFilterInput = {
  query?: string;
  tagSlug?: TaskTagSlug | "all";
  sort?: ToolSort;
};

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function getSearchBlob(tool: ToolRecord) {
  return [
    tool.name,
    tool.summary,
    tool.description,
    ...tool.bestFor,
    tool.primaryTag,
    ...tool.secondaryTags,
    ...tool.searchAliases
  ]
    .join(" ")
    .toLowerCase();
}

function getRelevanceScore(tool: ToolRecord, query: string, selectedTag: string | null) {
  const q = normalize(query);

  if (!q && !selectedTag) {
    return 0;
  }

  let score = 0;
  const name = tool.name.toLowerCase();
  const summary = tool.summary.toLowerCase();
  const bestFor = tool.bestFor.join(" ").toLowerCase();
  const primary = tool.primaryTag.toLowerCase();
  const secondary = tool.secondaryTags.join(" ").toLowerCase();

  if (q) {
    if (name === q) score += 100;
    else if (name.includes(q)) score += 40;

    if (primary.includes(q)) score += 30;
    if (secondary.includes(q)) score += 20;
    if (summary.includes(q)) score += 15;
    if (bestFor.includes(q)) score += 15;
  }

  if (selectedTag) {
    if (tool.primaryTag === selectedTag) score += 50;
    else if (tool.secondaryTags.includes(selectedTag)) score += 20;
  }

  return score;
}

export function filterTools(tools: ToolRecord[], input: ToolFilterInput) {
  const query = normalize(input.query ?? "");
  const selectedTag =
    input.tagSlug && input.tagSlug !== "all" ? getTaskTagLabelBySlug(input.tagSlug) : null;
  const sort = input.sort ?? "recommended";

  const filtered = tools.filter((tool) => {
    const matchesTag =
      !selectedTag || tool.primaryTag === selectedTag || tool.secondaryTags.includes(selectedTag);

    const matchesQuery = !query || getSearchBlob(tool).includes(query);

    return matchesTag && matchesQuery;
  });

  if (sort === "name") {
    return [...filtered].sort((a, b) => a.name.localeCompare(b.name, "ko"));
  }

  return [...filtered].sort((a, b) => {
    const scoreA = getRelevanceScore(a, query, selectedTag);
    const scoreB = getRelevanceScore(b, query, selectedTag);

    if (scoreB !== scoreA) return scoreB - scoreA;

    if (selectedTag) {
      const aPrimary = a.primaryTag === selectedTag ? 1 : 0;
      const bPrimary = b.primaryTag === selectedTag ? 1 : 0;

      if (bPrimary !== aPrimary) return bPrimary - aPrimary;
    }

    return a.name.localeCompare(b.name, "ko");
  });
}
