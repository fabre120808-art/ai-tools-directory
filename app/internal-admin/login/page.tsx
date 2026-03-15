import type { Metadata } from "next";
import { isAdminAuthConfigured } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "관리자 로그인",
  robots: {
    index: false,
    follow: false
  }
};

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
    from?: string;
  }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const { error, from } = await searchParams;
  const configured = isAdminAuthConfigured();

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-6">
      <div className="w-full rounded-2xl border border-[var(--line)] bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold">관리자 로그인</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          관리자만 접근할 수 있는 페이지입니다.
        </p>

        {!configured ? (
          <div className="mt-6 rounded-lg border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm">
            `ADMIN_PASSWORD`와 `ADMIN_SESSION_SECRET`이 설정되지 않았습니다.
          </div>
        ) : null}

        {error ? (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error === "invalid" ? "비밀번호가 올바르지 않습니다." : "로그인할 수 없습니다."}
          </div>
        ) : null}

        <form action="/api/admin/login" method="post" className="mt-6 grid gap-4">
          <input type="hidden" name="redirectTo" value={from || "/internal-admin/tools"} />
          <label className="grid gap-2">
            <span className="text-sm font-medium">비밀번호</span>
            <input
              type="password"
              name="password"
              className="input"
              autoComplete="current-password"
              disabled={!configured}
            />
          </label>
          <button type="submit" className="button-primary w-full" disabled={!configured}>
            로그인
          </button>
        </form>
      </div>
    </main>
  );
}
