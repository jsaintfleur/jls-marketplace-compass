import { SectionHeader } from "@/lib/design/primitives";

export const metadata = { title: "About — Marketplace Compass" };

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 pb-10 pt-12 sm:px-6">
      <SectionHeader eyebrow="About Marketplace Compass" title="A retention cockpit for model-aware growth teams">
        <p>
          Marketplace Compass helps CRM and growth teams turn transaction history into campaign
          priorities, segment actions, and threshold economics without hiding model limits.
        </p>
      </SectionHeader>

      <div className="space-y-5 text-[15px] leading-relaxed text-[var(--text-secondary)]">
        <p>
          The product pairs a repeat-purchase model with calibration, lift, and a segment playbook.
          Its most important design choice is honesty: a logistic baseline slightly wins ROC-AUC, so
          the dashboard emphasizes ranking, economics, and validation rather than pretending the
          fancier model is always better.
        </p>
        <p>
          It is built for planning, not blind automation. A retention lead can set a threshold, size
          a campaign, choose segment-specific actions, and export a scored customer file for review.
        </p>

        <section className="rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--bg-panel)] p-5 shadow-[var(--shadow-1)]">
          <h2 className="text-xl font-semibold tracking-tight text-[var(--text-primary)]">Who it is for</h2>
          <p className="mt-3">
            CRM leads, lifecycle marketers, retention analysts, growth PMs, marketplace operators,
            and customer-experience teams deciding where finite offer budget should go.
          </p>
        </section>

        <section className="rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--bg-panel)] p-5 shadow-[var(--shadow-1)]">
          <h2 className="text-xl font-semibold tracking-tight text-[var(--text-primary)]">About the author</h2>
          <p className="mt-3">
            Marketplace Compass is part of a five-product data portfolio by <b>Jean-Luc Saint-Fleur</b>,
            spanning housing, financial services, healthcare, retail, and transportation. Each product
            pairs a real business problem, credible public data, defensible analytics, and an
            executive-ready interface.
          </p>
        </section>

        <section className="rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--bg-panel)] p-5 shadow-[var(--shadow-1)]">
          <h2 className="text-xl font-semibold tracking-tight text-[var(--text-primary)]">Built with</h2>
          <p className="mt-3">
            Next.js 15, TypeScript, Tailwind CSS, Recharts, Python, Pandas, scikit-learn, and UCI
            Online Retail II public data. Deployed on Vercel.
          </p>
        </section>
      </div>
    </main>
  );
}
