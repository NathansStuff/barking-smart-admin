import { ReactNode } from 'react';

import { TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown, Edit, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';
import { useDeleteDog } from '@/features/dog/api/useDeleteDog';
import { DogWithId } from '@/features/dog/types/Dog';

export const DogTableColumns = (
  router: ReturnType<typeof useRouter>,
  handleDelete: (id: string) => Promise<void>,
  deleteMutation: ReturnType<typeof useDeleteDog>
): ColumnDef<DogWithId>[] => [
  {
    accessorKey: 'name',
    header: ({ column }): ReactNode => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='flex items-center gap-1'
        >
          Name
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
    accessorKey: 'breedOne',
    header: 'Primary Breed',
  },
  {
    accessorKey: 'breedTwo',
    header: 'Secondary Breed',
    cell: ({ row }) => row.original.breedTwo || '-',
  },
  {
    accessorKey: 'gender',
    header: 'Gender',
  },
  {
    accessorKey: 'location',
    header: 'Location',
  },
  {
    accessorKey: 'howActive',
    header: 'Activity Level',
    cell: ({ row }) => <Badge variant='outline'>{row.original.howActive}/10</Badge>,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className='flex space-x-2'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => router.push(`/admin/dog/${row.original._id}`)}
            >
              <Edit className='size-4' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Edit dog</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => handleDelete(row.original._id.toString())}
              disabled={deleteMutation.isPending}
            >
              <Trash className='size-4' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete dog</TooltipContent>
        </Tooltip>
      </div>
    ),
  },
];
