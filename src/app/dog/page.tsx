'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';

import { ColumnDef, SortingState } from '@tanstack/react-table';
import debounce from 'lodash/debounce';
import { ArrowDown, ArrowUp, ArrowUpDown, Edit, Trash } from 'lucide-react';
import { Route } from 'next';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import AdminOnly from '@/components/container/AdminOnly';
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

import DogPageSkeleton from './DogPageSkeleton';
interface DogFilters {
  name: string;
  breed: string | 'all';
  gender: string | 'all';
  location: string | 'all';
}

function DogPage(): ReactNode {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<DogFilters>({
    name: searchParams.get('name') || '',
    breed: (searchParams.get('breed') as EBreed) || 'all',
    gender: (searchParams.get('gender') as EGender) || 'all',
    location: (searchParams.get('location') as ELocation) || 'all',
  });

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
                onClick={() => router.push(`/dog/${row.original._id}`)}
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

  const dogQuery = useGetDogs({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    filters: {
      name: filters.name,
      breed: filters.breed === 'all' ? undefined : (filters.breed as EBreed),
      location: filters.location === 'all' ? undefined : (filters.location as ELocation),
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

  const debouncedUpdateFilters = useMemo(
    () =>
      debounce((newFilters: DogFilters) => {
        const columnFilters = [];
        if (newFilters.name) {
          columnFilters.push({ id: 'name', value: newFilters.name });
        }
        if (newFilters.breed !== 'all') {
          columnFilters.push({ id: 'breed', value: newFilters.breed });
        }
        if (newFilters.gender !== 'all') {
          columnFilters.push({ id: 'gender', value: newFilters.gender });
        }
        if (newFilters.location !== 'all') {
          columnFilters.push({ id: 'location', value: newFilters.location });
        }
        setColumnFilters(columnFilters);
      }, 500),
    [setColumnFilters]
  );

  const handleFilterChange = (key: keyof DogFilters, value: string): void => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    debouncedUpdateFilters(newFilters);
  };

  const handleClearFilters = (): void => {
    const clearedFilters: DogFilters = {
      name: '',
      breed: 'all',
      gender: 'all',
      location: 'all',
    };
    setFilters(clearedFilters);
    debouncedUpdateFilters(clearedFilters);
  };

  function Filters(): ReactNode {
    return (
      <div className='space-y-4 p-4'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <Input
            placeholder='Filter by name...'
            value={filters.name}
            onChange={(e) => handleFilterChange('name', e.target.value)}
          />
          <Select
            value={filters.breed}
            onValueChange={(value) => handleFilterChange('breed', value)}
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
            value={filters.gender}
            onValueChange={(value) => handleFilterChange('gender', value)}
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
            value={filters.location}
            onValueChange={(value) => handleFilterChange('location', value)}
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
          onClick={handleClearFilters}
          className='w-full'
        >
          Clear Filters
        </Button>
      </div>
    );
  }

  useEffect(() => {
    const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
      if (key === 'name') return value !== '';
      return value !== 'all';
    });

    if (!hasActiveFilters) {
      router.replace('/dog', { scroll: false });
      return;
    }

    const params = new URLSearchParams();
    if (filters.name) params.set('name', filters.name);
    if (filters.breed !== 'all') params.set('breed', filters.breed);
    if (filters.gender !== 'all') params.set('gender', filters.gender);
    if (filters.location !== 'all') params.set('location', filters.location);
    const queryString = params.toString();

    const path: Route = `/dog?${queryString ? `${queryString}` : ''}`;
    router.replace(path, { scroll: false });
  }, [filters, router]);

  return (
    <AdminOnly>
      <ConfirmDialog />
      <TooltipProvider>
        <div className='container mx-auto p-4'>
          <div className='mb-4 flex justify-end'>
            <Button
              onClick={() => router.push('/dog/create')}
              id='create-dog-button'
            >
              Add New Dog
            </Button>
          </div>
          {dogQuery.isLoading ? (
            <DogPageSkeleton />
          ) : (
            <Card>
              <Filters />
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
    </AdminOnly>
  );
}

export default DogPage;
