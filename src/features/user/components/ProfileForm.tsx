import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { selectName, selectPreferredName, setName, setPreferredName } from '@/contexts/userSlice';

import { updateUser } from '../api/updateUser';

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: 'Full name must be at least 2 characters.',
  }),
  preferredName: z.string().min(2, {
    message: 'Preferred name must be at least 2 characters.',
  }),
});

function ProfileForm(): React.JSX.Element {
  const dispatch = useDispatch();
  const fullName = useSelector(selectName);
  const preferredName = useSelector(selectPreferredName);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: fullName || '',
      preferredName: preferredName || '',
    },
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
    setIsSubmitting(true);
    const loading = toast.loading('Updating profile...');

    try {
      const success = await updateUser(values);
      if (!success) {
        toast.error('Failed to update profile');
        return;
      }
      toast.success('Profile updated successfully');
      const { name, preferredName } = success;
      dispatch(setName(name));
      dispatch(setPreferredName(preferredName));
    } finally {
      toast.dismiss(loading);
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4'
      >
        <FormField
          control={form.control}
          name='fullName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='preferredName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>What should we call you?</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
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
            'Save'
          )}
        </Button>
      </form>
    </Form>
  );
}

export default ProfileForm;
