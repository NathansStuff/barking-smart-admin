'use client';

import { ReactNode, useEffect, useState } from 'react';

import { ColumnFiltersState, SortingState } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';

import { DataTable } from '@/components/general/DataTable/components/DataTable';
import { DataTablePagination } from '@/components/general/DataTable/components/DataTablePagination';
import { UseDataTable } from '@/components/general/DataTable/hooks/UseDataTable';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useDeleteDog } from '@/features/dog/api/useDeleteDog';
import { useGetDogs } from '@/features/dog/api/useGetDogs';
import { DogTableColumns } from '@/features/dog/components/DogTableColumns';
import DogTableFilters from '@/features/dog/components/DogTableFilters';
import { DogFilters } from '@/features/dog/types/DogFilters';
import { EBreed } from '@/features/dog/types/EBreed';
import { EGender } from '@/features/dog/types/EGender';
import { ELocation } from '@/features/program/types/ELocation';
import UseConfirm from '@/hooks/UseConfirm';
import { useDebounce } from '@/hooks/useDebounce';
import { UseUrlParams } from '@/hooks/UseUrlParams';

import DogPageSkeleton from './DogPageSkeleton';

function DogPage(): ReactNode {
  const router = useRouter();
  const { updateUrlParams, getUrlParam, pagination, setPagination } = UseUrlParams<{
    breed: string;
    gender: string;
    location: string;
    name: string;
    page: number;
    pageSize: number;
  }>();

  const [ConfirmDialog, confirm] = UseConfirm('Are you sure?', 'This action cannot be undone.');

  const deleteMutation = useDeleteDog();

  const [sorting, setSorting] = useState<SortingState>([]);

  const [filters, setFilters] = useState<DogFilters>({
    immediate: {
      breed: (getUrlParam('breed') as EBreed) || 'all',
      gender: (getUrlParam('gender') as EGender) || 'all',
      location: (getUrlParam('location') as ELocation) || 'all',
    },
    debounced: {
      name: getUrlParam('name') || '',
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
    const clearedFilters = {
      immediate: {
        breed: 'all',
        gender: 'all',
        location: 'all',
      },
      debounced: {
        name: '',
      },
    };
    setFilters(clearedFilters);

    // Immediately update URL when clearing filters
    updateUrlParams({});
  };

  const dogQuery = useGetDogs({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    filters: {
      name: debouncedFilters.name,
      breed: filters.immediate.breed === 'all' ? undefined : (filters.immediate.breed as EBreed),
      location: filters.immediate.location === 'all' ? undefined : (filters.immediate.location as ELocation),
      gender: filters.immediate.gender === 'all' ? undefined : (filters.immediate.gender as EGender),
    },
  });

  const handleDelete = async (id: string): Promise<void> => {
    const ok = await confirm();
    if (!ok) return;
    deleteMutation.mutate(id);
  };

  const tableColumns = DogTableColumns(router, handleDelete, deleteMutation);

  const { table, setColumnFilters } = UseDataTable({
    data: dogQuery.data?.dogs ?? [],
    columns: tableColumns,
    pageCount: Math.ceil((dogQuery.data?.total ?? 0) / pagination.pageSize),
    initialPagination: pagination,
    onPaginationChange: setPagination,
    sorting: sorting,
    onSortingChange: setSorting,
  });

  // Separate effect for URL updates
  useEffect(() => {

    const currentParams: Record<string, string | number> = {};

    // Only add non-default values to URL
    if (filters.debounced.name) currentParams.name = filters.debounced.name;
    if (filters.immediate.breed !== 'all') currentParams.breed = filters.immediate.breed;
    if (filters.immediate.gender !== 'all') currentParams.gender = filters.immediate.gender;
    if (filters.immediate.location !== 'all') currentParams.location = filters.immediate.location;

    // Only add pagination if it's not at default values
    if (pagination.pageIndex > 0) currentParams.page = pagination.pageIndex + 1;
    if (pagination.pageSize !== 10) currentParams.pageSize = pagination.pageSize;

    // Always update URL params, whether there are active filters or not
    updateUrlParams(currentParams as Partial<typeof currentParams>);
  }, [
    filters.immediate.breed,
    filters.immediate.gender,
    filters.immediate.location,
    filters.debounced.name,
    pagination.pageIndex,
    pagination.pageSize,
    updateUrlParams,
    filters.immediate,
    filters.debounced,
  ]);

  // How the debounced filters are applied to the table
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
              <DogTableFilters
                filters={filters}
                onImmediateFilterChange={handleImmediateFilterChange}
                onDebouncedFilterChange={handleDebouncedFilterChange}
                onClearFilters={handleClearFilters}
              />
              <DataTable
                table={table}
                columns={tableColumns}
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
