"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { assertAdminAuthenticated } from "@/lib/admin-auth";
import {
  createTool,
  getAdminToolBySlug,
  updateTool
} from "@/lib/tools-repository";
import {
  formDataToToolFormValues,
  validateToolFormValues,
  type ToolFormValues
} from "@/lib/tool-validation";
import type { ToolFormState } from "@/lib/admin-tool-form-state";

async function saveTool(
  formData: FormData,
  mode: "create" | "edit",
  id?: string
): Promise<ToolFormState> {
  await assertAdminAuthenticated();

  const rawValues = formDataToToolFormValues(formData);
  const intent = String(formData.get("intent") ?? "stay");
  const validated = validateToolFormValues(rawValues);

  if (Object.keys(validated.errors).length > 0) {
    return {
      message: "입력 내용을 다시 확인해 주세요.",
      values: validated.values,
      errors: validated.errors
    };
  }

  const existing = await getAdminToolBySlug(validated.input.slug);
  if (existing && (mode === "create" || existing.id !== id)) {
    return {
      message: "이미 사용 중인 슬러그입니다.",
      values: validated.values,
      errors: {
        slug: "다른 슬러그를 입력해 주세요."
      }
    };
  }

  try {
    const saved =
      mode === "create"
        ? await createTool(validated.input)
        : await updateTool(id!, validated.input);

    revalidatePath("/");
    revalidatePath("/tools");
    revalidatePath(`/tools/${saved.slug}`);
    revalidatePath("/internal-admin/tools");

    if (intent === "list") {
      redirect("/internal-admin/tools?message=saved");
    }

    redirect(`/internal-admin/tools/${saved.id}/edit?message=saved`);
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "저장 중 오류가 발생했습니다.",
      values: validated.values,
      errors: {}
    };
  }
}

export async function createToolAction(
  _prevState: ToolFormState,
  formData: FormData
) {
  return saveTool(formData, "create");
}

export async function updateToolAction(
  id: string,
  _prevState: ToolFormState,
  formData: FormData
) {
  return saveTool(formData, "edit", id);
}
