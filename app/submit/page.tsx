import Link from "next/link";
import { CANONICAL_TASK_TAGS } from "@/lib/tags";

export default function SubmitPage() {
  return (
    <div className="space-y-6 py-6">
      <nav className="text-sm text-[var(--muted)]" aria-label="breadcrumb">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/">홈</Link>
          </li>
          <li>/</li>
          <li className="text-[var(--foreground)]">툴 제보</li>
        </ol>
      </nav>

      <section className="border-b border-[var(--line)] pb-6">
        <h1 className="text-2xl font-bold tracking-[-0.03em]">새로운 AI 도구를 제보해 주세요</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          아직 등록되지 않은 AI 도구가 있다면 알려 주세요. 검토 후 디렉토리에 반영할 수 있도록 살펴보고 있습니다.
        </p>
      </section>

      <section className="rounded-xl border border-[var(--line)] bg-white p-6">
        <form className="grid gap-5">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-medium">도구 이름</span>
              <input className="input" type="text" placeholder="예: Runway" />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-medium">공식 사이트</span>
              <input className="input" type="url" placeholder="https://example.com" />
            </label>
          </div>

          <label className="grid gap-2">
            <span className="text-sm font-medium">대표 작업 태그</span>
            <select className="input" defaultValue="">
              <option value="" disabled>
                태그를 선택해 주세요
              </option>
              {CANONICAL_TASK_TAGS.map((tag) => (
                <option key={tag.slug} value={tag.label}>
                  {tag.label}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium">간단한 설명</span>
            <textarea
              className="input min-h-32 resize-y"
              placeholder="이 도구가 어떤 작업에 좋은지, 누가 쓰면 좋은지 간단히 적어 주세요."
            />
          </label>

          <div className="flex flex-wrap gap-3">
            <button type="submit" className="button-primary w-fit">
              제보하기
            </button>
            <Link href="/tools" className="button-secondary">
              툴 목록으로 돌아가기
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}
