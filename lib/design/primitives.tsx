"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useEffect, useState } from "react";

type Tone = "neutral" | "accent" | "success" | "warning" | "danger" | "info";

const toneClass: Record<Tone, string> = {
  neutral: "border-[var(--border-default)] bg-[var(--bg-panel)] text-[var(--text-secondary)]",
  accent: "border-transparent bg-[var(--accent-600)] text-white",
  success: "border-transparent bg-[var(--success)] text-white",
  warning: "border-transparent bg-[var(--warning)] text-white",
  danger: "border-transparent bg-[var(--danger)] text-white",
  info: "border-transparent bg-[var(--info)] text-white",
};

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const variantClass =
    variant === "primary"
      ? "bg-[var(--accent-600)] text-white hover:bg-[var(--accent-700)]"
      : variant === "secondary"
        ? "border border-[var(--border-default)] bg-[var(--bg-panel)] text-[var(--text-primary)] hover:bg-[var(--bg-inset)]"
        : "text-[var(--text-secondary)] hover:bg-[var(--bg-inset)]";
  return (
    <button
      className={`ds-focus-ring inline-flex min-h-10 items-center justify-center rounded-[var(--radius-md)] px-4 py-2 text-sm font-semibold transition ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`ds-card-hover rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--bg-panel)] p-5 shadow-[var(--shadow-1)] ${className}`}>
      {children}
    </section>
  );
}

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: Tone }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${toneClass[tone]}`}>
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-6 max-w-3xl">
      {eyebrow ? <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-text)]">{eyebrow}</p> : null}
      <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)] md:text-3xl">{title}</h2>
      {children ? <div className="mt-2 text-sm leading-6 text-[var(--text-tertiary)] md:text-base">{children}</div> : null}
    </div>
  );
}

export function Tooltip({ label, children }: { label: string; children: ReactNode }) {
  return (
    <span className="group relative inline-flex">
      <span tabIndex={0} className="ds-focus-ring rounded-sm">{children}</span>
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-64 -translate-x-1/2 rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--bg-panel)] px-3 py-2 text-xs leading-5 text-[var(--text-secondary)] opacity-0 shadow-[var(--shadow-2)] transition group-hover:opacity-100 group-focus-within:opacity-100"
      >
        {label}
      </span>
    </span>
  );
}

export function StatCard({
  label,
  value,
  definition,
  children,
}: {
  label: string;
  value: string;
  definition: string;
  children?: ReactNode;
}) {
  return (
    <Card className="min-h-36">
      <div className="flex items-start justify-between gap-4">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--text-tertiary)]">{label}</p>
        <Tooltip label={definition}>
          <span aria-label={definition} className="cursor-help text-[var(--text-tertiary)]">?</span>
        </Tooltip>
      </div>
      <p className="ds-tabular mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">{value}</p>
      {children ? <div className="mt-4">{children}</div> : null}
    </Card>
  );
}

