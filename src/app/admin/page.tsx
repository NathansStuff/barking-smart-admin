'use client';

import { ReactElement, useState } from 'react';

import { Activity, DollarSign, QrCode, Users } from 'lucide-react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetDashboardStats } from '@/features/dashboard/api/useGetDashboardStats';
import { TimePeriod } from '@/features/dashboard/types/Metrics';

export default function AdminDashboard(): ReactElement {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('24h');

  const handlePeriodChange = (value: string): void => {
    setSelectedPeriod(value as TimePeriod);
  };

  const statsQuery = useGetDashboardStats();

  const isLoading = statsQuery.isLoading;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const data = statsQuery.data;
  if (!data) {
    return <div>No data</div>;
  }

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
            <div className='text-2xl font-bold'>{data.lifetimeStats.totalVisitors.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Users</CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{data.lifetimeStats.totalUsers.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Products Sold</CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{data.lifetimeStats.totalProductsSold.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Sales Revenue</CardTitle>
            <QrCode className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{data.lifetimeStats.totalSalesRevenue.toLocaleString()}</div>
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
            {Object.entries(data.periodStats).map(([period, stats]) => (
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
                data={data.performanceData[selectedPeriod].timePoints.map((time, index) => ({
                  name: time,
                  visitors: data.performanceData[selectedPeriod].metrics.visitors[index],
                  sales: data.performanceData[selectedPeriod].metrics.sales[index],
                  revenue: data.performanceData[selectedPeriod].metrics.revenue[index],
                  conversionRate: data.performanceData[selectedPeriod].metrics.conversionRate[index],
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
    </div>
  );
}
