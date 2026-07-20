"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { CalibrationPoint, LiftPoint, Segment, ThresholdPolicyRow } from "@/lib/types";

const Skeleton = ({ height }: { height: number }) => (
  <div aria-hidden="true" className="animate-pulse rounded-[var(--radius-xl)] bg-[var(--bg-inset)]" style={{ height }} />
);

const DynamicFeatureImportanceChart = dynamic(() => import("./FeatureImportanceChart").then((m) => m.FeatureImportanceChart), { loading: () => <Skeleton height={320} /> });
const DynamicSegmentBarChart = dynamic(() => import("./SegmentBarChart").then((m) => m.SegmentBarChart), { loading: () => <Skeleton height={320} /> });
const DynamicCalibrationCurve = dynamic(() => import("./ModelCurves").then((m) => m.CalibrationCurve), { loading: () => <Skeleton height={288} /> });
const DynamicLiftCurve = dynamic(() => import("./ModelCurves").then((m) => m.LiftCurve), { loading: () => <Skeleton height={288} /> });
const DynamicThresholdSimulator = dynamic(() => import("./ThresholdSimulator").then((m) => m.ThresholdSimulator), { loading: () => <Skeleton height={220} /> });

export function LazyThresholdSimulator({ rows }: { rows: ThresholdPolicyRow[] }) {
  const { ref, visible } = useDeferredVisible<HTMLDivElement>();
  return <div ref={ref}>{visible ? <DynamicThresholdSimulator rows={rows} /> : <Skeleton height={220} />}</div>;
}

export function LazyCalibrationCurve({ points }: { points: CalibrationPoint[] }) {
  const { ref, visible } = useDeferredVisible<HTMLDivElement>();
  return <div ref={ref}>{visible ? <DynamicCalibrationCurve points={points} /> : <Skeleton height={288} />}</div>;
}

export function LazyLiftCurve({ points }: { points: LiftPoint[] }) {
  const { ref, visible } = useDeferredVisible<HTMLDivElement>();
  return <div ref={ref}>{visible ? <DynamicLiftCurve points={points} /> : <Skeleton height={288} />}</div>;
}

export function LazyFeatureImportanceChart({ importances }: { importances: Record<string, number> }) {
  const { ref, visible } = useDeferredVisible<HTMLDivElement>();
  return <div ref={ref}>{visible ? <DynamicFeatureImportanceChart importances={importances} /> : <Skeleton height={320} />}</div>;
}

export function LazySegmentBarChart({ segments }: { segments: Segment[] }) {
  const { ref, visible } = useDeferredVisible<HTMLDivElement>();
  return <div ref={ref}>{visible ? <DynamicSegmentBarChart segments={segments} /> : <Skeleton height={320} />}</div>;
}

function useDeferredVisible<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (visible || !ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: "180px 0px" });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [visible]);
  return { ref, visible };
}
