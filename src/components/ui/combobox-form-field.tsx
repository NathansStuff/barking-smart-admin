'use client';

import { ReactNode } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

import { Check, ChevronsUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface Option {
  value: string;
  label: string;
}

interface ComboboxFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  emptyText?: string;
  options: Option[];
  className?: string;
}

function ComboboxFormField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = 'Select option...',
  emptyText = 'No option found.',
  options,
  className,
}: ComboboxFormFieldProps<T>): ReactNode {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant='outline'
                  role='combobox'
                  className='w-full justify-between'
                >
                  {field.value ? options.find((option) => option.value === field.value)?.label : placeholder}
                  <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className='p-0'
              style={{ width: 'var(--radix-popover-trigger-width)' }}
              align='start'
            >
              <Command>
                <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
                <CommandList>
                  <CommandEmpty>{emptyText}</CommandEmpty>
                  <CommandGroup>
                    <CommandItem
                      value=''
                      onSelect={() => {
                        field.onChange('');
                      }}
                    >
                      <Check className={cn('mr-2 h-4 w-4', !field.value ? 'opacity-100' : 'opacity-0')} />
                      {placeholder}
                    </CommandItem>
                    {options.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={() => {
                          field.onChange(option.value);
                        }}
                      >
                        <Check
                          className={cn('mr-2 h-4 w-4', field.value === option.value ? 'opacity-100' : 'opacity-0')}
                        />
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default ComboboxFormField;
