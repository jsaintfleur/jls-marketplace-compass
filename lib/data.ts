import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Summary, ModelMetrics, Segments, SourcesMeta } from "./types";

const read = <T,>(rel: string): T =>
  JSON.parse(readFileSync(join(process.cwd(), rel), "utf-8")) as T;

export const getSummary = (): Summary => read<Summary>("data/processed/summary.json");
export const getModelMetrics = (): ModelMetrics =>
  read<ModelMetrics>("data/processed/model_metrics.json");
export const getSegments = (): Segments => read<Segments>("data/processed/segments.json");
export const getSources = (): SourcesMeta => read<SourcesMeta>("data/metadata/sources.json");
