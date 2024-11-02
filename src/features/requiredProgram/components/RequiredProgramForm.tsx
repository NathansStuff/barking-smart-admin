'use client';

import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ELocation } from '@/features/program/types/ELocation';

import { useCreateRequiredProgram } from '../api/useCreateRequiredProgram';
import { RequiredProgram } from '../types/RequiredProgram';

type FormData = z.infer<typeof RequiredProgram>;

type Props = {
  onSuccess?: () => void;
};

function RequiredProgramForm({ onSuccess }: Props): ReactNode {
  const createMutation = useCreateRequiredProgram();

  const form = useForm<FormData>({
    resolver: zodResolver(RequiredProgram),
    defaultValues: {
      tags: {},
      count: 1,
    },
  });

  const onSubmit = async (data: FormData): Promise<void> => {
    createMutation.mutate(data, {
      onSuccess: () => {
        onSuccess?.();
        form.reset();
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4'
      >
        <FormField
          control={form.control}
          name='tags.location'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select location' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(ELocation).map(location => (
                    <SelectItem
                      key={location}
                      value={location}
                    >
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Similar FormFields for other tag properties */}

        <FormField
          control={form.control}
          name='count'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Count</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  min={1}
                  {...field}
                  onChange={e => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          className='w-full'
          disabled={createMutation.isPending}
        >
          Create Required Program
        </Button>
      </form>
    </Form>
  );
}

export default RequiredProgramForm;
