"use client";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ko">
      <body className="bg-[var(--background)] text-[var(--foreground)]">
        <main className="page-shell flex min-h-screen items-center justify-center py-10">
          <div className="card max-w-xl rounded-[32px] p-8 text-center">
            <p className="eyebrow">오류 발생</p>
            <h1 className="mt-4 text-4xl font-black tracking-[-0.06em]">
              화면을 불러오는 중 문제가 생겼습니다
            </h1>
            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
              {error.digest ? `참고 코드: ${error.digest}` : "잠시 후 다시 시도해주세요."}
            </p>
            <button type="button" onClick={() => reset()} className="button-primary mt-6 border-0">
              다시 시도하기
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
