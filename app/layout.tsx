import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "PromptShelf",
  description: "A lightweight AI tool directory MVP built with Next.js App Router."
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Tools" },
  { href: "/submit", label: "Submit" }
];

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="grain" />
        <div className="page-shell">
          <header className="sticky top-0 z-20 py-5">
            <div className="card flex items-center justify-between rounded-full px-5 py-3">
              <Link href="/" className="text-lg font-black tracking-[-0.08em]">
                PromptShelf
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
