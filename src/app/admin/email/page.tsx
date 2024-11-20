'use client';

import { ReactElement } from 'react';

import { toast } from 'sonner';

import { DataTable } from '@/components/general/DataTable/components/DataTable';
import { UseDataTable } from '@/components/general/DataTable/hooks/UseDataTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EmailTemplateColumns } from '@/features/email/components/EmailTemplateColumns';
import { emailTemplates } from '@/features/email/data/emailTemplates';
import { EmailTemplate } from '@/features/email/types/EmailTemplate';

function EmailPage(): ReactElement {
  const handleSendToSelf = async (template: EmailTemplate): Promise<void> => {
    const loadingToast = toast.loading('Sending preview email...');
      try {
          // todo
          console.log(template);
      toast.dismiss(loadingToast);
      toast.success('Preview email sent');
    } catch (error) {
      console.log(error);
      toast.dismiss(loadingToast);
      toast.error('Failed to send preview email');
    }
  };

  const tableColumns = EmailTemplateColumns(handleSendToSelf);

  const { table } = UseDataTable({
    data: emailTemplates,
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
