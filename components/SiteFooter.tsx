export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-[var(--border-default)] bg-[var(--bg-panel)]">
      <div className="mx-auto max-w-7xl px-6 py-10 text-sm text-ink-muted">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <p className="font-semibold text-ink">Marketplace Compass</p>
            <p className="mt-1.5 leading-relaxed">
              A portfolio project by Jean-Luc Saint-Fleur. Retention, service, and expansion
              intelligence for marketplace and e-commerce operators, built on public transaction data.
            </p>
          </div>
          <div className="text-xs leading-relaxed">
            <p className="font-semibold uppercase tracking-wide text-ink-soft">Data source</p>
            <p className="mt-1.5">
              UCI Online Retail II — CC BY 4.0, keyless demo download.
              <br />Olist Brazilian E-Commerce is the richer, Kaggle-gated target (proposed).
            </p>
          </div>
        </div>
        <p className="mt-8 border-t border-[var(--border-subtle)] pt-5 text-xs text-ink-faint">
          Demonstration analytics on public data. Model metrics are measured on a temporal holdout and
          reported honestly, including where the baseline wins. Not investment or business advice.
        </p>
      </div>
    </footer>
  );
}
