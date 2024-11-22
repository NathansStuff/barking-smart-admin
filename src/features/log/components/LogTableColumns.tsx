import { JSX, ReactNode } from 'react';

import { Column, ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LogWithUserDetails } from '@/features/log/types/Log';

const SortButton = ({
  column,
  children,
}: {
  column: Column<LogWithUserDetails, unknown>;
  children: ReactNode;
}): ReactNode => {
  return (
    <Button
      variant='ghost'
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      className='flex items-center gap-1'
    >
      {children}
      {column.getIsSorted() === 'asc' ? (
        <ArrowUp className='h-4 w-4' />
      ) : column.getIsSorted() === 'desc' ? (
        <ArrowDown className='h-4 w-4' />
      ) : (
        <ArrowUpDown className='h-4 w-4' />
      )}
    </Button>
  );
};

export const LogTableColumns: ColumnDef<LogWithUserDetails>[] = [
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <SortButton column={column}>Date</SortButton>,
    cell: ({ row }) => format(new Date(row.original.createdAt), 'MMM d, yyyy HH:mm:ss'),
  },
  {
    accessorKey: 'userId.email',
    header: ({ column }) => <SortButton column={column}>User Email</SortButton>,
    cell: ({ row }) => row.original.userId?.email || 'N/A',
  },
  {
    accessorKey: 'action',
    header: ({ column }) => <SortButton column={column}>Action</SortButton>,
    cell: ({ row }) => <Badge variant='outline'>{row.original.action.replace(/_/g, ' ')}</Badge>,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <SortButton column={column}>Status</SortButton>,
    cell: ({ row }): JSX.Element => {
      const status = row.original.status;
      const variant = status === 'SUCCESS' ? 'default' : status === 'FAILURE' ? 'destructive' : 'secondary';
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  {
    accessorKey: 'details',
    header: ({ column }) => <SortButton column={column}>Details</SortButton>,
  },
];
