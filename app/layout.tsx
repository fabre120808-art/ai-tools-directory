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
        <div className="grain" />
        <div className="page-shell">
          <header className="sticky top-0 z-20 py-5">
            <div className="card flex items-center justify-between rounded-full px-5 py-3">
              <Link href="/" className="text-lg font-black tracking-[-0.08em]">
                All In AI
              </Link>
              <nav className="flex items-center gap-2 text-sm font-medium">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full px-4 py-2 transition hover:bg-white/70"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>
          <main className="pb-20">{children}</main>
        </div>
      </body>
    </html>
  );
}