export function Tabs({
  tabs,
}: {
  tabs: { id: string; label: string; content: ReactNode }[];
}) {
  const [active, setActive] = useState(tabs[0]?.id);
  return (
    <div>
      <div role="tablist" aria-label="View options" className="inline-flex rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-inset)] p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            className={`ds-focus-ring rounded-[var(--radius-md)] px-3 py-1.5 text-sm font-semibold transition ${
              active === tab.id ? "bg-[var(--bg-panel)] text-[var(--text-primary)] shadow-[var(--shadow-1)]" : "text-[var(--text-tertiary)]"
            }`}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">{tabs.find((tab) => tab.id === active)?.content}</div>
    </div>
  );
}

export function Callout({ tone = "info", title, children }: { tone?: Tone; title: string; children: ReactNode }) {
  return (
    <aside className={`rounded-[var(--radius-lg)] border p-4 ${toneClass[tone]}`}>
      <p className="font-semibold">{title}</p>
      <div className="mt-1 text-sm leading-6 opacity-90">{children}</div>
    </aside>
  );
}

export function DataTable({
  caption,
  columns,
  rows,
}: {
  caption: string;
  columns: string[];
  rows: (string | number)[][];
}) {
  return (
    <div className="overflow-x-auto rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--bg-panel)]">
      <table className="min-w-[42rem] w-full text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-[var(--bg-inset)] text-left text-xs uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
          <tr>{columns.map((column) => <th key={column} className="px-4 py-3 font-semibold">{column}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-t border-[var(--border-subtle)]">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-3 text-[var(--text-secondary)]">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return <StateFrame title={title}>{children ?? "No records match the current filters."}</StateFrame>;
}

export function ErrorState({ title, children }: { title: string; children?: ReactNode }) {
  return <StateFrame title={title} tone="danger">{children ?? "The data view could not load. Try again or use the source table."}</StateFrame>;
}

function StateFrame({ title, children, tone = "neutral" }: { title: string; children: ReactNode; tone?: Tone }) {
  return (
    <div className={`rounded-[var(--radius-xl)] border border-dashed p-6 text-center ${toneClass[tone]}`}>
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-sm opacity-85">{children}</p>
    </div>
  );
}

export function Skeleton({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`animate-pulse rounded-[var(--radius-md)] bg-slate-200/70 dark:bg-slate-700/70 ${className}`} />;
}

export function Legend({ items }: { items: { label: string; color: string }[] }) {
  return (
    <ul className="flex flex-wrap gap-3 text-sm text-[var(--text-secondary)]">
      {items.map((item) => (
        <li key={item.label} className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm" style={{ background: item.color }} aria-hidden />
          {item.label}
        </li>
      ))}
    </ul>
  );
}

export function ChartShell({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <Card>
      <div className="mb-4">
        <h3 className="font-semibold text-[var(--text-primary)]">{title}</h3>
        <p className="mt-1 text-sm text-[var(--text-tertiary)]">{description}</p>
      </div>
      <div role="img" aria-label={`${title}. ${description}`} className="min-h-48 rounded-[var(--radius-lg)] bg-[var(--bg-inset)] p-4">
        {children}
      </div>
    </Card>
  );
}

export function MapShell({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <Card>
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="font-semibold text-[var(--text-primary)]">{title}</h3>
          <p className="mt-1 text-sm text-[var(--text-tertiary)]">{description}</p>
        </div>
        <Button variant="secondary">Reset view</Button>
      </div>
      <div role="application" aria-label={`${title}. ${description}`} className="min-h-72 overflow-hidden rounded-[var(--radius-lg)] bg-[var(--bg-inset)]">
        {children}
      </div>
    </Card>
  );
}

export function FreshnessPill({ label }: { label: string }) {
  return <Badge tone="success">Freshness: {label}</Badge>;
}

export function SourceAttribution({ children }: { children: ReactNode }) {
  return <p className="text-xs leading-5 text-[var(--text-tertiary)]">Source: {children}</p>;
}

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  const applyTheme = (nextDark: boolean) => {
    setDark(nextDark);
    document.documentElement.classList.toggle("dark", nextDark);
    document.documentElement.classList.toggle("light", !nextDark);
    window.localStorage.setItem("jls-theme", nextDark ? "dark" : "light");
  };

  useEffect(() => {
    const saved = window.localStorage.getItem("jls-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = saved ? saved === "dark" : prefersDark;
    setDark(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
    document.documentElement.classList.toggle("light", !shouldUseDark);
  }, []);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label={dark ? "Use light mode" : "Use dark mode"}
      onClick={() => applyTheme(!dark)}
      className="ds-focus-ring inline-flex items-center gap-2 rounded-full text-sm font-semibold text-[var(--chrome-muted)] transition hover:text-[var(--chrome-text)]"
    >
      <span
        aria-hidden
        className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border p-0.5 transition ${
          dark
            ? "border-[var(--accent-600)] bg-[var(--accent-600)]"
            : "border-[var(--border-default)] bg-[var(--bg-inset)]"
        }`}
      >
        <span
          className={`block h-4 w-4 rounded-full bg-white shadow-[var(--shadow-1)] transition ${
            dark ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </span>
      <span>{dark ? "Light" : "Dark"} mode</span>
    </button>
  );
}
