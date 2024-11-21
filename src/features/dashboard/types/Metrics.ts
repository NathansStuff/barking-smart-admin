export type TimePeriod = '24h' | '7d' | '1m' | '6m' | '1y';

export interface Metrics {
  visitors: number[];
  sales: number[];
  revenue: number[];
  conversionRate: number[];
}

export interface PeriodData {
  timePoints: string[];
  metrics: Metrics;
}

export type PerformanceDataType = Record<TimePeriod, PeriodData>;

export interface LifetimeStats {
  totalVisitors: number;
  totalUsers: number;
  totalProductsSold: number;
  totalSalesRevenue: number;
}

export interface PeriodStats {
  newVisitors: number;
  newUsers: number;
  activeUsers: number;
  productsSold: number;
  salesRevenue: number;
}

export type PeriodStatsType = Record<TimePeriod, PeriodStats>;

export interface DashboardStatsResponse {
  lifetimeStats: LifetimeStats;
  periodStats: PeriodStatsType;
  performanceData: PerformanceDataType;
}
