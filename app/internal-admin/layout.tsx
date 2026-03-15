import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Internal Admin",
  robots: {
    index: false,
    follow: false
  }
};

export default function InternalAdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-6xl px-6 py-6">
      <header className="mb-8 flex items-center justify-between border-b border-[var(--line)] pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            Internal Admin
          </p>
          <h1 className="mt-1 text-xl font-bold">도구 운영 관리</h1>
        </div>
        <form action="/api/admin/logout" method="post">
          <button type="submit" className="button-secondary">
            로그아웃
          </button>
        </form>
      </header>
      {children}
    </div>
  );
}
