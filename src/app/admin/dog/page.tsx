'use client';

import { ReactNode, useEffect, useState } from 'react';

import { ColumnDef, ColumnFiltersState, SortingState } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown, Edit, Trash } from 'lucide-react';
import { Route } from 'next';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { DataTable } from '@/components/general/DataTable/components/DataTable';
import { DataTablePagination } from '@/components/general/DataTable/components/DataTablePagination';
import { UseDataTable } from '@/components/general/DataTable/hooks/UseDataTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useDeleteDog } from '@/features/dog/api/useDeleteDog';
import { useGetDogs } from '@/features/dog/api/useGetDogs';
import { DogWithId } from '@/features/dog/types/Dog';
import { EBreed } from '@/features/dog/types/EBreed';
import { EGender } from '@/features/dog/types/EGender';
import { ELocation } from '@/features/program/types/ELocation';
import UseConfirm from '@/hooks/UseConfirm';
import { useDebounce } from '@/hooks/useDebounce';

import DogPageSkeleton from './DogPageSkeleton';

interface DogFilters {
  immediate: {
    breed: string | 'all';
    gender: string | 'all';
    location: string | 'all';
  };
  debounced: {
    name: string;
  };
}

interface FiltersProps {
  filters: DogFilters;
  onImmediateFilterChange: (key: keyof DogFilters['immediate'], value: string) => void;
  onDebouncedFilterChange: (key: keyof DogFilters['debounced'], value: string) => void;
  onClearFilters: () => void;
}

