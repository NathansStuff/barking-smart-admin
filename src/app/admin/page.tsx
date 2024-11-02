'use client';

import { ReactNode, useMemo, useState } from 'react';

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
import { useGetUsers } from '@/features/user/api/useGetUsers';
import { useUserMutation } from '@/features/user/api/useUserMutation';
import { EUserRole } from '@/features/user/types/EUserRole';
import { UserWithId } from '@/features/user/types/User';
import UseConfirm from '@/hooks/UseConfirm';

import { AdminSkeleton } from './AdminSkeleton';

function AdminPage(): ReactNode {
  const [nameFilter, setNameFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [ConfirmDialog, confirm] = UseConfirm(
    'Are you sure?',
    'This action will take effect immediately.'
  );

  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<UserWithId>[] = [
    {
      accessorKey: 'name',
      header: ({ column }): ReactNode => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className='flex items-center gap-1 justify-start w-full'
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
      accessorKey: 'email',
      header: ({ column }): ReactNode => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className='flex items-center gap-1 justify-start w-full'
          >
            Email
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
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => (
        <Select
          value={row.original.role}
          onValueChange={value =>
            handleRoleChange(row.original._id.toString(), value as EUserRole)
          }
        >
          <SelectTrigger className='w-full'>
            <SelectValue placeholder={row.original.role} />
          </SelectTrigger>
          <SelectContent>
            {Object.values(EUserRole).map(role => (
              <SelectItem
                key={role}
                value={role}
              >
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ),
    },
  ];

  // First, declare userQuery
  const userQuery = useGetUsers({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    filters: {
      name: nameFilter,
      email: emailFilter,
    },
  });

  // Then initialize the table with the query data
  const { table, setColumnFilters } = UseDataTable({
    data: userQuery.data?.users ?? [],
    columns,
    pageCount: Math.ceil((userQuery.data?.total ?? 0) / pagination.pageSize),
    initialPagination: pagination,
    onPaginationChange: setPagination,
    sorting: sorting,
    onSortingChange: setSorting,
  });

  const userMutation = useUserMutation();

  const handleRoleChange = async (
    userId: string,
    newRole: EUserRole
  ): Promise<void> => {
    const ok = await confirm();
    if (!ok) return;

    userMutation.mutate({
      id: userId,
      data: { role: newRole },
    });
  };

  // Debounced updates for API calls
  const debouncedUpdateFilters = useMemo(
    () =>
      debounce((name: string, email: string) => {
        const roleFilter = table.getColumn('role')?.getFilterValue();
        setColumnFilters([
          ...(name ? [{ id: 'name', value: name }] : []),
          ...(email ? [{ id: 'email', value: email }] : []),
          // Add role filter if it exists
          ...(roleFilter ? [{ id: 'role', value: roleFilter }] : []),
        ]);
      }, 500),
    [table, setColumnFilters]
  );

  // Update UI immediately and debounce API call
  const handleNameChange = (value: string): void => {
    setNameFilter(value);
    debouncedUpdateFilters(value, emailFilter);
  };

  const handleEmailChange = (value: string): void => {
    setEmailFilter(value);
    debouncedUpdateFilters(nameFilter, value);
  };

  function Filters(): ReactNode {
    return (
      <div className='p-4 grid gap-4 md:grid-cols-3'>
        <Input
          placeholder='Filter by name...'
          value={nameFilter}
          onChange={e => handleNameChange(e.target.value)}
        />
        <Input
          placeholder='Filter by email...'
          value={emailFilter}
          onChange={e => handleEmailChange(e.target.value)}
        />
        <Select
          value={(table.getColumn('role')?.getFilterValue() as string) ?? 'ALL'}
          onValueChange={value =>
            value === 'ALL'
              ? table.getColumn('role')?.setFilterValue(undefined)
              : table.getColumn('role')?.setFilterValue(value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder='Filter by role' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='ALL'>All Roles</SelectItem>
            {Object.values(EUserRole).map(role => (
              <SelectItem
                key={role}
                value={role}
              >
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  // Update the loading check and return statement
  if (userQuery.isLoading || userQuery.isFetching) {
    return (
      <>
        <AdminOnly />
        <section className='mx-4 overflow-hidden'>
          <Card className='mx-auto mt-10 max-w-3xl text-left'>
            <Filters />
            <AdminSkeleton />
          </Card>
        </section>
      </>
    );
  }

  return (
    <>
      <AdminOnly />
      <ConfirmDialog />
      <section className='mx-4 overflow-hidden'>
        <Card className='mx-auto mt-10 max-w-3xl text-left'>
          <Filters />
          <DataTable
            table={table}
            columns={columns}
          />
          <DataTablePagination table={table} />
        </Card>
      </section>
    </>
  );
}

export default AdminPage;
