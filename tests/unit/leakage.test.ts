import { describe, expect, it } from "vitest";
import modelMetrics from "../../data/processed/model_metrics.json";

const LEAKAGE_TOKENS = ["future", "post", "after", "label", "target", "next", "outcome", "_post"];

describe("model leakage guard", () => {
  it("does not include post-outcome or label-derived model features", () => {
    expect(modelMetrics.features.length).toBeGreaterThan(0);
    for (const feature of modelMetrics.features) {
      const lower = feature.toLowerCase();
      for (const token of LEAKAGE_TOKENS) {
        expect(lower.includes(token), `${feature} contains suspicious token ${token}`).toBe(false);
      }
    }
  });
});
