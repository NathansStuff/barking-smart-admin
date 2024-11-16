'use client';

import { ReactNode, useCallback, useEffect, useState } from 'react';

import { ColumnFiltersState, SortingState } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';

import { DataTable } from '@/components/general/DataTable/components/DataTable';
import { DataTablePagination } from '@/components/general/DataTable/components/DataTablePagination';
import { UseDataTable } from '@/components/general/DataTable/hooks/UseDataTable';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useDeleteProgram } from '@/features/program/api/useDeleteProgram';
import { useGetPrograms } from '@/features/program/api/useGetPrograms';
import { ProgramTableColumns } from '@/features/program/components/ProgramTableColumns';
import ProgramTableFilters from '@/features/program/components/ProgramTableFilters';
import { EEnergyLevel } from '@/features/program/types/EEnergyLevel';
import { energyLevelToNumeric } from '@/features/program/utils/determineEnergyLevel';
import UseConfirm from '@/hooks/UseConfirm';
import { useDebounce } from '@/hooks/useDebounce';
import { UseUrlParams } from '@/hooks/UseUrlParams';

import ProgramLoadingPage from './ProgramLoadingPage';

type FilterState = {
  immediate: {
    location: string;
    energyLevel: string;
    duration: string;
    challenge: string;
    space: string;
    type: string;
    approved: string;
  };
  debounced: {
    title: string;
  };
};

function ProgramPage(): ReactNode {
  const router = useRouter();
  const { updateUrlParams, getUrlParam, pagination, setPagination } = UseUrlParams<{
    title: string;
    location: string;
    energyLevel: string;
    duration: string;
    challenge: string;
    space: string;
    type: string;
    approved: string;
    page: number;
    pageSize: number;
  }>();

  const [ConfirmDialog, confirm] = UseConfirm('Are you sure?', 'This action cannot be undone.');

  const deleteMutation = useDeleteProgram();

  const [sorting, setSorting] = useState<SortingState>(() => []);

  const [filters, setFilters] = useState<FilterState>({
    immediate: {
      location: getUrlParam('location') || 'all',
      energyLevel: getUrlParam('energyLevel') || 'all',
      duration: getUrlParam('duration') || 'all',
      challenge: getUrlParam('challenge') || 'all',
      space: getUrlParam('space') || 'all',
      type: getUrlParam('type') || 'all',
      approved: getUrlParam('approved') || 'all',
    },
    debounced: {
      title: getUrlParam('title') || '',
    },
  });

  const debouncedFilters = useDebounce(filters.debounced, 500);

  const handleImmediateFilterChange = (key: keyof FilterState['immediate'], value: string): void => {
    setFilters((prev) => ({
      ...prev,
      immediate: { ...prev.immediate, [key]: value },
    }));
  };

  const handleDebouncedFilterChange = (key: keyof FilterState['debounced'], value: string): void => {
    setFilters((prev) => ({
      ...prev,
      debounced: { ...prev.debounced, [key]: value },
    }));
  };

  const handleClearFilters = (): void => {
    setFilters({
      immediate: {
        location: 'all',
        energyLevel: 'all',
        duration: 'all',
        challenge: 'all',
        space: 'all',
        type: 'all',
        approved: 'all',
      },
      debounced: {
        title: '',
      },
    });
  };

  const programQuery = useGetPrograms({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    filters: {
      title: debouncedFilters.title,
      location: filters.immediate.location === 'all' ? undefined : filters.immediate.location,
      duration: filters.immediate.duration === 'all' ? undefined : filters.immediate.duration,
      challenge: filters.immediate.challenge === 'all' ? undefined : filters.immediate.challenge,
      space: filters.immediate.space === 'all' ? undefined : filters.immediate.space,
      type: filters.immediate.type === 'all' ? undefined : filters.immediate.type,
      approved: filters.immediate.approved === 'all' ? undefined : filters.immediate.approved === 'true',
      ...(filters.immediate.energyLevel !== 'all' && {
        energyLevelMin: energyLevelToNumeric(filters.immediate.energyLevel as EEnergyLevel)[0],
        energyLevelMax: energyLevelToNumeric(filters.immediate.energyLevel as EEnergyLevel)[1],
      }),
    },
  });
  const handleDelete = useCallback(
    async (id: string): Promise<void> => {
      const ok = await confirm();
      if (!ok) return;
      deleteMutation.mutate(id);
    },
    [confirm, deleteMutation]
  );

  const tableColumns = ProgramTableColumns(router, handleDelete, deleteMutation);

  const { table, setColumnFilters } = UseDataTable({
    data: programQuery.data?.programs ?? [],
    columns: tableColumns,
    pageCount: Math.ceil((programQuery.data?.total ?? 0) / pagination.pageSize),
    initialPagination: pagination,
    onPaginationChange: setPagination,
    sorting: sorting,
    onSortingChange: setSorting,
  });

  // Update URL params when filters change
  useEffect(() => {
    const hasActiveFilters =
      Object.entries(filters.immediate).some(([_, value]) => value !== 'all') ||
      Object.entries(filters.debounced).some(([_, value]) => value !== '');

    const currentParams: Record<string, string | number> = {};

    // Only add non-default values to URL
    if (debouncedFilters.title) currentParams.title = debouncedFilters.title;
    if (filters.immediate.location !== 'all') currentParams.location = filters.immediate.location;
    if (filters.immediate.energyLevel !== 'all') currentParams.energyLevel = filters.immediate.energyLevel;
    if (filters.immediate.duration !== 'all') currentParams.duration = filters.immediate.duration;
    if (filters.immediate.challenge !== 'all') currentParams.challenge = filters.immediate.challenge;
    if (filters.immediate.space !== 'all') currentParams.space = filters.immediate.space;
    if (filters.immediate.type !== 'all') currentParams.type = filters.immediate.type;
    if (filters.immediate.approved !== 'all') currentParams.approved = filters.immediate.approved;

    // Only add pagination if it's not at default values
    if (pagination.pageIndex > 0) currentParams.page = pagination.pageIndex + 1;
    if (pagination.pageSize !== 10) currentParams.pageSize = pagination.pageSize;

    if (!hasActiveFilters && Object.keys(currentParams).length === 0) {
      updateUrlParams({});
    } else {
      updateUrlParams(currentParams);
    }
  }, [
    debouncedFilters,
    filters.debounced,
    filters.immediate,
    pagination.pageIndex,
    pagination.pageSize,
    updateUrlParams,
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

  if (programQuery.isLoading) {
    return <ProgramLoadingPage />;
  }

  return (
    <>
      <ConfirmDialog />
      <TooltipProvider>
        <div className='container mx-auto p-4'>
          <div className='mb-4 flex justify-end'>
            <Button onClick={() => router.push('/admin/program/create')}>Create Program</Button>
          </div>
          <Card>
            <ProgramTableFilters
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
              Total Programs: {programQuery.data?.total ?? 0}
            </div>
          </Card>
        </div>
      </TooltipProvider>
    </>
  );
}

export default ProgramPage;
