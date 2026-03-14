"use client";

import { useState } from "react";
import Link from "next/link";
import { TASK_TAGS } from "@/data/tools";

export default function SubmitPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center py-12">
        <div className="card max-w-md p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-soft)]">
            <svg className="h-6 w-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="mt-5 text-xl font-bold">제보해주셔서 감사합니다</h1>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            검토 후 목록에 반영할게요. 좋은 도구를 알려주셔서 고맙습니다.
          </p>
          <div className="mt-6">
            <Link href="/tools" className="button-primary">
              도구 둘러보기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-12">
      {/* Page Header */}
      <div className="max-w-xl">
        <h1 className="text-3xl font-bold tracking-tight">좋은 도구를 함께 모아가요</h1>
        <p className="mt-3 leading-relaxed text-[var(--muted)]">
          자주 쓰거나 추천하고 싶은 AI 도구가 있다면 알려주세요. 검토 후 목록에 반영합니다.
        </p>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="card max-w-2xl p-6">
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium">도구 이름</span>
              <input 
                className="input" 
                type="text" 
                placeholder="예: Runway, Otter.ai" 
                required 
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium">공식 사이트</span>
              <input 
                className="input" 
                type="url" 
                placeholder="https://example.com" 
                required 
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-medium">어떤 작업에 좋은가요?</span>
            <select className="input" defaultValue="" required>
              <option value="" disabled>
                작업 선택
              </option>
              {TASK_TAGS.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
              <option value="기타">기타</option>
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium">추천 이유</span>
            <textarea
              className="input min-h-28 resize-y"
              placeholder="이 도구가 어떤 상황에서 유용한지, 왜 추천하고 싶은지 간단히 적어주세요."
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium">
              이메일 <span className="font-normal text-[var(--muted)]">(선택)</span>
            </span>
            <input 
              className="input" 
              type="email" 
              placeholder="반영 시 알림을 받고 싶다면 입력해주세요" 
            />
          </label>

          <button type="submit" className="button-primary">
            도구 제보하기
          </button>
        </div>
      </form>

      {/* Help Text */}
      <p className="max-w-2xl text-sm text-[var(--muted)]">
        제보하신 도구는 내부 검토를 거쳐 목록에 추가됩니다. 이미 등록된 도구의 정보 수정이 필요한 경우에도 같은 양식으로 알려주세요.
      </p>
    </div>
  );
}
