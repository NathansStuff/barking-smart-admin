import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { EmailTemplate } from '../types/EmailTemplate';

export const EmailTemplateColumns = (
  handleSendToSelf: (template: EmailTemplate) => void
): ColumnDef<EmailTemplate>[] => [
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
          variant='outline'
          size='sm'
          onClick={() => handleSendToSelf(row.original)}
        >
          Send to Yourself
        </Button>
        <Button
          asChild
          variant='outline'
          size='sm'
        >
          <Link href={`/admin/email/${row.original.id}`}>View</Link>
        </Button>
      </div>
    ),
  },
];
