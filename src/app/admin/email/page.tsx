import { ReactElement } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

function EmailPage(): ReactElement {
  return (
    <>
      <div className='container mx-auto p-4'>
        <Card>
          <CardHeader>
            <CardTitle>Email</CardTitle>
            <CardDescription>A list of the Email Templates</CardDescription>
          </CardHeader>
          <CardContent>There are none</CardContent>
        </Card>
      </div>
    </>
  );
}

export default EmailPage;
