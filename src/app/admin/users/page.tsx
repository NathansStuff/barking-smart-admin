'use client';

import { ReactNode } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetUsers } from '@/features/user/api/useGetUsers';
import UserManagementTable from '@/features/user/components/UserManagementTable';
import { UserTableSkeleton } from '@/features/user/components/UserTableSkeleton';

export default function UsersPage(): ReactNode {
  const { data: users, isLoading } = useGetUsers();

  return (
    <div className='container mx-auto flex w-full max-w-4xl justify-center px-10 py-10'>
      <Card className='w-full'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-2xl font-bold'>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <UserTableSkeleton />
          ) : (
            <UserManagementTable initialUsers={users || []} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
