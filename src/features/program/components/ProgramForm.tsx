'use client';

import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { ExternalLink } from 'lucide-react';

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
import { Textarea } from '@/components/ui/textarea';

import { useCreateProgram } from '../api/useCreateProgram';
import { useUpdateProgram } from '../api/useUpdateProgram';
import { EActivityType } from '../types/EActivityType';
import { EChallenge } from '../types/EChallenge';
import { EDuration } from '../types/EDuration';
import { ELocation } from '../types/ELocation';
import { ESpace } from '../types/ESpace';
import { Program, ProgramWithId } from '../types/Program';

import ProgramUpload from './ProgramUpload';

type Props = {
  program?: ProgramWithId;
  initialData?: Partial<Program>;
  onSuccess?: () => void;
};

function ProgramForm({ program, initialData, onSuccess }: Props): ReactNode {
  const createMutation = useCreateProgram();
  const updateMutation = useUpdateProgram();

  const form = useForm<Program>({
    resolver: zodResolver(Program),
    defaultValues: {
      title: program?.title || '',
      description: program?.description || '',
      materialsNeeded: program?.materialsNeeded || '',
      setup: program?.setup || '',
      instructions: program?.instructions || '',
      additionalTips: program?.additionalTips || '',
      canvaLink: program?.canvaLink || '',
      pdfLink: program?.pdfLink || '',
      tags: program?.tags || {
        location: initialData?.tags?.location || ELocation.INDOORS,
        energyLevel: initialData?.tags?.energyLevel || 1,
        duration: initialData?.tags?.duration || EDuration.LONG,
        challenge: EChallenge.EASY,
        type: initialData?.tags?.type || [],
        space: initialData?.tags?.space || ESpace.LARGE,
      },
    },
  });

  const onSubmit = async (data: Program): Promise<void> => {
    if (program) {
      updateMutation.mutate(
        { id: program._id.toString(), data },
        {
          onSuccess: () => {
            onSuccess?.();
            form.reset();
          },
        }
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          onSuccess?.();
          form.reset();
        },
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6'
      >
        {/* Basic Information */}
        <div className='space-y-4'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description - Not in PDF, in UI only</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className='h-20'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='materialsNeeded'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Materials Needed</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className='h-40'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='setup'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Setup</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className='h-40'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='instructions'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className='h-40'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='additionalTips'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Tips</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className='h-24'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Links Section */}
        <div className='grid grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='canvaLink'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Canvas Link</FormLabel>
                <FormControl>
                  <div className='flex gap-2'>
                    <Input
                      {...field}
                      type='url'
                    />
                    {field.value && (
                      <Button
                        type='button'
                        size='icon'
                        variant='outline'
                        onClick={() => window.open(field.value, '_blank')}
                      >
                        <ExternalLink className='h-4 w-4' />
                      </Button>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='pdfLink'
            render={({ field }) => (
              <FormItem>
                <FormLabel>PDF Link</FormLabel>
                <FormControl>
                  <div className='flex gap-2'>
                    <div className='flex gap-2 grow-1 w-full'>
                      <Input
                        {...field}
                        type='url'
                      />
                      {field.value && (
                        <Button
                          type='button'
                          size='icon'
                          variant='outline'
                          onClick={() => window.open(field.value, '_blank')}
                        >
                          <ExternalLink className='h-4 w-4' />
                        </Button>
                      )}
                    </div>
                    <ProgramUpload
                      onUploadSuccess={url => field.onChange(url)}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Activity Settings */}
        <div className='grid grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='tags.location'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <div className='flex gap-2'>
                    {Object.values(ELocation).map(location => (
                      <Button
                        key={location}
                        type='button'
                        variant={
                          field.value === location ? 'default' : 'outline'
                        }
                        onClick={() => field.onChange(location)}
                      >
                        {location}
                      </Button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='tags.space'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Space Required</FormLabel>
                <FormControl>
                  <div className='flex gap-2'>
                    {Object.values(ESpace).map(space => (
                      <Button
                        key={space}
                        type='button'
                        variant={field.value === space ? 'default' : 'outline'}
                        onClick={() => field.onChange(space)}
                      >
                        {space}
                      </Button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Activity Characteristics */}
        <div className='grid grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='tags.duration'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <div className='flex gap-2'>
                    {Object.values(EDuration).map(duration => (
                      <Button
                        key={duration}
                        type='button'
                        variant={
                          field.value === duration ? 'default' : 'outline'
                        }
                        onClick={() => field.onChange(duration)}
                      >
                        {duration}
                      </Button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='tags.challenge'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Challenge Level</FormLabel>
                <FormControl>
                  <div className='flex gap-2'>
                    {Object.values(EChallenge).map(challenge => (
                      <Button
                        key={challenge}
                        type='button'
                        variant={
                          field.value === challenge ? 'default' : 'outline'
                        }
                        onClick={() => field.onChange(challenge)}
                      >
                        {challenge}
                      </Button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Energy Level and Activity Types - Same Line */}
        <div className='grid grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='tags.energyLevel'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Energy Level</FormLabel>
                <FormControl>
                  <div className='flex items-center gap-4'>
                    <div className='flex flex-col gap-2'>
                      <h3 className='text-sm font-medium'>Low Energy</h3>
                      <div className='flex gap-1'>
                        {[1, 2, 3].map(level => (
                          <Button
                            key={level}
                            type='button'
                            variant={
                              field.value === level ? 'default' : 'outline'
                            }
                            onClick={() => field.onChange(level)}
                            size='sm'
                          >
                            {level}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div
                      className='h-16 w-px bg-border'
                      aria-hidden='true'
                    />

                    <div className='flex flex-col gap-2'>
                      <h3 className='text-sm font-medium'>Medium Energy</h3>
                      <div className='flex gap-1'>
                        {[4, 5, 6].map(level => (
                          <Button
                            key={level}
                            type='button'
                            variant={
                              field.value === level ? 'default' : 'outline'
                            }
                            onClick={() => field.onChange(level)}
                            size='sm'
                          >
                            {level}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div
                      className='h-16 w-px bg-border'
                      aria-hidden='true'
                    />

                    <div className='flex flex-col gap-2'>
                      <h3 className='text-sm font-medium'>High Energy</h3>
                      <div className='flex gap-1'>
                        {[7, 8, 9, 10].map(level => (
                          <Button
                            key={level}
                            type='button'
                            variant={
                              field.value === level ? 'default' : 'outline'
                            }
                            onClick={() => field.onChange(level)}
                            size='sm'
                          >
                            {level}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='tags.type'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Activity Types - Multiple Selection</FormLabel>
                <FormControl>
                  <div className='flex flex-wrap gap-2'>
                    {Object.values(EActivityType).map(type => (
                      <Button
                        key={type}
                        type='button'
                        variant={
                          field.value.includes(type) ? 'default' : 'outline'
                        }
                        onClick={() => {
                          const newTypes = field.value.includes(type)
                            ? field.value.filter(t => t !== type)
                            : [...field.value, type];
                          field.onChange(newTypes);
                        }}
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type='submit'
          className='w-full'
          disabled={createMutation.isPending || updateMutation.isPending}
        >
          {program ? 'Update' : 'Create'} Program
        </Button>
      </form>
    </Form>
  );
}

export default ProgramForm;
