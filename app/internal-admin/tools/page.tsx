import Link from "next/link";
import { ToolList } from "@/components/admin/tool-list";
import { CANONICAL_TASK_TAGS } from "@/lib/tags";
import { listAdminTools } from "@/lib/tools-repository";

type AdminToolsPageProps = {
  searchParams: Promise<{
    q?: string;
    status?: "all" | "draft" | "published" | "archived";
    tag?: string;
    message?: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function AdminToolsPage({ searchParams }: AdminToolsPageProps) {
  const { q = "", status = "all", tag = "all", message } = await searchParams;
  const { tools, databaseStatus } = await listAdminTools({
    query: q,
    status,
    primaryTag: tag
  });

  return (
    <div className="space-y-6">
      <section className="space-y-2">
        <h2 className="text-2xl font-bold">도구 관리</h2>
        <p className="text-sm text-[var(--muted)]">
          공개할 도구를 추가하고 수정할 수 있습니다.
        </p>
      </section>

      {message === "saved" ? (
        <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm">
          저장이 완료되었습니다.
        </div>
      ) : null}

      {!databaseStatus.ready ? (
        <div className="rounded-xl border border-[var(--line)] bg-white p-5">
          <h3 className="text-base font-semibold">설정 필요</h3>
          <p className="mt-2 text-sm text-[var(--muted)]">
            {databaseStatus.message ?? "관리자 기능을 사용하려면 DB 설정이 필요합니다."}
          </p>
        </div>
      ) : null}

      <section className="rounded-xl border border-[var(--line)] bg-white p-5">
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={databaseStatus.ready ? "/internal-admin/tools/new" : "#"}
            aria-disabled={!databaseStatus.ready}
            className={`button-primary ${!databaseStatus.ready ? "pointer-events-none opacity-50" : ""}`}
          >
            새 도구 추가
          </Link>

          <form className="flex flex-1 flex-wrap gap-3">
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="이름, 슬러그, 요약 검색"
              className="input min-w-56 flex-1"
            />
            <select name="status" defaultValue={status} className="input w-auto min-w-36">
              <option value="all">모든 상태</option>
              <option value="draft">draft</option>
              <option value="published">published</option>
              <option value="archived">archived</option>
            </select>
            <select name="tag" defaultValue={tag} className="input w-auto min-w-40">
              <option value="all">모든 대표 태그</option>
              {CANONICAL_TASK_TAGS.map((item) => (
                <option key={item.slug} value={item.label}>
                  {item.label}
                </option>
              ))}
            </select>
            <button type="submit" className="button-secondary">
              적용
            </button>
          </form>
        </div>
      </section>

      <ToolList tools={tools} />
    </div>
  );
}
