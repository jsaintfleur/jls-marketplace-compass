"use client";

import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { fmtCurrencyCompact, fmtInt, segmentColor } from "@/lib/format";
import type { Segment } from "@/lib/types";

export function SegmentBarChart({ segments }: { segments: Segment[] }) {
  const rows = [...segments].sort((a, b) => b.customers - a.customers);

  return (
    <div className="h-80" role="img" aria-label="RFM segment sizes by customer count with average spend in tooltip.">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={rows} margin={{ top: 8, right: 18, bottom: 8, left: 4 }}>
          <CartesianGrid stroke="var(--border-subtle)" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="segment" tick={{ fill: "var(--text-tertiary)", fontSize: 12 }} axisLine={false} tickLine={false} interval={0} />
          <YAxis tick={{ fill: "var(--text-tertiary)", fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: "var(--bg-panel)", border: "1px solid var(--border-subtle)", borderRadius: 12, color: "var(--text-primary)", boxShadow: "var(--shadow-1)" }}
            formatter={(value, name, props) => [
              `${fmtInt(Number(value))} customers; avg spend ${fmtCurrencyCompact(props.payload.avg_monetary)}`,
              "Segment size",
            ]}
          />
          <Bar dataKey="customers" radius={[6, 6, 0, 0]} isAnimationActive>
            {rows.map((s) => <Cell key={s.segment} fill={segmentColor(s.segment)} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
