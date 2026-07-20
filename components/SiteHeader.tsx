import Link from "next/link";
import { ThemeToggle } from "@/lib/design/primitives";

const NAV = [
  { href: "/", label: "Executive Overview" },
  { href: "/methodology", label: "Methodology & Data" },
  { href: "/about", label: "About" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--chrome-border)] bg-[var(--chrome-bg)] backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-4">
        <Link href="/" className="ds-focus-ring flex items-center gap-2.5 rounded-lg">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent-600)] text-white shadow-[var(--shadow-1)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
              <path d="m14.5 9.5-2 5-3 1 2-5 3-1Z" fill="currentColor" />
            </svg>
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-[var(--chrome-text)]">Marketplace Compass</span>
        </Link>
          <div className="lg:hidden">
            <ThemeToggle />
          </div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <nav aria-label="Primary" className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="rounded-md px-3 py-1.5 text-sm font-medium text-[var(--chrome-muted)] transition-colors hover:bg-[var(--chrome-hover)] hover:text-[var(--chrome-text)]"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="hidden lg:block">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