function Filters({
  filters,
  onImmediateFilterChange,
  onDebouncedFilterChange,
  onClearFilters,
}: FiltersProps): ReactNode {
  return (
    <div className='space-y-4 p-4'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Input
          placeholder='Filter by name...'
          value={filters.debounced.name}
          onChange={(e) => onDebouncedFilterChange('name', e.target.value)}
        />
        <Select
          value={filters.immediate.breed}
          onValueChange={(value) => onImmediateFilterChange('breed', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder='Select breed' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Breeds</SelectItem>
            {Object.values(EBreed).map((breed) => (
              <SelectItem
                key={breed}
                value={breed}
              >
                {breed.replace(/_/g, ' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={filters.immediate.gender}
          onValueChange={(value) => onImmediateFilterChange('gender', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder='Select gender' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Genders</SelectItem>
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
        <Select
          value={filters.immediate.location}
          onValueChange={(value) => onImmediateFilterChange('location', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder='Select location' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Locations</SelectItem>
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
      </div>
      <Button
        variant='outline'
        onClick={onClearFilters}
        className='w-full'
      >
        Clear Filters
      </Button>
    </div>
  );
}

function DogPage(): ReactNode {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [ConfirmDialog, confirm] = UseConfirm('Are you sure?', 'This action cannot be undone.');

  const deleteMutation = useDeleteDog();

  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<DogWithId>[] = [
    {
      accessorKey: 'name',
      header: ({ column }): ReactNode => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className='flex items-center gap-1'
          >
            Name
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
      accessorKey: 'breedOne',
      header: 'Primary Breed',
    },
    {
      accessorKey: 'breedTwo',
      header: 'Secondary Breed',
      cell: ({ row }) => row.original.breedTwo || '-',
    },
    {
      accessorKey: 'gender',
      header: 'Gender',
    },
    {
      accessorKey: 'location',
      header: 'Location',
    },
    {
      accessorKey: 'howActive',
      header: 'Activity Level',
      cell: ({ row }) => <Badge variant='outline'>{row.original.howActive}/10</Badge>,
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className='flex space-x-2'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => router.push(`/admin/dog/${row.original._id}`)}
              >
                <Edit className='size-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Edit dog</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => handleDelete(row.original._id.toString())}
                disabled={deleteMutation.isPending}
              >
                <Trash className='size-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete dog</TooltipContent>
          </Tooltip>
        </div>
      ),
    },
  ];

  const [filters, setFilters] = useState<DogFilters>({
    immediate: {
      breed: (searchParams.get('breed') as EBreed) || 'all',
      gender: (searchParams.get('gender') as EGender) || 'all',
      location: (searchParams.get('location') as ELocation) || 'all',
    },
    debounced: {
      name: searchParams.get('name') || '',
    },
  });

  const debouncedFilters = useDebounce(filters.debounced, 500);

  const handleImmediateFilterChange = (key: keyof DogFilters['immediate'], value: string): void => {
    setFilters((prev) => ({
      ...prev,
      immediate: { ...prev.immediate, [key]: value },
    }));
  };

  const handleDebouncedFilterChange = (key: keyof DogFilters['debounced'], value: string): void => {
    setFilters((prev) => ({
      ...prev,
      debounced: { ...prev.debounced, [key]: value },
    }));
  };

  const handleClearFilters = (): void => {
    setFilters({
      immediate: {
        breed: 'all',
        gender: 'all',
        location: 'all',
      },
      debounced: {
        name: '',
      },
    });
  };

  const dogQuery = useGetDogs({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    filters: {
      name: debouncedFilters.name,
      breed: filters.immediate.breed === 'all' ? undefined : (filters.immediate.breed as EBreed),
      location: filters.immediate.location === 'all' ? undefined : (filters.immediate.location as ELocation),
    },
  });

  const { table, setColumnFilters } = UseDataTable({
    data: dogQuery.data?.dogs ?? [],
    columns,
    pageCount: Math.ceil((dogQuery.data?.total ?? 0) / pagination.pageSize),
    initialPagination: pagination,
    onPaginationChange: setPagination,
    sorting: sorting,
    onSortingChange: setSorting,
  });

  const handleDelete = async (id: string): Promise<void> => {
    const ok = await confirm();
    if (!ok) return;
    deleteMutation.mutate(id);
  };

  useEffect(() => {
    const hasActiveFilters =
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(filters.immediate).some(([key, value]) => value !== 'all') ||
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(filters.debounced).some(([key, value]) => value !== '');

    if (!hasActiveFilters) {
      router.replace('/admin/dog', { scroll: false });
      return;
    }

    const params = new URLSearchParams();
    if (filters.debounced.name) params.set('name', filters.debounced.name);
    if (filters.immediate.breed !== 'all') params.set('breed', filters.immediate.breed);
    if (filters.immediate.gender !== 'all') params.set('gender', filters.immediate.gender);
    if (filters.immediate.location !== 'all') params.set('location', filters.immediate.location);

    const path: Route = `/admin/dog?${params.toString()}`;
    router.replace(path, { scroll: false });
  }, [filters, router]);

  useEffect(() => {
    const columnFilters: ColumnFiltersState = [];

    Object.entries(filters.immediate).forEach(([key, value]) => {
      if (value !== 'all') {
        columnFilters.push({ id: key, value });
      }
    });

    Object.entries(debouncedFilters).forEach(([key, value]) => {
      if (value) {
        columnFilters.push({ id: key, value });
      }
    });

    setColumnFilters(columnFilters);
  }, [filters.immediate, debouncedFilters, setColumnFilters]);

  return (
    <>
      <ConfirmDialog />
      <TooltipProvider>
        <div className='container mx-auto p-4'>
          <div className='mb-4 flex justify-end'>
            <Button
              onClick={() => router.push('/admin/dog/create')}
              id='create-dog-button'
            >
              Add New Dog
            </Button>
          </div>
          {dogQuery.isLoading ? (
            <DogPageSkeleton />
          ) : (
            <Card>
              <Filters
                filters={filters}
                onImmediateFilterChange={handleImmediateFilterChange}
                onDebouncedFilterChange={handleDebouncedFilterChange}
                onClearFilters={handleClearFilters}
              />
              <DataTable
                table={table}
                columns={columns}
              />
              <DataTablePagination table={table} />
              <div className='p-4 text-right text-sm text-muted-foreground'>
                Total Dogs: {dogQuery.data?.total ?? 0}
              </div>
            </Card>
          )}
        </div>
      </TooltipProvider>
    </>
  );
}

export default DogPage;
