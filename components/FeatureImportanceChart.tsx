"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { featureLabel, fmtDecimal } from "@/lib/format";

export function FeatureImportanceChart({ importances }: { importances: Record<string, number> }) {
  const rows = Object.entries(importances)
    .sort((a, b) => b[1] - a[1])
    .map(([feature, aucDrop]) => ({ feature: featureLabel(feature), aucDrop: Math.max(0, aucDrop), raw: aucDrop }));

  if (!rows.length) {
    return <div className="rounded-[var(--radius-lg)] border border-dashed border-[var(--border-subtle)] p-6 text-sm text-[var(--text-tertiary)]">Feature importance is unavailable.</div>;
  }

  return (
    <div className="h-80" role="img" aria-label="Permutation feature importance by ROC-AUC drop.">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={rows} layout="vertical" margin={{ top: 8, right: 22, bottom: 8, left: 16 }}>
          <CartesianGrid stroke="var(--border-subtle)" strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" tick={{ fill: "var(--text-tertiary)", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis dataKey="feature" type="category" width={132} tick={{ fill: "var(--text-secondary)", fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: "var(--bg-panel)", border: "1px solid var(--border-subtle)", borderRadius: 12, color: "var(--text-primary)", boxShadow: "var(--shadow-1)" }}
            formatter={(value) => [fmtDecimal(Number(value)), "ROC-AUC drop"]}
          />
          <Bar dataKey="aucDrop" fill="var(--accent-600)" radius={[0, 8, 8, 0]} isAnimationActive />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
