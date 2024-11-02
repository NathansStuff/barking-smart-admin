'use client';

import React, { ReactNode, useMemo, useState } from 'react';

import { ColumnDef, SortingState } from '@tanstack/react-table';
import debounce from 'lodash/debounce';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

import AdminOnly from '@/components/container/AdminOnly';
import { DataTable } from '@/components/general/DataTable/components/DataTable';
import { DataTablePagination } from '@/components/general/DataTable/components/DataTablePagination';
import { UseDataTable } from '@/components/general/DataTable/hooks/UseDataTable';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EActivityType } from '@/features/program/types/EActivityType';
import { EChallenge } from '@/features/program/types/EChallenge';
import { EDuration } from '@/features/program/types/EDuration';
import { EEnergyLevel } from '@/features/program/types/EEnergyLevel';
import { ELocation } from '@/features/program/types/ELocation';
import { ESpace } from '@/features/program/types/ESpace';
import { useCreateRequiredProgram } from '@/features/requiredProgram/api/useCreateRequiredProgram';
import { useGetRequiredPrograms } from '@/features/requiredProgram/api/useGetRequiredPrograms';
import { useUpdateRequiredProgram } from '@/features/requiredProgram/api/useUpdateRequiredProgram';
import { RequiredProgramWithId } from '@/features/requiredProgram/types/RequiredProgram';
import {
  generateTagCombinations,
  mergeWithExistingPrograms,
} from '@/features/requiredProgram/utils/generateTagCombinations';

import { RequiredProgramSkeleton } from './RequiredProgramSkeleton';

