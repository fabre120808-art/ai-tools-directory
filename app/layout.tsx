import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "All In - AI Tool Directory",
  description: "필요한 작업에 맞는 AI 툴을 빠르게 찾는 가벼운 디렉토리"
};

const navItems = [
  { href: "/", label: "홈" },
  { href: "/tools", label: "전체 도구" },
  { href: "/submit", label: "도구 제보" }
];

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" data-scroll-behavior="smooth">
      <body>
        <div className="page-shell">
          <header className="sticky top-0 z-20 bg-[var(--background)] py-4">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
              <Link href="/" className="text-xl font-bold tracking-tight text-[var(--accent)]">
                All In
              </Link>
              <div className="flex items-center gap-1">
                <nav className="flex items-center">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="px-4 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className="ml-4 flex items-center gap-2">
                  <div className="relative">
                    <input
                      type="search"
                      placeholder="도구 검색..."
                      className="w-48 rounded-lg border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-sm placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-soft)]"
                    />
                    <svg
                      className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <main className="pb-20">{children}</main>
          <footer className="border-t border-[var(--line)] py-8 text-center text-sm text-[var(--muted)]">
            <p>All In - AI Tool Directory</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
