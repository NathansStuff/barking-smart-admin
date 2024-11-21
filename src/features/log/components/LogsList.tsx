'use client';

import { ReactElement, useState } from 'react';
import { DateRange } from 'react-day-picker';

import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useDebounce } from '@/hooks/useDebounce';

import { useGetLogs } from '../api/useGetLogs';
import { LogFilters } from '../types/LogFilters';

import { LogTableColumns } from './LogTableColumns';
import LogTableFilters from './LogTableFilters';

const pageSizeOptions = [10, 20, 30, 40, 50];

function LogsList(): ReactElement {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [filters, setFilters] = useState<LogFilters>({
    immediate: {
      action: 'all',
      status: 'all',
      dateRange: undefined,
    },
    debounced: {
      email: '',
    },
  });

  const debouncedFilters = useDebounce(filters.debounced, 500);

  const { data, isLoading, error } = useGetLogs({
    page: pageIndex + 1,
    limit: pageSize,
    filters: {
      ...debouncedFilters,
      action: filters.immediate.action === 'all' ? undefined : filters.immediate.action,
      status: filters.immediate.status === 'all' ? undefined : filters.immediate.status,
      startDate: filters.immediate.dateRange?.from ? format(filters.immediate.dateRange.from, 'yyyy-MM-dd') : undefined,
      endDate: filters.immediate.dateRange?.to ? format(filters.immediate.dateRange.to, 'yyyy-MM-dd') : undefined,
    },
  });

  const table = useReactTable({
    data: data?.logs ?? [],
    columns: LogTableColumns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: data?.totalPages ?? -1,
    state: {
      sorting,
      columnFilters,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onPaginationChange: setPagination,
    manualPagination: true,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading logs: {error.message}</div>;
  }

  const handleImmediateFilterChange = (
    key: keyof LogFilters['immediate'],
    value: string | DateRange | undefined
  ): void => {
    setFilters((prev) => ({
      ...prev,
      immediate: {
        ...prev.immediate,
        [key]: value,
      },
    }));
    setPagination((prev) => ({ ...prev, pageIndex: 0 })); // Reset to first page on filter change
  };

  const handleDebouncedFilterChange = (key: keyof LogFilters['debounced'], value: string): void => {
    setFilters((prev) => ({
      ...prev,
      debounced: {
        ...prev.debounced,
        [key]: value,
      },
    }));
    setPagination((prev) => ({ ...prev, pageIndex: 0 })); // Reset to first page on filter change
  };

  const handleClearFilters = (): void => {
    setFilters({
      immediate: {
        action: 'all',
        status: 'all',
        dateRange: undefined,
      },
      debounced: {
        email: '',
      },
    });
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  const handlePageSizeChange = (newSize: string): void => {
    const size = Number(newSize);
    setPagination({
      pageIndex: 0, // Reset to first page
      pageSize: size,
    });
  };

  return (
    <div className='space-y-4'>
      <LogTableFilters
        filters={filters}
        onImmediateFilterChange={handleImmediateFilterChange}
        onDebouncedFilterChange={handleDebouncedFilterChange}
        onClearFilters={handleClearFilters}
      />
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={LogTableColumns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-between gap-2'>
        <div className='flex-1 text-sm text-muted-foreground'>
          {data?.total
            ? `Showing ${pageIndex * pageSize + 1} to ${Math.min((pageIndex + 1) * pageSize, data.total)} of ${
                data.total
              } entries`
            : 'No results.'}
        </div>
        <div className='flex items-center space-x-6 lg:space-x-8'>
          <div className='flex items-center space-x-2'>
            <p className='text-sm font-medium'>Rows per page</p>
            <Select
              value={`${pageSize}`}
              onValueChange={handlePageSizeChange}
            >
              <SelectTrigger className='h-8 w-[70px]'>
                <SelectValue placeholder={pageSize} />
              </SelectTrigger>
              <SelectContent side='top'>
                {pageSizeOptions.map((size) => (
                  <SelectItem
                    key={size}
                    value={`${size}`}
                  >
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              className='hidden h-8 w-8 p-0 lg:flex'
              onClick={() => setPagination((prev) => ({ ...prev, pageIndex: 0 }))}
              disabled={pageIndex === 0}
            >
              <span className='sr-only'>Go to first page</span>
              <span>{'<<'}</span>
            </Button>
            <Button
              variant='outline'
              className='h-8 w-8 p-0'
              onClick={() => setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex - 1 }))}
              disabled={pageIndex === 0}
            >
              <span className='sr-only'>Go to previous page</span>
              <span>{'<'}</span>
            </Button>
            <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
              Page {pageIndex + 1} of {data?.totalPages || 1}
            </div>
            <Button
              variant='outline'
              className='h-8 w-8 p-0'
              onClick={() => setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex + 1 }))}
              disabled={!data?.totalPages || pageIndex === data.totalPages - 1}
            >
              <span className='sr-only'>Go to next page</span>
              <span>{'>'}</span>
            </Button>
            <Button
              variant='outline'
              className='hidden h-8 w-8 p-0 lg:flex'
              onClick={() => setPagination((prev) => ({ ...prev, pageIndex: (data?.totalPages || 1) - 1 }))}
              disabled={!data?.totalPages || pageIndex === data.totalPages - 1}
            >
              <span className='sr-only'>Go to last page</span>
              <span>{'>>'}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogsList;