function RequiredProgramsPage(): ReactNode {
  console.log('Component function called');
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState<SortingState>([]);

  const [filters, setFilters] = useState({
    location: 'all',
    energyLevel: 'all',
    duration: 'all',
    challenge: 'all',
    type: 'all',
    space: 'all',
  });

  const columns: ColumnDef<RequiredProgramWithId>[] = [
    {
      accessorKey: 'tags.location',
      header: ({ column }): React.JSX.Element => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className='flex items-center gap-1 justify-start w-full'
          >
            Location
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp className='h-4 w-4' />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown className='h-4 w-4' />
            ) : (
              <ArrowUpDown className='h-4 w-4' />
            )}
          </Button>
        );
      },
    },
    {
      accessorKey: 'tags.energyLevel',
      header: ({ column }): React.JSX.Element => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className='flex items-center gap-1 justify-start w-full'
          >
            Energy Level
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp className='h-4 w-4' />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown className='h-4 w-4' />
            ) : (
              <ArrowUpDown className='h-4 w-4' />
            )}
          </Button>
        );
      },
    },
    {
      accessorKey: 'tags.duration',
      header: ({ column }): React.JSX.Element => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className='flex items-center gap-1 justify-start w-full'
          >
            Duration
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp className='h-4 w-4' />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown className='h-4 w-4' />
            ) : (
              <ArrowUpDown className='h-4 w-4' />
            )}
          </Button>
        );
      },
    },
    {
      accessorKey: 'tags.challenge',
      header: ({ column }): React.JSX.Element => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className='flex items-center gap-1 justify-start w-full'
          >
            Challenge
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp className='h-4 w-4' />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown className='h-4 w-4' />
            ) : (
              <ArrowUpDown className='h-4 w-4' />
            )}
          </Button>
        );
      },
    },
    {
      accessorKey: 'tags.type',
      header: ({ column }): React.JSX.Element => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className='flex items-center gap-1 justify-start w-full'
          >
            Type
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp className='h-4 w-4' />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown className='h-4 w-4' />
            ) : (
              <ArrowUpDown className='h-4 w-4' />
            )}
          </Button>
        );
      },
      cell: ({ row }) => <div>{(row.original.tags.type || []).join(', ')}</div>,
    },
    {
      accessorKey: 'tags.space',
      header: ({ column }): React.JSX.Element => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className='flex items-center gap-1 justify-start w-full'
          >
            Space
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp className='h-4 w-4' />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown className='h-4 w-4' />
            ) : (
              <ArrowUpDown className='h-4 w-4' />
            )}
          </Button>
        );
      },
    },
    {
      accessorKey: 'count',
      header: ({ column }): React.JSX.Element => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className='flex items-center gap-1 justify-start w-full'
          >
            Count
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp className='h-4 w-4' />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown className='h-4 w-4' />
            ) : (
              <ArrowUpDown className='h-4 w-4' />
            )}
          </Button>
        );
      },
      cell: ({ row }) => (
        <Input
          type='number'
          min={0}
          value={row.original.count}
          onChange={e =>
            handleCountChange(row.original, parseInt(e.target.value))
          }
          className='w-20'
        />
      ),
    },
  ];

  const requiredProgramQuery = useGetRequiredPrograms({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  });

  const updateMutation = useUpdateRequiredProgram();
  const createMutation = useCreateRequiredProgram();

  const handleCountChange = useMemo(
    () =>
      debounce((program: RequiredProgramWithId, count: number) => {
        if (String(program._id).startsWith('virtual_')) {
          // Create new program
          createMutation.mutate({
            tags: program.tags,
            count,
          });
        } else {
          // Update existing program
          updateMutation.mutate({
            id: program._id.toString(),
            data: { count },
          });
        }
      }, 500),
    [createMutation, updateMutation]
  );

  // Generate all possible combinations and merge with existing data
  const allPrograms = useMemo(() => {
    const combinations = generateTagCombinations();
    let merged = mergeWithExistingPrograms(
      combinations,
      requiredProgramQuery.data?.programs ?? []
    );

    // Apply filters
    merged = merged.filter(program => {
      return (
        (filters.location === 'all' ||
          program.tags.location === filters.location) &&
        (filters.energyLevel === 'all' ||
          program.tags.energyLevel === filters.energyLevel) &&
        (filters.duration === 'all' ||
          program.tags.duration === filters.duration) &&
        (filters.challenge === 'all' ||
          program.tags.challenge === filters.challenge) &&
        (filters.type === 'all' ||
          program.tags.type?.includes(filters.type as EActivityType)) &&
        (filters.space === 'all' || program.tags.space === filters.space)
      );
    });

    // Apply sorting
    if (sorting.length > 0) {
      const { id, desc } = sorting[0];
      merged.sort((a, b) => {
        // Type-safe way to access nested properties
        const getNestedValue = (
          obj: RequiredProgramWithId,
          path: string
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ): any => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return path.split('.').reduce((acc: any, key: string) => {
            if (acc && typeof acc === 'object' && key in acc) {
              return acc[key];
            }
            return undefined;
          }, obj);
        };

        const aValue = getNestedValue(a, id);
        const bValue = getNestedValue(b, id);

        if (aValue == null) return desc ? -1 : 1;
        if (bValue == null) return desc ? 1 : -1;

        // Handle different types of values
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return desc ? bValue - aValue : aValue - bValue;
        }

        // Convert to string for comparison
        const aString = String(aValue);
        const bString = String(bValue);
        return desc
          ? bString.localeCompare(aString)
          : aString.localeCompare(bString);
      });
    }

    return merged;
  }, [requiredProgramQuery.data?.programs, filters, sorting]);

  // Calculate the start and end indices for the current page
  const pageStart = pagination.pageIndex * pagination.pageSize;
  const pageEnd = pageStart + pagination.pageSize;

  // Slice the data according to the current page
  const paginatedPrograms = allPrograms.slice(pageStart, pageEnd);

  const { table } = UseDataTable({
    data: paginatedPrograms,
    columns,
    pageCount: Math.ceil(allPrograms.length / pagination.pageSize),
    initialPagination: pagination,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
  });

  function Filters(): ReactNode {
    return (
      <div className='p-4 grid gap-4 md:grid-cols-3 lg:grid-cols-6'>
        <Select
          value={filters.location}
          onValueChange={value =>
            setFilters(prev => ({ ...prev, location: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder='Filter Location' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Locations</SelectItem>
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

        <Select
          value={filters.energyLevel}
          onValueChange={value =>
            setFilters(prev => ({ ...prev, energyLevel: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder='Filter Energy Level' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Energy Levels</SelectItem>
            {Object.values(EEnergyLevel).map(level => (
              <SelectItem
                key={level}
                value={level}
              >
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.duration}
          onValueChange={value =>
            setFilters(prev => ({ ...prev, duration: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder='Filter Duration' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Durations</SelectItem>
            {Object.values(EDuration).map(duration => (
              <SelectItem
                key={duration}
                value={duration}
              >
                {duration}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.challenge}
          onValueChange={value =>
            setFilters(prev => ({ ...prev, challenge: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder='Filter Challenge' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Challenges</SelectItem>
            {Object.values(EChallenge).map(challenge => (
              <SelectItem
                key={challenge}
                value={challenge}
              >
                {challenge}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.type}
          onValueChange={value =>
            setFilters(prev => ({ ...prev, type: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder='Filter Type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Types</SelectItem>
            {Object.values(EActivityType).map(type => (
              <SelectItem
                key={type}
                value={type}
              >
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.space}
          onValueChange={value =>
            setFilters(prev => ({ ...prev, space: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder='Filter Space' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Spaces</SelectItem>
            {Object.values(ESpace).map(space => (
              <SelectItem
                key={space}
                value={space}
              >
                {space}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant='outline'
          onClick={() =>
            setFilters({
              location: 'all',
              energyLevel: 'all',
              duration: 'all',
              challenge: 'all',
              type: 'all',
              space: 'all',
            })
          }
          className='col-span-full'
        >
          Clear Filters
        </Button>
      </div>
    );
  }

  if (requiredProgramQuery.isLoading) {
    return (
      <>
        <AdminOnly />
        <section className='mx-4 overflow-hidden'>
          <Card className='mx-auto mt-10 max-w-6xl text-left'>
            <RequiredProgramSkeleton />
          </Card>
        </section>
      </>
    );
  }

  return (
    <>
      <AdminOnly />
      <section className='mx-4 overflow-hidden'>
        <Card className='mx-auto mt-10 max-w-6xl text-left'>
          <Filters />
          <DataTable
            table={table}
            columns={columns}
          />
          <DataTablePagination table={table} />
          <div className='p-4 text-right text-sm text-muted-foreground'>
            Filtered Programs: {allPrograms.length} | Total Required Programs:{' '}
            {requiredProgramQuery.data?.total ?? 0}
          </div>
        </Card>
      </section>
    </>
  );
}

export default RequiredProgramsPage;
