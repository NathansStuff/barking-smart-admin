import { Dispatch, SetStateAction, useState } from 'react';

import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  Table,
  useReactTable,
} from '@tanstack/react-table';

interface UseDataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  pageCount: number;
  initialPagination?: {
    pageIndex: number;
    pageSize: number;
  };
  onPaginationChange?: (pagination: PaginationState) => void;
  sorting?: SortingState;
  onSortingChange?: (sorting: SortingState) => void;
}

export function UseDataTable<TData>({
  data,
  columns,
  pageCount,
  initialPagination,
  onPaginationChange,
  sorting: externalSorting,
  onSortingChange,
}: UseDataTableProps<TData>): {
  table: Table<TData>;
  columnFilters: ColumnFiltersState;
  setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
  sorting: SortingState;
} {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [internalSorting, setInternalSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: updater => {
      setInternalSorting(updater);
      if (onSortingChange) {
        onSortingChange(
          typeof updater === 'function' ? updater(internalSorting) : updater
        );
      }
    },
    onPaginationChange: updater => {
      if (onPaginationChange) {
        onPaginationChange(
          typeof updater === 'function'
            ? updater(initialPagination || { pageIndex: 0, pageSize: 10 })
            : updater
        );
      }
    },
    state: {
      columnFilters,
      sorting: externalSorting || internalSorting,
      pagination: initialPagination,
    },
    pageCount: pageCount,
    manualPagination: true,
    manualSorting: true,
  });

  return {
    table,
    columnFilters,
    setColumnFilters,
    sorting: externalSorting || internalSorting,
  };
}
