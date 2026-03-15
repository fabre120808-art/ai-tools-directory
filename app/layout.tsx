import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { getSiteUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "All In AI",
  description: "지금 필요한 AI 도구를 작업 기준으로 찾을 수 있는 한국어 기반 AI 툴 디렉토리입니다."
};

const navItems = [
  { href: "/", label: "홈" },
  { href: "/tools", label: "툴 찾기" },
  { href: "/submit", label: "툴 제보" }
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
          <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-white/95 py-3 backdrop-blur">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-xl font-bold tracking-[-0.03em]">
                All In AI
              </Link>
              <nav className="flex items-center gap-1 text-sm font-medium" aria-label="주요 메뉴">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-md px-3 py-2 text-[var(--muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>

          <main className="pb-16">{children}</main>

          <footer className="border-t border-[var(--line)] py-8 text-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold">All In AI</p>
                <p className="mt-1 text-[var(--muted)]">
                  작업 기준으로 AI 도구를 찾는 가벼운 디렉토리
                </p>
              </div>
              <nav className="flex flex-wrap gap-4 text-[var(--muted)]" aria-label="하단 링크">
                <Link href="/">홈</Link>
                <Link href="/tools">툴 찾기</Link>
                <Link href="/submit">툴 제보</Link>
              </nav>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
