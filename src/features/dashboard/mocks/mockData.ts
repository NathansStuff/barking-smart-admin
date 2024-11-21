import { LifetimeStats, PerformanceDataType, PeriodStatsType } from '../types/Metrics';

// Now type the constants
export const lifetimeStats: LifetimeStats = {
  totalVisitors: 1234567,
  totalUsers: 98765,
  totalProductsSold: 12345,
  totalSalesRevenue: 9876543,
};

export const periodStats: PeriodStatsType = {
  '24h': { newVisitors: 1234, newUsers: 123, activeUsers: 5678, productsSold: 12345, salesRevenue: 234 },
  '7d': { newVisitors: 8765, newUsers: 876, activeUsers: 23456, productsSold: 87654, salesRevenue: 1234 },
  '1m': { newVisitors: 34567, newUsers: 3456, activeUsers: 87654, productsSold: 345678, salesRevenue: 5678 },
  '6m': { newVisitors: 234567, newUsers: 23456, activeUsers: 456789, productsSold: 2345678, salesRevenue: 34567 },
  '1y': { newVisitors: 876543, newUsers: 87654, activeUsers: 987654, productsSold: 8765432, salesRevenue: 123456 },
};

// Now type the performanceData constant
export const performanceData: PerformanceDataType = {
  '24h': {
    timePoints: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    metrics: {
      visitors: [234, 156, 401, 678, 543, 401],
      sales: [12, 8, 25, 45, 32, 22],
      revenue: [156, 98, 312, 567, 423, 289],
      conversionRate: [5.1, 5.3, 6.2, 6.6, 5.9, 5.5],
    },
  },
  '7d': {
    timePoints: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    metrics: {
      visitors: [1245, 1567, 1389, 1567, 1789, 1456, 1234],
      sales: [89, 123, 98, 167, 145, 112, 78],
      revenue: [1067, 1476, 1176, 2004, 1740, 1344, 936],
      conversionRate: [7.1, 7.8, 7.1, 10.7, 8.1, 7.7, 6.3],
    },
  },
  '1m': {
    timePoints: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    metrics: {
      visitors: [5678, 6789, 7123, 6543],
      sales: [456, 567, 678, 543],
      revenue: [5472, 6804, 8136, 6516],
      conversionRate: [8.0, 8.4, 9.5, 8.3],
    },
  },
  '6m': {
    timePoints: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    metrics: {
      visitors: [23456, 25678, 28901, 27654, 29876, 31234],
      sales: [1567, 1789, 1987, 1876, 2123, 2345],
      revenue: [18804, 21468, 23844, 22512, 25476, 28140],
      conversionRate: [6.7, 7.0, 6.9, 6.8, 7.1, 7.5],
    },
  },
  '1y': {
    timePoints: ['Q1', 'Q2', 'Q3', 'Q4'],
    metrics: {
      visitors: [78901, 82345, 85678, 89012],
      sales: [5678, 6123, 6543, 6987],
      revenue: [68136, 73476, 78516, 83844],
      conversionRate: [7.2, 7.4, 7.6, 7.8],
    },
  },
};
