"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CANONICAL_TASK_TAGS } from "@/lib/tags";
import {
  getDefaultToolFormValues,
  slugify,
  type ToolFormValues
} from "@/lib/tool-validation";
import type { ToolFormState } from "@/lib/admin-tool-form-state";

type ToolFormProps = {
  action: (state: ToolFormState, formData: FormData) => Promise<ToolFormState>;
  initialState: ToolFormState;
  submitLabel: string;
  toolId?: string;
  previewSlug?: string;
};

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="text-sm text-red-600">{message}</p>;
}

export function ToolForm({
  action,
  initialState,
  submitLabel,
  previewSlug
}: ToolFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const values = state.values ?? getDefaultToolFormValues();
  const [nameValue, setNameValue] = useState(values.name);
  const [slugValue, setSlugValue] = useState(values.slug);
  const [slugTouched, setSlugTouched] = useState(Boolean(values.slug));

  useEffect(() => {
    setNameValue(values.name);
    setSlugValue(values.slug);
  }, [values.name, values.slug]);

  useEffect(() => {
    if (!slugTouched) {
      setSlugValue(slugify(nameValue));
    }
  }, [nameValue, slugTouched]);

  const helperTags = useMemo(() => CANONICAL_TASK_TAGS.map((tag) => tag.label).join(", "), []);

  return (
    <form action={formAction} className="space-y-6">
      {state.message ? (
        <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm">
          {state.message}
        </div>
      ) : null}

      <section className="space-y-4 rounded-xl border border-[var(--line)] bg-white p-6">
        <h2 className="text-lg font-bold">기본 정보</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-medium">이름</span>
            <input
              className="input"
              name="name"
              value={nameValue}
              onChange={(event) => setNameValue(event.target.value)}
            />
            <FieldError message={state.errors.name} />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium">슬러그</span>
            <input
              className="input"
              name="slug"
              value={slugValue}
              onChange={(event) => {
                setSlugTouched(true);
                setSlugValue(event.target.value);
              }}
            />
            <p className="text-xs text-[var(--muted)]">이름을 입력하면 자동 제안되며, 직접 수정할 수 있습니다.</p>
            <FieldError message={state.errors.slug} />
          </label>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-medium">공식 사이트 링크</span>
            <input className="input" name="officialUrl" defaultValue={values.officialUrl} />
            <FieldError message={state.errors.officialUrl} />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium">한 줄 설명</span>
            <input className="input" name="summary" defaultValue={values.summary} />
            <FieldError message={state.errors.summary} />
          </label>
        </div>

        <label className="grid gap-2">
          <span className="text-sm font-medium">상세 설명</span>
          <textarea className="input min-h-32 resize-y" name="description" defaultValue={values.description} />
          <FieldError message={state.errors.description} />
        </label>
      </section>

      <section className="space-y-4 rounded-xl border border-[var(--line)] bg-white p-6">
        <h2 className="text-lg font-bold">태그 / 검색어</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-medium">대표 작업 태그</span>
            <select className="input" name="primaryTag" defaultValue={values.primaryTag}>
              {CANONICAL_TASK_TAGS.map((tag) => (
                <option key={tag.slug} value={tag.label}>
                  {tag.label}
                </option>
              ))}
            </select>
            <FieldError message={state.errors.primaryTag} />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium">관련 작업 태그</span>
            <input className="input" name="secondaryTagsText" defaultValue={values.secondaryTagsText} />
            <p className="text-xs text-[var(--muted)]">쉼표로 구분해 입력해 주세요. 예: 자료 요약, 글쓰기</p>
          </label>
        </div>

        <label className="grid gap-2">
          <span className="text-sm font-medium">검색 별칭</span>
          <input className="input" name="searchAliasesText" defaultValue={values.searchAliasesText} />
          <p className="text-xs text-[var(--muted)]">쉼표로 구분해 입력해 주세요. 대표 태그 후보: {helperTags}</p>
        </label>
      </section>

      <section className="space-y-4 rounded-xl border border-[var(--line)] bg-white p-6">
        <h2 className="text-lg font-bold">사용 장면 / 시작 가이드</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-medium">이런 때 잘 맞아요</span>
            <textarea className="input min-h-36 resize-y" name="bestForText" defaultValue={values.bestForText} />
            <p className="text-xs text-[var(--muted)]">한 줄에 한 항목씩 입력해 주세요.</p>
            <FieldError message={state.errors.bestForText} />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium">가볍게 시작하기</span>
            <textarea className="input min-h-36 resize-y" name="quickStartText" defaultValue={values.quickStartText} />
            <p className="text-xs text-[var(--muted)]">한 줄에 한 단계씩 입력해 주세요.</p>
            <FieldError message={state.errors.quickStartText} />
          </label>
        </div>
      </section>

      <section className="space-y-4 rounded-xl border border-[var(--line)] bg-white p-6">
        <h2 className="text-lg font-bold">게시 설정</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-medium">가격</span>
            <select className="input" name="pricing" defaultValue={values.pricing}>
              <option value="무료">무료</option>
              <option value="부분 무료">부분 무료</option>
              <option value="유료">유료</option>
            </select>
            <FieldError message={state.errors.pricing} />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium">플랫폼</span>
            <select className="input" name="platform" defaultValue={values.platform}>
              <option value="웹">웹</option>
              <option value="앱">앱</option>
              <option value="웹/앱">웹/앱</option>
            </select>
            <FieldError message={state.errors.platform} />
          </label>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-medium">상태</span>
            <select className="input" name="status" defaultValue={values.status}>
              <option value="draft">draft</option>
              <option value="published">published</option>
              <option value="archived">archived</option>
            </select>
            <FieldError message={state.errors.status} />
          </label>

          <div className="grid gap-3 pt-7">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="koreanSupport" defaultChecked={values.koreanSupport} />
              한국어 지원
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="featured" defaultChecked={values.featured} />
              추천 툴로 노출
            </label>
          </div>
        </div>

        {previewSlug ? (
          <div className="rounded-lg bg-[var(--surface)] px-4 py-3 text-sm">
            <Link href={`/tools/${previewSlug}`} target="_blank" className="underline underline-offset-2">
              공개 페이지 미리보기
            </Link>
          </div>
        ) : null}
      </section>

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" name="intent" value="stay" className="button-primary" disabled={pending}>
          {pending ? "저장 중..." : submitLabel}
        </button>
        <button type="submit" name="intent" value="list" className="button-secondary" disabled={pending}>
          저장 후 목록으로
        </button>
      </div>
    </form>
  );
}
