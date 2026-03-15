import { ToolForm } from "@/components/admin/tool-form";
import { createToolAction } from "@/app/internal-admin/tools/actions";
import { getInitialToolFormState } from "@/lib/admin-tool-form-state";
import { getDatabaseStatus } from "@/lib/tools-repository";

export const dynamic = "force-dynamic";

export default async function AdminNewToolPage() {
  const databaseStatus = await getDatabaseStatus();

  if (!databaseStatus.ready) {
    return (
      <div className="rounded-xl border border-[var(--line)] bg-white p-6">
        <h2 className="text-xl font-bold">설정 필요</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          {databaseStatus.message ?? "DB 설정이 완료되어야 새 도구를 만들 수 있습니다."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-bold">새 도구 추가</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          첫 버전에서는 도구 정보, 태그, 게시 상태만 가볍게 관리합니다.
        </p>
      </section>
      <ToolForm
        action={createToolAction}
        initialState={getInitialToolFormState()}
        submitLabel="도구 저장"
      />
    </div>
  );
}
