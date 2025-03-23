import { ReactNode } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function UserTableSkeleton(): ReactNode {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='py-2'>Name</TableHead>
          <TableHead className='py-2'>Email</TableHead>
          <TableHead className='py-2'>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[1, 2, 3].map((index) => (
          <TableRow key={index}>
            <TableCell className='py-2'>
              <Skeleton className='h-4 w-[150px]' />
            </TableCell>
            <TableCell className='py-2'>
              <Skeleton className='h-4 w-[200px]' />
            </TableCell>
            <TableCell className='py-2'>
              <Skeleton className='h-9 w-full' />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
