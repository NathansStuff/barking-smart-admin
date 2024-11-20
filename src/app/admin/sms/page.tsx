import { ReactElement } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

function SMSPage(): ReactElement {
  return (
    <>
      <div className='container mx-auto p-4'>
        <Card>
          <CardHeader>
            <CardTitle>SMS</CardTitle>
            <CardDescription>A list of the SMS Templates</CardDescription>
          </CardHeader>
          <CardContent>There are none</CardContent>
        </Card>
      </div>
    </>
  );
}

export default SMSPage;
