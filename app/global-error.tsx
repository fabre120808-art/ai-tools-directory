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
            <p className="eyebrow">Something went wrong</p>
            <h1 className="mt-4 text-4xl font-black tracking-[-0.06em]">
              A rendering error occurred
            </h1>
            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
              {error.digest
                ? `Reference: ${error.digest}`
                : "Please try refreshing the page."}
            </p>
            <button type="button" onClick={() => reset()} className="button-primary mt-6 border-0">
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
