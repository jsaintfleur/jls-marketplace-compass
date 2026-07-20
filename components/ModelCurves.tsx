"use client";

import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { CalibrationPoint, LiftPoint } from "@/lib/types";
import { fmtPct, fmtMultiple } from "@/lib/format";

export function CalibrationCurve({ points }: { points: CalibrationPoint[] }) {
  const rows = points.map((p) => ({
    bin: `B${p.bin}`,
    predicted: p.predicted_rate,
    observed: p.observed_rate,
    ideal: p.predicted_rate,
  }));
  return (
    <div className="h-72" role="img" aria-label="Calibration curve comparing predicted repeat rate to observed repeat rate by score bin.">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={rows} margin={{ top: 8, right: 18, bottom: 8, left: 4 }}>
          <CartesianGrid stroke="var(--border-subtle)" strokeDasharray="3 3" />
          <XAxis dataKey="bin" tick={{ fill: "var(--text-tertiary)", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={(v) => fmtPct(Number(v), 0)} tick={{ fill: "var(--text-tertiary)", fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ background: "var(--bg-panel)", border: "1px solid var(--border-subtle)", borderRadius: 12, color: "var(--text-primary)" }} formatter={(value) => [fmtPct(Number(value)), ""]} />
          <Line dataKey="ideal" name="Ideal" stroke="var(--text-tertiary)" strokeDasharray="4 4" dot={false} />
          <Line dataKey="predicted" name="Predicted" stroke="var(--accent-600)" strokeWidth={2} dot={false} />
          <Line dataKey="observed" name="Observed" stroke="var(--danger)" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function LiftCurve({ points }: { points: LiftPoint[] }) {
  const rows = points.map((p) => ({ population: p.population_pct, capture: p.capture_rate, lift: p.lift ?? 0 }));
  return (
    <div className="h-72" role="img" aria-label="Lift curve showing repeaters captured as more customers are targeted.">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={rows} margin={{ top: 8, right: 18, bottom: 8, left: 4 }}>
          <CartesianGrid stroke="var(--border-subtle)" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="population" tickFormatter={(v) => `${v}%`} tick={{ fill: "var(--text-tertiary)", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={(v) => fmtPct(Number(v), 0)} tick={{ fill: "var(--text-tertiary)", fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ background: "var(--bg-panel)", border: "1px solid var(--border-subtle)", borderRadius: 12, color: "var(--text-primary)" }} formatter={(value, name) => [name === "capture" ? fmtPct(Number(value)) : fmtMultiple(Number(value)), name === "capture" ? "Capture" : "Lift"]} labelFormatter={(v) => `Target top ${v}%`} />
          <Area dataKey="capture" name="capture" stroke="var(--accent-600)" fill="var(--accent-300)" fillOpacity={0.35} strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
