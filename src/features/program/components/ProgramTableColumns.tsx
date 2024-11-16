import { ReactNode } from 'react';

import { Column, ColumnDef } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown, Pencil, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useDeleteProgram } from '@/features/program/api/useDeleteProgram';
import { ProgramWithId } from '@/features/program/types/Program';

export const ProgramTableColumns = (
  router: ReturnType<typeof useRouter>,
  handleDelete: (id: string) => Promise<void>,
  deleteMutation: ReturnType<typeof useDeleteProgram>
): ColumnDef<ProgramWithId>[] => [
  {
    accessorKey: 'approved',
    header: ({ column }: { column: Column<ProgramWithId> }): ReactNode => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='flex items-center gap-1'
        >
          Status
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp className='h-4 w-4' />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDown className='h-4 w-4' />
          ) : (
            <ArrowUpDown className='h-4 w-4' />
          )}
        </Button>
      );
    },
    cell: ({ row }): ReactNode => (
      <div className='w-[80px]'>
        <Badge variant={row.original.approved ? 'default' : 'secondary'}>
          {row.original.approved ? 'Approved' : 'Pending'}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: 'title',
    header: ({ column }): ReactNode => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='flex items-center gap-1'
        >
          Title
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp className='h-4 w-4' />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDown className='h-4 w-4' />
          ) : (
            <ArrowUpDown className='h-4 w-4' />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: 'tags.location',
    header: 'Location',
    cell: ({ row }): ReactNode => (
      <Badge variant='outline'>{row.original.tags.location}</Badge>
    ),
  },
  {
    accessorKey: 'tags.energyLevel',
    header: 'Energy Level',
    cell: ({ row }): ReactNode => (
      <Badge variant='outline'>{row.original.tags.energyLevel}</Badge>
    ),
  },
  {
    accessorKey: 'tags.duration',
    header: 'Duration',
    cell: ({ row }): ReactNode => (
      <Badge variant='outline'>{row.original.tags.duration}</Badge>
    ),
  },
  {
    accessorKey: 'tags.challenge',
    header: 'Challenge',
    cell: ({ row }): ReactNode => (
      <Badge variant='outline'>{row.original.tags.challenge}</Badge>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }): ReactNode => {
      const program = row.original;

      return (
        <div className='flex items-center gap-2'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => router.push(`/admin/program/${program._id}`)}
          >
            <Pencil className='h-4 w-4' />
          </Button>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => handleDelete(program._id.toString())}
            disabled={deleteMutation.isPending}
          >
            <Trash className='h-4 w-4' />
          </Button>
        </div>
      );
    },
  },
];
