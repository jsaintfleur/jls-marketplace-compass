export interface TopSegmentByRevenue {
  segment: string;
  customers: number;
  total_monetary: number;
}

export interface Summary {
  dataset: string;
  date_range: [string, string];
  rows_raw: number;
  rows_clean: number;
  customers: number;
  orders: number;
  revenue: number;
  avg_order_value: number;
  repeat_rate_overall: number;
  model_roc_auc: number;
  model_pr_auc: number;
  model_brier: number;
  model_top_decile_lift: number;
  baseline_roc_auc: number;
  calibration_mean_abs_error: number;
  threshold_default: number;
  threshold_default_expected_net_value: number;
  top_segments_by_revenue: TopSegmentByRevenue[];
}

export interface ModelScores {
  name: string;
  roc_auc: number;
  pr_auc: number;
  brier: number;
  top_decile_lift: number;
}

export interface ModelMetrics {
  task: string;
  label_definition: string;
  split: {
    type: string;
    train_cutoff: string;
    train_label_window: [string, string];
    test_cutoff: string;
    test_label_window: [string, string];
    note: string;
  };
  features: string[];
  leakage_guard: string;
  n_train: number;
  n_test: number;
  train_base_rate: number;
  test_base_rate: number;
  model: ModelScores;
  baseline: ModelScores;
  auc_uplift_vs_baseline: number;
  feature_importance_auc_drop: Record<string, number>;
  calibration: CalibrationPoint[];
  lift_curve: LiftPoint[];
  threshold_policy: {
    assumptions: {
      benefit_per_saved_customer: number;
      cost_per_offer: number;
      note: string;
    };
    rows: ThresholdPolicyRow[];
  };
  uncertainty: {
    calibration_mean_abs_error: number;
    holdout_only: string;
  };
}

export interface CalibrationPoint {
  bin: number;
  n: number;
  predicted_rate: number;
  observed_rate: number;
  abs_error: number;
}

export interface LiftPoint {
  population_pct: number;
  customers: number;
  captured_repeaters: number;
  capture_rate: number;
  precision: number;
  lift: number | null;
}

export interface ThresholdPolicyRow {
  threshold: number;
  targeted_customers: number;
  targeted_pct: number;
  captured_repeaters: number;
  top_decile_capture: number;
  precision: number;
  expected_net_value: number;
  benefit_per_saved_customer: number;
  cost_per_offer: number;
}

export interface Segment {
  segment: string;
  customers: number;
  pct_of_base: number;
  avg_recency_days: number;
  avg_frequency: number;
  avg_monetary: number;
  total_monetary: number;
  avg_clv_90d_proxy: number;
  avg_predicted_repeat_prob: number;
  recommended_action: string;
}

export interface Segments {
  n_customers: number;
  as_of_date: string;
  method: string;
  segments: Segment[];
  playbook: {
    segment: string;
    customers: number;
    avg_predicted_repeat_prob: number;
    avg_clv_90d_proxy: number;
    recommended_action: string;
  }[];
  clv_proxy: {
    definition: string;
    caveats: string[];
    tiers: Record<string, number>;
    platinum_avg_clv_90d: number;
  };
}

export interface SourceDataset {
  name: string;
  url: string;
  license: string;
  commercial_use?: boolean;
  role: string;
  rows?: number;
  description?: string;
  note?: string;
}

export interface SourcesMeta {
  datasets: SourceDataset[];
  labels: {
    computed: string[];
    proposed_requires_olist: string[];
  };
  generated_at: string;
}
