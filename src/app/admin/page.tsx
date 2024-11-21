'use client';

import { ReactElement, useState } from 'react';

import { Activity, DollarSign, QrCode, Users } from 'lucide-react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Add these type definitions before the data
type TimePeriod = '24h' | '7d' | '1m' | '6m' | '1y';

interface Metrics {
  visitors: number[];
  sales: number[];
  revenue: number[];
  conversionRate: number[];
}

interface PeriodData {
  timePoints: string[];
  metrics: Metrics;
}

type PerformanceDataType = Record<TimePeriod, PeriodData>;

// Add these interfaces with the other type definitions
interface LifetimeStats {
  totalVisitors: number;
  totalUsers: number;
  totalProductsSold: number;
  totalSalesRevenue: number;
}

interface PeriodStats {
  newVisitors: number;
  newUsers: number;
  activeUsers: number;
  productsSold: number;
  salesRevenue: number;
}

interface ActivityItem {
  id: number;
  user: string;
  action: string;
  timestamp: string;
}

type PeriodStatsType = Record<TimePeriod, PeriodStats>;

// Now type the constants
const lifetimeStats: LifetimeStats = {
  totalVisitors: 1234567,
  totalUsers: 98765,
  totalProductsSold: 12345,
  totalSalesRevenue: 9876543,
};

const periodStats: PeriodStatsType = {
  '24h': { newVisitors: 1234, newUsers: 123, activeUsers: 5678, productsSold: 12345, salesRevenue: 234 },
  '7d': { newVisitors: 8765, newUsers: 876, activeUsers: 23456, productsSold: 87654, salesRevenue: 1234 },
  '1m': { newVisitors: 34567, newUsers: 3456, activeUsers: 87654, productsSold: 345678, salesRevenue: 5678 },
  '6m': { newVisitors: 234567, newUsers: 23456, activeUsers: 456789, productsSold: 2345678, salesRevenue: 34567 },
  '1y': { newVisitors: 876543, newUsers: 87654, activeUsers: 987654, productsSold: 8765432, salesRevenue: 123456 },
};

const recentActivity: ActivityItem[] = [
  { id: 1, user: 'john@example.com', action: 'Created new QR code', timestamp: '2023-11-13 14:30:00' },
  { id: 2, user: 'sarah@example.com', action: 'Upgraded to Pro plan', timestamp: '2023-11-13 13:45:00' },
  { id: 3, user: 'mike@example.com', action: 'Modified existing link', timestamp: '2023-11-13 12:15:00' },
  { id: 4, user: 'emily@example.com', action: 'Created new QR code', timestamp: '2023-11-13 11:30:00' },
  { id: 5, user: 'david@example.com', action: 'Downgraded to Free plan', timestamp: '2023-11-13 10:45:00' },
];

// Now type the performanceData constant
const performanceData: PerformanceDataType = {
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

export default function AdminDashboard(): ReactElement {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('24h');

  const handlePeriodChange = (value: string) => {
    setSelectedPeriod(value as TimePeriod);
  };

  return (
    <div className='container mx-auto p-4'>
      <h2 className='mb-6 text-3xl font-bold'>Dashboard Overview</h2>

      {/* Lifetime stats */}
      <div className='mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Visitors</CardTitle>
            <Activity className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{lifetimeStats.totalVisitors.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Users</CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{lifetimeStats.totalUsers.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Products Sold</CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{lifetimeStats.totalProductsSold.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Sales Revenue</CardTitle>
            <QrCode className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{lifetimeStats.totalSalesRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Period stats */}
      <Card className='mb-8'>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>View key metrics for different time periods</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue='24h'
            className='w-full'
            onValueChange={handlePeriodChange}
          >
            <TabsList>
              <TabsTrigger value='24h'>24h</TabsTrigger>
              <TabsTrigger value='7d'>7d</TabsTrigger>
              <TabsTrigger value='1m'>1m</TabsTrigger>
              <TabsTrigger value='6m'>6m</TabsTrigger>
              <TabsTrigger value='1y'>1y</TabsTrigger>
            </TabsList>
            {Object.entries(periodStats).map(([period, stats]) => (
              <TabsContent
                key={period}
                value={period}
              >
                <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5'>
                  <div>
                    <h3 className='font-medium'>New Visitors</h3>
                    <p className='text-2xl font-bold'>{stats.newVisitors.toLocaleString()}</p>
                  </div>
                  <div>
                    <h3 className='font-medium'>New Users</h3>
                    <p className='text-2xl font-bold'>{stats.newUsers.toLocaleString()}</p>
                  </div>
                  <div>
                    <h3 className='font-medium'>Active Users</h3>
                    <p className='text-2xl font-bold'>{stats.activeUsers.toLocaleString()}</p>
                  </div>
                  <div>
                    <h3 className='font-medium'>Products Sold</h3>
                    <p className='text-2xl font-bold'>{stats.productsSold.toLocaleString()}</p>
                  </div>
                  <div>
                    <h3 className='font-medium'>Sales Revenue</h3>
                    <p className='text-2xl font-bold'>{stats.salesRevenue.toLocaleString()}</p>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Chart placeholder */}
      <Card className='mb-8'>
        <CardHeader>
          <CardTitle>Performance Over Time</CardTitle>
          <CardDescription>Visualizing key metrics for the selected period: {selectedPeriod}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='h-[400px] w-full'>
            <ResponsiveContainer
              width='100%'
              height='100%'
            >
              <LineChart
                data={performanceData[selectedPeriod].timePoints.map((time, index) => ({
                  name: time,
                  visitors: performanceData[selectedPeriod].metrics.visitors[index],
                  sales: performanceData[selectedPeriod].metrics.sales[index],
                  revenue: performanceData[selectedPeriod].metrics.revenue[index],
                  conversionRate: performanceData[selectedPeriod].metrics.conversionRate[index],
                }))}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis yAxisId='left' />
                <YAxis
                  yAxisId='right'
                  orientation='right'
                />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId='left'
                  type='monotone'
                  dataKey='visitors'
                  stroke='#8884d8'
                  name='Visitors'
                />
                <Line
                  yAxisId='left'
                  type='monotone'
                  dataKey='sales'
                  stroke='#82ca9d'
                  name='Sales'
                />
                <Line
                  yAxisId='left'
                  type='monotone'
                  dataKey='revenue'
                  stroke='#ffc658'
                  name='Revenue ($)'
                />
                <Line
                  yAxisId='right'
                  type='monotone'
                  dataKey='conversionRate'
                  stroke='#ff7300'
                  name='Conversion Rate (%)'
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest actions performed by users</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivity.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>{activity.user}</TableCell>
                  <TableCell>{activity.action}</TableCell>
                  <TableCell>{activity.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
