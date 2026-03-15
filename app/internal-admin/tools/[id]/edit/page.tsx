import { notFound } from "next/navigation";
import { ToolForm } from "@/components/admin/tool-form";
import { updateToolAction } from "@/app/internal-admin/tools/actions";
import { getInitialToolFormState } from "@/lib/admin-tool-form-state";
import { getAdminToolById, getDatabaseStatus } from "@/lib/tools-repository";
import { toolToFormValues } from "@/lib/tool-validation";

type EditPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ message?: string }>;
};

export const dynamic = "force-dynamic";

export default async function AdminEditToolPage({
  params,
  searchParams
}: EditPageProps) {
  const { id } = await params;
  const { message } = await searchParams;
  const databaseStatus = await getDatabaseStatus();

  if (!databaseStatus.ready) {
    return (
      <div className="rounded-xl border border-[var(--line)] bg-white p-6">
        <h2 className="text-xl font-bold">설정 필요</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          {databaseStatus.message ?? "DB 설정이 완료되어야 수정 기능을 사용할 수 있습니다."}
        </p>
      </div>
    );
  }

  const tool = await getAdminToolById(id);

  if (!tool) {
    notFound();
  }

  const boundAction = updateToolAction.bind(null, tool.id);

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-bold">{tool.name} 수정</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          저장 즉시 public과 admin이 같은 데이터 소스를 보게 됩니다.
        </p>
      </section>

      {message === "saved" ? (
        <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm">
          저장이 완료되었습니다.
        </div>
      ) : null}

      <ToolForm
        action={boundAction}
        initialState={getInitialToolFormState(toolToFormValues(tool))}
        submitLabel="변경 저장"
        previewSlug={tool.status === "published" ? tool.slug : undefined}
      />
    </div>
  );
}
