'use client';

import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import ComboboxFormField from '@/components/ui/combobox-form-field';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { uploadFile } from '@/features/program/api/uploadFile';
import { ELocation } from '@/features/program/types/ELocation';
import FileUploadZone from '@/features/s3/components/FileUploadZone';

import { useDogMutation } from '../api/useDogMutation';
import { Dog, DogWithId } from '../types/Dog';
import { EBreed } from '../types/EBreed';
import { EGender } from '../types/EGender';
import { EHealthIssues } from '../types/EHealthIssues';

type Props = {
  dog?: DogWithId;
};

function DogForm({ dog }: Props): ReactNode {
  const router = useRouter();
  const mutation = useDogMutation();

  const form = useForm<Dog>({
    resolver: zodResolver(Dog),
    defaultValues: {
      name: dog?.name || '',
      dateOfBirth: dog?.dateOfBirth || new Date(),
      purebred: dog?.purebred || false,
      breedOne: dog?.breedOne || EBreed.LABRADOR_RETRIEVER,
      breedTwo: dog?.breedTwo,
      gender: dog?.gender || EGender.MALE,
      profileUrl: dog?.profileUrl || undefined,
      bio: dog?.bio || '',
      desexed: dog?.desexed || false,
      healthIssues: dog?.healthIssues || [],
      howActive: dog?.howActive || 5,
      weight: dog?.weight,
      foodOrientated: dog?.foodOrientated || false,
      location: dog?.location || ELocation.INDOORS,
    },
  });

  const onSubmit = async (data: Dog): Promise<void> => {
    if (dog) {
      toast.loading('Updating dog profile...');
      mutation.mutate(
        { id: dog._id.toString(), data },
        {
          onSuccess: () => {
            toast.dismiss();
            toast.success('Dog profile updated successfully');
          },
          onError: (error) => {
            toast.dismiss();
            toast.error(`Failed to update dog profile: ${error.message}`);
          },
        }
      );
    } else {
      toast.loading('Creating dog profile...');
      mutation.mutate(
        { data },
        {
          onSuccess: (response) => {
            toast.dismiss();
            toast.success('Dog profile created successfully');
            router.push(`/admin/dog/${response._id}`);
          },
          onError: (error) => {
            toast.dismiss();
            toast.error(`Failed to create dog profile: ${error.message}`);
          },
        }
      );
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6'
      >
        <div className='flex items-center gap-2'>
          <div>
            <Button
              type='submit'
              className='w-full'
              disabled={mutation.isPending}
            >
              {dog ? 'Update' : 'Create'} Dog Profile
            </Button>
          </div>
          <Button asChild>
            <Link href={`/admin/dog/${dog?._id}/generate-program`}>Generate Program</Link>
          </Button>
        </div>
        {/* Basic Information */}
        <div className='grid grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='dateOfBirth'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input
                    type='date'
                    value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : ''}
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Breed Information */}
        <div className='grid grid-cols-2 gap-4'>
          <ComboboxFormField
            control={form.control}
            name='breedOne'
            label='Primary Breed'
            placeholder='Select breed...'
            options={Object.values(EBreed).map((breed) => ({
              value: breed,
              label: breed.replace(/_/g, ' '),
            }))}
          />

          <ComboboxFormField
            control={form.control}
            name='breedTwo'
            label='Secondary Breed (Optional)'
            placeholder='Select breed...'
            options={Object.values(EBreed).map((breed) => ({
              value: breed,
              label: breed.replace(/_/g, ' '),
            }))}
          />
        </div>
        {/* Additional Information */}
        <div className='grid grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='gender'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(EGender).map((gender) => (
                      <SelectItem
                        key={gender}
                        value={gender}
                      >
                        {gender}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='location'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(ELocation).map((location) => (
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
        </div>
        {/* Health and Characteristics */}
        <div className='grid grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='healthIssues'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Health Issues</FormLabel>
                <FormControl>
                  <div className='flex flex-wrap gap-2'>
                    {Object.values(EHealthIssues).map((issue) => (
                      <Button
                        key={issue}
                        type='button'
                        variant={field.value.includes(issue) ? 'default' : 'outline'}
                        onClick={() => {
                          const newValue = field.value.includes(issue)
                            ? field.value.filter((i) => i !== issue)
                            : [...field.value, issue];
                          field.onChange(newValue);
                        }}
                      >
                        {issue}
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
            name='weight'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight (kg)</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Activity Level */}
        <FormField
          control={form.control}
          name='howActive'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Activity Level (1-10)</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  min={1}
                  max={10}
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Toggles */}
        <div className='grid grid-cols-3 gap-4'>
          <FormField
            control={form.control}
            name='purebred'
            render={({ field }) => (
              <FormItem className='flex items-center gap-2'>
                <FormLabel>Purebred</FormLabel>
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
            name='desexed'
            render={({ field }) => (
              <FormItem className='flex items-center gap-2'>
                <FormLabel>Desexed</FormLabel>
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
            name='foodOrientated'
            render={({ field }) => (
              <FormItem className='flex items-center gap-2'>
                <FormLabel>Food Orientated</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        {/* Bio */}
        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className='h-32'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Profile Image Upload */}
        <FormField
          control={form.control}
          name='profileUrl'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                <div className='space-y-4'>
                  {field.value && (
                    <Image
                      src={field.value}
                      alt='Profile'
                      className='h-32 w-32 rounded-lg object-cover'
                      width={100}
                      height={100}
                    />
                  )}
                  <FileUploadZone
                    onFileSelect={async (file) => {
                      try {
                        toast.loading('Uploading image...');
                        const filename = `dog_${Date.now()}_${file.name}`;
                        const url = await uploadFile(file, filename);
                        if (url) {
                          field.onChange(url);
                          toast.dismiss();
                          toast.success('Image uploaded successfully');
                        }
                      } catch (error) {
                        toast.dismiss();
                        toast.error('Failed to upload image');
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
        <Button
          type='submit'
          className='w-full'
          disabled={mutation.isPending}
        >
          {dog ? 'Update' : 'Create'} Dog Profile
        </Button>
      </form>
    </Form>
  );
}

export default DogForm;
