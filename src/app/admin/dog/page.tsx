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
  const { updateUrlParams, getUrlParam } = UseUrlParams<{
    breed: string;
    gender: string;
    location: string;
    name: string;
  }>();

  // todo: This should be moved into urlparams too
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

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

  const handleDelete = async (id: string): Promise<void> => {
    const ok = await confirm();
    if (!ok) return;
    deleteMutation.mutate(id);
  };

  const { table, setColumnFilters } = UseDataTable({
    data: dogQuery.data?.dogs ?? [],
    columns: DogTableColumns(router, handleDelete, deleteMutation),
    pageCount: Math.ceil((dogQuery.data?.total ?? 0) / pagination.pageSize),
    initialPagination: pagination,
    onPaginationChange: setPagination,
    sorting: sorting,
    onSortingChange: setSorting,
  });

  // Replace the url params effect with this simplified version
  useEffect(() => {
    const hasActiveFilters =
      Object.entries(filters.immediate).some(([_, value]) => value !== 'all') ||
      Object.entries(filters.debounced).some(([_, value]) => value !== '');

    if (!hasActiveFilters) {
      updateUrlParams({});
      return;
    }

    updateUrlParams({
      name: filters.debounced.name,
      breed: filters.immediate.breed,
      gender: filters.immediate.gender,
      location: filters.immediate.location,
    });
  }, [filters, updateUrlParams]);

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
                columns={DogTableColumns(router, handleDelete, deleteMutation)}
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
