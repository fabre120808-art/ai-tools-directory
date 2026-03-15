import Link from "next/link";
import type { ToolRecord } from "@/lib/tool-types";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date(value));
}

function statusLabel(status: ToolRecord["status"]) {
  if (status === "published") return "게시됨";
  if (status === "archived") return "보관됨";
  return "임시저장";
}

export function ToolList({ tools }: { tools: ToolRecord[] }) {
  if (tools.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[var(--line)] bg-white px-6 py-10 text-center text-sm text-[var(--muted)]">
        조건에 맞는 도구가 없습니다.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--line)] bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-[var(--surface)] text-left text-[var(--muted)]">
          <tr>
            <th className="px-4 py-3 font-medium">이름</th>
            <th className="px-4 py-3 font-medium">대표 태그</th>
            <th className="px-4 py-3 font-medium">상태</th>
            <th className="px-4 py-3 font-medium">마지막 수정일</th>
            <th className="px-4 py-3 font-medium">액션</th>
          </tr>
        </thead>
        <tbody>
          {tools.map((tool) => (
            <tr key={tool.id} className="border-t border-[var(--line)]">
              <td className="px-4 py-3">
                <div className="font-medium">{tool.name}</div>
                <div className="mt-1 text-xs text-[var(--muted)]">{tool.slug}</div>
              </td>
              <td className="px-4 py-3">{tool.primaryTag}</td>
              <td className="px-4 py-3">{statusLabel(tool.status)}</td>
              <td className="px-4 py-3">{formatDate(tool.updatedAt)}</td>
              <td className="px-4 py-3">
                <div className="flex gap-3">
                  <Link href={`/internal-admin/tools/${tool.id}/edit`} className="underline underline-offset-2">
                    편집
                  </Link>
                  {tool.status === "published" ? (
                    <Link href={`/tools/${tool.slug}`} target="_blank" className="underline underline-offset-2 text-[var(--muted)]">
                      미리보기
                    </Link>
                  ) : (
                    <span className="text-[var(--muted)]">미리보기 없음</span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
