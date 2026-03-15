import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "All In AI",
  description: "지금 딱 필요한 AI 툴을 찾아보세요. 한국어 중심 AI 툴 디렉토리."
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
          <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-white py-3">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-xl font-bold tracking-[-0.03em]">
                All In AI
              </Link>
              <nav className="flex items-center gap-1 text-sm font-medium">
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
        </div>
      </body>
    </html>
  );
}
