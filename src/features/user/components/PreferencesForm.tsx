import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { selectPreferences, setPreferences } from '@/contexts/userSlice';

import { updateUser } from '../api/updateUser';

const formSchema = z.object({
  emailNotifications: z.boolean(),
  activityReminders: z.boolean(),
  personalizedSuggestions: z.boolean(),
});

function PreferencesForm(): React.JSX.Element {
  const dispatch = useDispatch();
  const preferences = useSelector(selectPreferences);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailNotifications: preferences.emailNotifications || false,
      activityReminders: preferences.activityReminders || false,
      personalizedSuggestions: preferences.personalizedSuggestions || false,
    },
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
    setIsSubmitting(true);
    const loading = toast.loading('Updating preferences...');

    try {
      const success = await updateUser({
        preferences: values,
      });
      if (!success) {
        toast.error('Failed to update preferences');
        return;
      }
      toast.success('Preferences updated successfully');
      dispatch(setPreferences(values));
    } finally {
      toast.dismiss(loading);
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6'
      >
        <FormField
          control={form.control}
          name='emailNotifications'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center justify-between rounded-lg p-4'>
              <div className='space-y-0.5'>
                <FormLabel className='text-base'>Email Notifications</FormLabel>
                <FormDescription>Receive updates and newsletters via email</FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='activityReminders'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center justify-between rounded-lg p-4'>
              <div className='space-y-0.5'>
                <FormLabel className='text-base'>Weekly Activity Reminder</FormLabel>
                <FormDescription>Get a reminder to download your weekly PDF</FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='personalizedSuggestions'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center justify-between rounded-lg p-4'>
              <div className='space-y-0.5'>
                <FormLabel className='text-base'>Personalized Activity Suggestions</FormLabel>
                <FormDescription>Receive tailored activity recommendations</FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='w-full'
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Saving...
            </>
          ) : (
            'Save Preferences'
          )}
        </Button>
      </form>
    </Form>
  );
}

export default PreferencesForm;
