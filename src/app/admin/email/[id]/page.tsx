'use client';

import { ReactElement, use, useState } from 'react';

import { toast } from 'sonner';

import { LabeledInput } from '@/components/form/LabeledInput';
import { AutosizeTextarea } from '@/components/ui/autosize-textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppSelector } from '@/contexts/storeHooks';
import { selectEmail } from '@/contexts/userSlice';
import { postTestEmail } from '@/features/email/api/postTestEmail';
import { EmailPreview } from '@/features/email/components/EmailPreview';
import { emailTemplates } from '@/features/email/data/emailTemplates';
import { EmailTestRequest } from '@/features/email/types/EmailTestRequest';
import { camelCaseToCapitals } from '@/utils/stringManipulation/camelCaseToCapitals';

function EmailTemplatePage({ params }: { params: Promise<{ id: string }> }): ReactElement {
  const userEmail = useAppSelector(selectEmail);
  const { id } = use(params);
  const template = emailTemplates.find((template) => template.id === id);
  const [variables, setVariables] = useState<Record<string, string>>(() => {
    // Initialize with empty values for each variable
    return (
      template?.variables?.reduce(
        (acc, variable) => ({
          ...acc,
          [variable]: '',
        }),
        {}
      ) ?? {}
    );
  });

  if (!template) {
    return <div>Not found</div>;
  }

  const previewHtml = template.variables?.reduce(
    (html, variable) => html.replace(`{{${variable}}}`, variables[variable] || `{{${variable}}}`),
    template.body
  );

  async function handleClickSend(): Promise<void> {
    const loadingToast = toast.loading('Sending Email');
    try {
      const email: EmailTestRequest = {
        templateId: id,
        variables,
        toEmail: userEmail,
      };
      const success = await postTestEmail(email);
      toast.dismiss(loadingToast);
      if (success) {
        toast.success('Email Sent');
      } else {
        toast.error('Failed to send email');
      }
    } catch (error) {
      console.log(error);
      toast.dismiss(loadingToast);
      toast.error('Error sending email');
    }
  }

  return (
    <div className='container mx-auto p-4'>
      <Card>
        <CardHeader>
          <CardTitle>Email Template</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
          <Card>
            <CardHeader>
              <CardTitle>Template Variables</CardTitle>
              <CardDescription>
                Enter values to preview the email with your data. Note: Should always test changes as a user to check
                the system generates the right variables as well.
              </CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col gap-4'>
              <form className='flex w-full gap-4'>
                {template.variables?.map((variable) => {
                  const capitalizedVariable = camelCaseToCapitals(variable);
                  return (
                    <div
                      key={variable}
                      className='w-full'
                    >
                      <LabeledInput
                        label={capitalizedVariable}
                        id={variable}
                        value={variables[variable]}
                        onChange={(e) =>
                          setVariables((prev) => ({
                            ...prev,
                            [variable]: e.target.value,
                          }))
                        }
                        className='w-full'
                        placeholder={`Enter ${capitalizedVariable}`}
                      />
                    </div>
                  );
                })}
              </form>
              <Button
                className='w-fit'
                onClick={handleClickSend}
              >
                Send Test Email
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Template Preview</CardTitle>
              <CardDescription>
                Note: The height you see on this page is fixed, not the actual email height
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EmailPreview html={previewHtml} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Raw Template</CardTitle>
              <CardDescription>Edit the code directly. In src/features/email/templates</CardDescription>
            </CardHeader>
            <CardContent>
              <form className='space-y-4'>
                <div>
                  <Label htmlFor='name'>Template Name</Label>
                  <Input
                    id='name'
                    value={template.name}
                    disabled
                  />
                </div>
                <div>
                  <Label htmlFor='subject'>Subject</Label>
                  <Input
                    id='subject'
                    value={template.subject}
                    disabled
                  />
                </div>
                <div>
                  <Label htmlFor='body'>Body</Label>
                  <AutosizeTextarea
                    id='body'
                    className='min-h-[300px]'
                    value={template.body}
                    disabled
                  />
                </div>
              </form>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}

export default EmailTemplatePage;
