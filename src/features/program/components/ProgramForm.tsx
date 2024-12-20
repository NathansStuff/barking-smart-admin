'use client';

import { ReactNode, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { FileText, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

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
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useAppSelector } from '@/contexts/storeHooks';
import { selectRole } from '@/contexts/userSlice';
import SavePdfButton from '@/features/pdf/components/SavePdfButton';
import FileUploadZone from '@/features/s3/components/FileUploadZone';
import { EUserRole } from '@/features/user/types/EUserRole';

import { generateProgramContent } from '../api/generateProgramContent';
import { generateProgramFieldname } from '../api/generateProgramFieldname';
import { uploadFile } from '../api/uploadFile';
import { useCreateProgram } from '../api/useCreateProgram';
import { useUpdateProgram } from '../api/useUpdateProgram';
import { EActivityType } from '../types/EActivityType';
import { EChallenge } from '../types/EChallenge';
import { EDuration } from '../types/EDuration';
import { ELocation } from '../types/ELocation';
import { ESpace } from '../types/ESpace';
import { Program, ProgramWithId } from '../types/Program';

type Props = {
  program?: ProgramWithId;
  initialData?: Partial<Program>;
};

function ProgramForm({ program, initialData }: Props): ReactNode {
  const createMutation = useCreateProgram();
  const updateMutation = useUpdateProgram();
  const router = useRouter();
  const role = useAppSelector(selectRole);

  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<Program>({
    resolver: zodResolver(Program),
    defaultValues: {
      title: program?.title || '',
      description: program?.description || '',
      materialsNeeded: program?.materialsNeeded || '',
      approved: program?.approved || false,
      setup: program?.setup || '',
      instructions: program?.instructions || '',
      additionalTips: program?.additionalTips || '',
      pdfLink: program?.pdfLink || undefined,
      variation: program?.variation || 1,
      tags: program?.tags || {
        location: initialData?.tags?.location || ELocation.INDOORS,
        energyLevel: initialData?.tags?.energyLevel || 1,
        duration: initialData?.tags?.duration || EDuration.LONG,
        challenge: initialData?.tags?.challenge || EChallenge.EASY,
        type: initialData?.tags?.type || [],
        space: initialData?.tags?.space || ESpace.LARGE,
      },
    },
  });

  const onSubmit = async (data: Program): Promise<void> => {
    if (program) {
      toast.loading('Updating program...');
      updateMutation.mutate(
        { id: program._id.toString(), data },
        {
          onSuccess: () => {
            toast.dismiss();
            toast.success('Program updated successfully');
          },
          onError: error => {
            toast.dismiss();
            toast.error(`Failed to update program: ${error.message}`);
          },
        }
      );
    } else {
      toast.loading('Creating program...');
      createMutation.mutate(data, {
        onSuccess: response => {
          toast.dismiss();
          toast.success('Program created successfully');
          router.push(`/admin/program/${response._id}`);
        },
        onError: error => {
          toast.dismiss();
          toast.error(`Failed to create program: ${error.message}`);
        },
      });
    }
  };

  const generateContent = useCallback(async (): Promise<void> => {
    setIsGenerating(true);
    try {
      // Build prompt with existing form data
      const currentValues = form.getValues();
      let prompt = 'Generate a fun and engaging dog enrichment activity';

      if (currentValues.title) prompt += ` similar to "${currentValues.title}"`;
      if (currentValues.tags.location)
        prompt += ` that can be done ${currentValues.tags.location}`;
      if (currentValues.tags.space)
        prompt += ` in a ${currentValues.tags.space} space`;
      if (currentValues.tags.duration)
        prompt += ` for a ${currentValues.tags.duration} duration`;
      if (currentValues.tags.energyLevel)
        prompt += ` with energy level ${currentValues.tags.energyLevel}/10`;
      if (currentValues.tags.challenge)
        prompt += ` at a ${currentValues.tags.challenge} difficulty level`;
      if (currentValues.tags.type.length > 0)
        prompt += ` involving ${currentValues.tags.type.join(' and ')}`;

      const aiContent = await generateProgramContent(prompt);

      // Update form with AI-generated content
      form.setValue('title', aiContent.title);
      form.setValue('description', aiContent.description);
      form.setValue('materialsNeeded', aiContent.materialsNeeded);
      form.setValue('setup', aiContent.setup);
      form.setValue('instructions', aiContent.instructions);
      form.setValue('additionalTips', aiContent.additionalTips);
      form.setValue('tags', aiContent.tags);
    } catch (error) {
      console.error('Error generating content:', error);
      // Handle error (show toast, etc.)
    } finally {
      setIsGenerating(false);
    }
  }, [form]);

  // Add this function to handle individual field generation
  const handleGenerateField = async (fieldName: string): Promise<void> => {
    setIsGenerating(true);
    try {
      const currentValues = form.getValues();
      let context = `Generate ${fieldName} for a dog enrichment activity`;

      if (currentValues.title && fieldName !== 'title') {
        context += `. Title: ${currentValues.title}`;
      }
      if (currentValues.description && fieldName !== 'description') {
        context += `. Description: ${currentValues.description}`;
      }
      if (currentValues.materialsNeeded && fieldName !== 'materialsNeeded') {
        context += `. Materials needed: ${currentValues.materialsNeeded}`;
      }
      if (currentValues.setup && fieldName !== 'setup') {
        context += `. Setup: ${currentValues.setup}`;
      }
      if (currentValues.instructions && fieldName !== 'instructions') {
        context += `. Instructions: ${currentValues.instructions}`;
      }
      if (currentValues.additionalTips && fieldName !== 'additionalTips') {
        context += `. Additional tips: ${currentValues.additionalTips}`;
      }

      // Add context from tags
      if (currentValues.tags) {
        if (currentValues.tags.location) {
          context += `. Location: ${currentValues.tags.location}`;
        }
        if (currentValues.tags.space) {
          context += `. Space required: ${currentValues.tags.space}`;
        }
        if (currentValues.tags.duration) {
          context += `. Duration: ${currentValues.tags.duration}`;
        }
        if (currentValues.tags.challenge) {
          context += `. Difficulty: ${currentValues.tags.challenge}`;
        }
        if (currentValues.tags.energyLevel) {
          context += `. Energy level: ${currentValues.tags.energyLevel}/10`;
        }
        if (currentValues.tags.type.length > 0) {
          context += `. Activity types: ${currentValues.tags.type.join(', ')}`;
        }
      }

      // Only allow specific field names to be generated
      const allowedFields = [
        'title',
        'description',
        'materialsNeeded',
        'setup',
        'instructions',
        'additionalTips',
      ] as const;

      if (
        !allowedFields.includes(fieldName as (typeof allowedFields)[number])
      ) {
        throw new Error(`Invalid field name: ${fieldName}`);
      }

      const content = await generateProgramFieldname(fieldName, context);
      form.setValue(fieldName as (typeof allowedFields)[number], content);
    } catch (error) {
      console.error(`Error generating ${fieldName}:`, error);
    } finally {
      setIsGenerating(false);
    }
  };

  function GenerateFieldButton({
    onGenerate,
  }: {
    onGenerate: () => Promise<void>;
  }): ReactNode {
    return (
      <Button
        type='button'
        variant='outline'
        size='sm'
        onClick={onGenerate}
        className='ml-2'
      >
        Generate
      </Button>
    );
  }

  // Add useEffect to trigger content generation on mount if no program exists
  useEffect(() => {
    if (!program && !initialData?.title) {
      generateContent();
    }
  }, [program, initialData?.title, generateContent]);

  return (
    <>
      <Form {...form}>
        <div className='relative'>
          {isGenerating && (
            <div className='absolute inset-0 bg-background/80 flex items-center justify-center z-50 rounded-lg'>
              <Loader2 className='size-40 animate-spin' />
            </div>
          )}
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6'
          >
            <div className='flex gap-2 items-center '>
              {/* Add AI generation button */}
              <Button
                type='button'
                onClick={generateContent}
              >
                Generate Content with AI
              </Button>

              {program && (
                <Button
                  asChild
                  type='button'
                >
                  <Link href={`/admin/program/${program?._id}/preview`}>
                    Preview PDF
                  </Link>
                </Button>
              )}
              {program && (
                <SavePdfButton
                  program={program}
                  variation={form.getValues('variation')}
                  onSuccess={link => {
                    form.setValue('pdfLink', link);
                  }}
                />
              )}
              {role === EUserRole.ADMIN && (
                <FormField
                  control={form.control}
                  name='approved'
                  render={({ field }) => (
                    <FormItem className='flex items-center justify-center gap-2'>
                      <FormLabel>Approved</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={checked => {
                            field.onChange(checked);
                          }}
                          className='!mt-0 data-[state=on]:bg-green-500'
                          aria-label='Toggle program approval'
                        >
                          {field.value ? 'Approved' : 'Not Approved'}
                        </Switch>
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}

              <Button
                type='submit'
                id='submit-program-button'
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {program ? 'Update' : 'Create'} Program
              </Button>
            </div>
            <Separator />

            {/* Links Section */}
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='pdfLink'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>PDF Link</FormLabel>
                    <FormControl className='w-full'>
                      <div className='space-y-4'>
                        <div className='flex gap-2 w-full'>
                          <Input
                            className='w-full'
                            {...field}
                          />
                          <Button
                            variant='ghost'
                            size='icon'
                            onClick={() =>
                              window.open(form.getValues('pdfLink'), '_blank')
                            }
                          >
                            <FileText className='size-4' />
                          </Button>
                        </div>
                        <FileUploadZone
                          onFileSelect={async file => {
                            try {
                              toast.loading('Uploading PDF...');
                              const filename = `program_${Date.now()}.pdf`;
                              const url = await uploadFile(file, filename);
                              if (url) {
                                field.onChange(url);
                                toast.dismiss();
                                toast.success('PDF uploaded successfully');
                              }
                            } catch (error) {
                              toast.dismiss();
                              toast.error('Failed to upload PDF');
                              console.error('Upload error:', error);
                            }
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Separator />

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
                            variant={
                              field.value === space ? 'default' : 'outline'
                            }
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
            <Separator />

            {/* Basic Information */}
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex gap-4 items-center'>
                      <FormLabel>Title</FormLabel>
                      <GenerateFieldButton
                        onGenerate={() => handleGenerateField('title')}
                      />
                    </div>
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
                    <div className='flex gap-4 items-center'>
                      <FormLabel>
                        Description - Not in PDF, in UI only
                      </FormLabel>
                      <GenerateFieldButton
                        onGenerate={() => handleGenerateField('description')}
                      />
                    </div>
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
                    <div className='flex gap-4 items-center'>
                      <FormLabel>Materials Needed</FormLabel>
                      <GenerateFieldButton
                        onGenerate={() =>
                          handleGenerateField('materialsNeeded')
                        }
                      />
                    </div>
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
                    <div className='flex gap-4 items-center'>
                      <FormLabel>Setup</FormLabel>
                      <GenerateFieldButton
                        onGenerate={() => handleGenerateField('setup')}
                      />
                    </div>
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
                    <div className='flex gap-4 items-center'>
                      <FormLabel>Instructions</FormLabel>
                      <GenerateFieldButton
                        onGenerate={() => handleGenerateField('instructions')}
                      />
                    </div>
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
                    <div className='flex gap-4 items-center'>
                      <FormLabel>Additional Tips</FormLabel>
                      <GenerateFieldButton
                        onGenerate={() => handleGenerateField('additionalTips')}
                      />
                    </div>
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

            <Button
              type='submit'
              className='w-full'
              id='submit-program-button'
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {program ? 'Update' : 'Create'} Program
            </Button>
          </form>
        </div>
      </Form>
    </>
  );
}

export default ProgramForm;
