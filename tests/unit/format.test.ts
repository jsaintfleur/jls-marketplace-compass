import { describe, it, expect } from "vitest";
import {
  fmtInt,
  fmtPct,
  fmtPctPoints,
  fmtDecimal,
  fmtMultiple,
  fmtCurrency,
  fmtCurrencyCompact,
  featureLabel,
  barWidthPct,
  segmentColor,
  SEGMENT_META,
} from "@/lib/format";

describe("number formatters", () => {
  it("formats integers with separators", () => {
    expect(fmtInt(36969)).toBe("36,969");
    expect(fmtInt(5878.4)).toBe("5,878");
  });
  it("formats a fraction as a percent", () => {
    expect(fmtPct(0.7238856753997959)).toBe("72.4%");
    expect(fmtPct(0.42693846446942274)).toBe("42.7%");
    expect(fmtPct(null)).toBe("—");
    expect(fmtPct(0.5, 0)).toBe("50%");
  });
  it("formats percentage points as-is", () => {
    expect(fmtPctPoints(42.7)).toBe("42.7%");
    expect(fmtPctPoints(null)).toBe("—");
  });
  it("formats decimals to fixed precision", () => {
    expect(fmtDecimal(0.7829297390507658)).toBe("0.783");
    expect(fmtDecimal(null)).toBe("—");
  });
  it("formats multipliers", () => {
    expect(fmtMultiple(2.1414929559507874)).toBe("2.14×");
    expect(fmtMultiple(null)).toBe("—");
  });
});

describe("currency formatters", () => {
  it("formats full currency", () => {
    expect(fmtCurrency(14567.994574886534)).toBe("$14,568");
    expect(fmtCurrency(null)).toBe("—");
  });
  it("compacts large currency", () => {
    expect(fmtCurrencyCompact(17743429.178)).toBe("$17.7M");
    expect(fmtCurrencyCompact(14567.99)).toBe("$14.6K");
    expect(fmtCurrencyCompact(600)).toBe("$600");
    expect(fmtCurrencyCompact(null)).toBe("—");
  });
});

describe("feature labels", () => {
  it("maps known raw feature names", () => {
    expect(featureLabel("recency_days")).toBe("Recency (days)");
    expect(featureLabel("avg_basket_value")).toBe("Avg basket value");
  });
  it("title-cases unknown feature names", () => {
    expect(featureLabel("some_new_feature")).toBe("Some New Feature");
  });
});

describe("barWidthPct", () => {
  it("scales value against max and clamps", () => {
    expect(barWidthPct(50, 100)).toBe(50);
    expect(barWidthPct(200, 100)).toBe(100);
    expect(barWidthPct(-5, 100)).toBe(0);
    expect(barWidthPct(10, 0)).toBe(0);
  });
});

describe("segment metadata", () => {
  it("defines every RFM segment with a color + playbook", () => {
    for (const name of ["Champions", "Loyal", "Potential", "At-Risk", "Hibernating"]) {
      expect(SEGMENT_META[name]?.color).toMatch(/^#[0-9a-f]{6}$/i);
      expect(SEGMENT_META[name]?.blurb.length).toBeGreaterThan(10);
    }
  });
  it("falls back to a brand color for unknown segments", () => {
    expect(segmentColor("Champions")).toBe("#4338ca");
    expect(segmentColor("Unknown")).toMatch(/^#[0-9a-f]{6}$/i);
  });
});
