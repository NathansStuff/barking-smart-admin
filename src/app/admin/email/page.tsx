'use client';

import { ReactElement } from 'react';

import { DataTable } from '@/components/general/DataTable/components/DataTable';
import { UseDataTable } from '@/components/general/DataTable/hooks/UseDataTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetEmailTemplates } from '@/features/email/api/useGetEmailTemplates';
import { EmailTemplateColumns } from '@/features/email/components/EmailTemplateColumns';

function EmailPage(): ReactElement {
  const tableColumns = EmailTemplateColumns();
  const { data: emailTemplates } = useGetEmailTemplates();

  const { table } = UseDataTable({
    data: emailTemplates?.emailTemplates || [],
    columns: tableColumns,
    pageCount: 1,
  });

  return (
    <div className='container mx-auto p-4'>
      <Card>
        <CardHeader>
          <CardTitle>Email Templates</CardTitle>
          <CardDescription>Manage your email templates</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            table={table}
            columns={tableColumns}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default EmailPage;
