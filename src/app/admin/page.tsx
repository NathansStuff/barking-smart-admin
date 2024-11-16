'use client';

import { ReactElement, useState } from 'react';

import { Activity, DollarSign, PieChart, QrCode, Users } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data
const lifetimeStats = {
  totalVisitors: 1234567,
  totalUsers: 98765,
  totalPayingUsers: 12345,
  totalScans: 9876543,
};

const periodStats = {
  '24h': { newVisitors: 1234, newUsers: 123, activeUsers: 5678, scans: 12345, newCodes: 234 },
  '7d': { newVisitors: 8765, newUsers: 876, activeUsers: 23456, scans: 87654, newCodes: 1234 },
  '1m': { newVisitors: 34567, newUsers: 3456, activeUsers: 87654, scans: 345678, newCodes: 5678 },
  '6m': { newVisitors: 234567, newUsers: 23456, activeUsers: 456789, scans: 2345678, newCodes: 34567 },
  '1y': { newVisitors: 876543, newUsers: 87654, activeUsers: 987654, scans: 8765432, newCodes: 123456 },
};

const recentActivity = [
  { id: 1, user: 'john@example.com', action: 'Created new QR code', timestamp: '2023-11-13 14:30:00' },
  { id: 2, user: 'sarah@example.com', action: 'Upgraded to Pro plan', timestamp: '2023-11-13 13:45:00' },
  { id: 3, user: 'mike@example.com', action: 'Modified existing link', timestamp: '2023-11-13 12:15:00' },
  { id: 4, user: 'emily@example.com', action: 'Created new QR code', timestamp: '2023-11-13 11:30:00' },
  { id: 5, user: 'david@example.com', action: 'Downgraded to Free plan', timestamp: '2023-11-13 10:45:00' },
];

export default function AdminDashboard(): ReactElement {
  const [selectedPeriod, setSelectedPeriod] = useState('24h');

  return (
    <div className='p-8'>
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
            <CardTitle className='text-sm font-medium'>Paying Users</CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{lifetimeStats.totalPayingUsers.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Scans</CardTitle>
            <QrCode className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{lifetimeStats.totalScans.toLocaleString()}</div>
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
            onValueChange={setSelectedPeriod}
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
                    <h3 className='font-medium'>Scans</h3>
                    <p className='text-2xl font-bold'>{stats.scans.toLocaleString()}</p>
                  </div>
                  <div>
                    <h3 className='font-medium'>New Codes</h3>
                    <p className='text-2xl font-bold'>{stats.newCodes.toLocaleString()}</p>
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
          <div className='flex h-[300px] items-center justify-center rounded-md bg-gray-100'>
            <PieChart className='h-16 w-16 text-gray-400' />
            <p className='ml-4 text-gray-500'>Chart visualization would go here</p>
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
