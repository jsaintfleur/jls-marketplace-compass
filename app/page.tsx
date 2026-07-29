import Link from "next/link";
import { getSummary, getModelMetrics, getSegments, getSources } from "@/lib/data";
import { fmtInt, fmtPct, fmtCurrencyCompact, fmtDecimal } from "@/lib/format";
import { KpiCard } from "@/components/KpiCard";
import { ModelCard } from "@/components/ModelCard";
import { FeatureImportanceChart } from "@/components/FeatureImportanceChart";
import { SegmentBarChart } from "@/components/SegmentBarChart";
import { SegmentsTable } from "@/components/SegmentsTable";

export default function OverviewPage() {
  const s = getSummary();
  const m = getModelMetrics();
  const seg = getSegments();
  const src = getSources();

  const [rangeStart, rangeEnd] = s.date_range;
  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short" });

  return (
    <div className="mx-auto max-w-7xl px-6">
      <section className="pt-14 pb-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-[var(--accent-text)]">
          Retail Analytics · Retention Intelligence
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Turn every order into a retention, service, and expansion decision.
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
          Marketplace Compass reads raw transactions and returns the three answers
          operators act on: who is about to churn, which segment to serve next, and
          where the next dollar of growth lives — each traceable to the data and
          honest about model limits.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
          <Link
            href="/methodology"
            className="rounded-lg bg-brand-700 px-4 py-2 font-medium text-white transition-colors hover:bg-brand-800"
          >
            How the models work
          </Link>
          <span className="inline-flex items-center gap-1.5 text-ink-muted">
            <span className="h-2 w-2 rounded-full bg-brand-500" />
            {fmtDate(rangeStart)} – {fmtDate(rangeEnd)} · UCI Online Retail II (CC BY 4.0)
          </span>
        </div>
      </section>

      <section aria-label="Key metrics" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <KpiCard label="Customers" value={fmtInt(s.customers)} sub="unique buyers" hint="Distinct customers after cleaning." />
        <KpiCard label="Orders" value={fmtInt(s.orders)} sub="invoices" hint="Distinct completed orders (invoices)." />
        <KpiCard label="Revenue" value={fmtCurrencyCompact(s.revenue)} sub="gross, all-time" hint="Total cleaned line-item revenue across the window." />
        <KpiCard label="Repeat rate" value={fmtPct(s.repeat_rate_overall)} sub="≥2 orders" hint="Share of customers with more than one order." />
        <KpiCard label="Model ROC-AUC" value={fmtDecimal(s.model_roc_auc)} sub={`baseline ${fmtDecimal(s.baseline_roc_auc)}`} hint="Gradient-boosted repeat-purchase model on the temporal holdout." />
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <ModelCard m={m} />
        <div className="rounded-xl border border-slate-200 bg-panel p-6 shadow-card">
          <h2 className="text-lg font-semibold tracking-tight text-ink">
            What drives the prediction
          </h2>
          <p className="mt-1 text-sm text-ink-muted">
            Permutation importance on the test set. Recency dominates; frequency and
            monetary follow — a textbook RFM signal, measured not assumed.
          </p>
          <div className="mt-5">
            <FeatureImportanceChart importances={m.feature_importance_auc_drop} />
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-4">
          <h2 className="text-xl font-semibold tracking-tight text-ink">
            Customer segments (RFM)
          </h2>
          <p className="mt-1 text-sm text-ink-muted">
            {fmtInt(seg.n_customers)} customers scored on recency, frequency, and
            monetary value, then labeled into five actionable segments as of{" "}
            {new Date(seg.as_of_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            .
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <SegmentsTable segments={seg.segments} />
          <div className="rounded-xl border border-slate-200 bg-panel p-6 shadow-card">
            <h3 className="text-sm font-semibold tracking-tight text-ink">
              Segment size vs. value
            </h3>
            <p className="mt-1 text-xs text-ink-muted">
              Many customers sit in low-value segments; a small Champions core carries
              outsized spend.
            </p>
            <div className="mt-4">
              <SegmentBarChart segments={seg.segments} />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 rounded-xl border border-amber-200 bg-amber-50/70 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-amber-800">
          What is computed vs. proposed
        </h2>
        <div className="mt-3 grid gap-6 text-sm leading-relaxed text-amber-900/90 md:grid-cols-2">
          <div>
            <p className="font-semibold text-amber-900">Computed here (measured results)</p>
            <ul className="mt-2 ml-4 list-disc space-y-1">
              {src.labels.computed.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-amber-900">Proposed (needs Olist data)</p>
            <ul className="mt-2 ml-4 list-disc space-y-1">
              {src.labels.proposed_requires_olist.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-4 max-w-4xl text-[13px] leading-relaxed text-amber-900/90">
          This demo runs on <b>UCI Online Retail II</b> (CC BY 4.0) — a keyless,
          directly downloadable dataset. <b>Olist Brazilian E-Commerce</b> is the
          richer PRIMARY target: its delivery timestamps and geolocation would unlock
          order-level late-delivery risk and a Brazil geospatial expansion model — but
          it is Kaggle-gated (CC BY-NC-SA 4.0) and not used here. The substitution is
          stated plainly rather than papered over.
        </p>
      </section>
    </div>
  );
}
