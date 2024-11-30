import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { EmailTemplateWithId } from '../types/EmailTemplate';

export const EmailTemplateColumns = (): ColumnDef<EmailTemplateWithId>[] => [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'subject',
    header: 'Subject',
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className='flex gap-2'>
        <Button
          asChild
          variant='outline'
          size='sm'
        >
          <Link href={`/admin/email/${row.original._id}`}>View</Link>
        </Button>
      </div>
    ),
  },
];
