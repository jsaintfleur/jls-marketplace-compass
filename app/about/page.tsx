export const metadata = { title: "About — Marketplace Compass" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-8 pt-14">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">About Marketplace Compass</h1>

      <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-ink-soft">
        <p>
          Marketplaces and e-commerce operators sit on a firehose of order data but
          make retention, service, and expansion calls on gut feel. The gap is not more
          dashboards — it is a defensible link from <em>what a customer has done</em> to{" "}
          <em>what to do next</em>: who is about to lapse, which segment deserves the
          next campaign, and where growth actually compounds.
        </p>
        <p>
          Marketplace Compass turns raw transactions into a repeat-purchase model, an
          RFM segmentation, and a CLV proxy — presented as an operations cockpit where
          every number is traceable to public data and every model limit is stated
          plainly, including where a simple baseline beats the fancier model.
        </p>

        <h2 className="pt-4 text-xl font-semibold tracking-tight text-ink">Who it&apos;s for</h2>
        <p>
          Retention and lifecycle-marketing leads, marketplace and e-commerce operators,
          growth and CRM analysts, and customer-experience teams deciding where to spend
          finite service and win-back budget.
        </p>

        <h2 className="pt-4 text-xl font-semibold tracking-tight text-ink">About the author</h2>
        <p>
          Marketplace Compass is part of a five-product data portfolio by{" "}
          <b>Jean-Luc Saint-Fleur</b>, spanning housing, financial services, healthcare,
          retail, and transportation &amp; climate. Each product pairs a real business
          problem, credible public data, a defensible analytical method, and an
          executive-ready interface — and is honest about what the data can and cannot
          support.
        </p>

        <div className="mt-6 rounded-xl border border-slate-200 bg-panel p-5 text-sm">
          <p className="font-semibold text-ink">Built with</p>
          <p className="mt-1.5 text-ink-muted">
            Next.js 15 · TypeScript · Tailwind CSS · dependency-free SVG charts ·
            Python (Pandas, scikit-learn) · UCI Online Retail II. Deployed on Vercel.
          </p>
        </div>
      </div>
    </div>
  );
}
