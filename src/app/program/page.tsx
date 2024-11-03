'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { Column, ColumnDef, Row, SortingState } from '@tanstack/react-table';
import debounce from 'lodash/debounce';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Ban,
  CheckCircle,
  Edit,
  ExternalLink,
  FileText,
  Trash,
} from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { selectRole } from '@/contexts/userSlice';
import { useDeleteProgram } from '@/features/program/api/useDeleteProgram';
import { useGetPrograms } from '@/features/program/api/useGetPrograms';
import { useUpdateProgram } from '@/features/program/api/useUpdateProgram';
import { EActivityType } from '@/features/program/types/EActivityType';
import { EChallenge } from '@/features/program/types/EChallenge';
import { EDuration } from '@/features/program/types/EDuration';
import { EEnergyLevel } from '@/features/program/types/EEnergyLevel';
import { ELocation } from '@/features/program/types/ELocation';
import { ESpace } from '@/features/program/types/ESpace';
import { ProgramWithId } from '@/features/program/types/Program';
import { energyLevelToNumeric } from '@/features/program/utils/determineEnergyLevel';
import { EUserRole } from '@/features/user/types/EUserRole';
import UseConfirm from '@/hooks/UseConfirm';

import ProgramLoadingPage from './ProgramLoadingPage';

interface ProgramFilters {
  title: string;
  location: string | 'all';
  energyLevel: 'all' | EEnergyLevel;
  duration: string | 'all';
  challenge: string | 'all';
  space: string | 'all';
  type: string | 'all';
  approved: boolean | undefined;
}

// Helper function to validate energy level value
function isValidEnergyLevel(value: string | null): value is EEnergyLevel {
  return (
    value !== null &&
    Object.values(EEnergyLevel).includes(value as EEnergyLevel)
  );
}

function ProgramPage(): ReactNode {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<ProgramFilters>({
    title: searchParams.get('title') || '',
    location: (searchParams.get('location') as ELocation) || 'all',
    energyLevel: ((): 'all' | EEnergyLevel => {
      const param = searchParams.get('energyLevel');
      return isValidEnergyLevel(param) ? param : 'all';
    })(),
    duration: (searchParams.get('duration') as EDuration) || 'all',
    challenge: (searchParams.get('challenge') as EChallenge) || 'all',
    space: (searchParams.get('space') as ESpace) || 'all',
    type: (searchParams.get('type') as EActivityType) || 'all',
    approved: searchParams.has('approved')
      ? searchParams.get('approved') === 'true'
      : undefined,
  });

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [ConfirmDialog, confirm] = UseConfirm(
    'Are you sure?',
    'This action cannot be undone.'
  );

  const deleteMutation = useDeleteProgram();
  const updateMutation = useUpdateProgram();

  const userRole = useSelector(selectRole);
  const isAdmin = userRole === EUserRole.ADMIN;

  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<ProgramWithId>[] = [
    ...(isAdmin
      ? [
          {
            accessorKey: 'approved',
            header: ({
              column,
            }: {
              column: Column<ProgramWithId>;
            }): ReactNode => {
              return (
                <Button
                  variant='ghost'
                  onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                  }
                  className='flex items-center gap-1'
                >
                  Status
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
            cell: ({ row }: { row: Row<ProgramWithId> }): ReactNode => (
              <div className='w-[80px]'>
                <Badge
                  variant={row.original.approved ? 'default' : 'secondary'}
                >
                  {row.original.approved ? 'Approved' : 'Pending'}
                </Badge>
              </div>
            ),
            size: 80,
          },
        ]
      : []),
    {
      accessorKey: 'title',
      header: ({ column }): ReactNode => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className='flex items-center gap-1 justify-start w-full'
          >
            Title
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
      accessorKey: 'tags.location',
      header: 'Location',
      cell: ({ row }) => row.original.tags?.location || '-',
    },
    {
      accessorKey: 'tags.energyLevel',
      header: 'Energy Level',
      cell: ({ row }) => row.original.tags?.energyLevel || '-',
    },
    {
      accessorKey: 'tags.duration',
      header: 'Duration',
      cell: ({ row }) => row.original.tags?.duration || '-',
    },
    {
      accessorKey: 'tags.challenge',
      header: 'Challenge',
      cell: ({ row }) => row.original.tags?.challenge || '-',
    },
    {
      accessorKey: 'tags.space',
      header: 'Space',
      cell: ({ row }) => row.original.tags?.space || '-',
    },
    {
      accessorKey: 'tags.type',
      header: 'Activity Types',
      cell: ({ row }) => (
        <div className='flex flex-wrap gap-1'>
          {row.original.tags?.type.map((type, index) => (
            <Badge
              key={index}
              variant='outline'
            >
              {type}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className='flex space-x-2'>
          {isAdmin && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={'ghost'}
                  size='icon'
                  onClick={() =>
                    updateMutation.mutate({
                      id: row.original._id.toString(),
                      data: { approved: !row.original.approved },
                    })
                  }
                  disabled={updateMutation.isPending}
                  className={`h-8 w-8 ${row.original.approved ? 'hover:bg-destructive/90' : 'hover:bg-green-600'}`}
                >
                  {row.original.approved ? (
                    <Ban className='h-4 w-4' />
                  ) : (
                    <CheckCircle className='h-4 w-4' />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {row.original.approved
                  ? 'Unapprove program'
                  : 'Approve program'}
              </TooltipContent>
            </Tooltip>
          )}

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => router.push(`/program/${row.original._id}`)}
              >
                <Edit className='size-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Edit program</TooltipContent>
          </Tooltip>

          {row.original.pdfLink && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => window.open(row.original.pdfLink, '_blank')}
                >
                  <FileText className='size-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Open PDF</TooltipContent>
            </Tooltip>
          )}

          {row.original.canvaLink && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => window.open(row.original.canvaLink, '_blank')}
                >
                  <ExternalLink className='size-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Open in Canva</TooltipContent>
            </Tooltip>
          )}

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
            <TooltipContent>Delete program</TooltipContent>
          </Tooltip>
        </div>
      ),
    },
  ];

  const programQuery = useGetPrograms({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    filters: {
      title: filters.title,
      location: filters.location === 'all' ? undefined : filters.location,
      duration: filters.duration === 'all' ? undefined : filters.duration,
      challenge: filters.challenge === 'all' ? undefined : filters.challenge,
      space: filters.space === 'all' ? undefined : filters.space,
      type: filters.type === 'all' ? undefined : filters.type,
      approved: filters.approved,
      ...(filters.energyLevel !== 'all' && {
        energyLevelMin: energyLevelToNumeric(
          filters.energyLevel as EEnergyLevel
        )[0],
        energyLevelMax: energyLevelToNumeric(
          filters.energyLevel as EEnergyLevel
        )[1],
      }),
    },
  });

  const { table, setColumnFilters } = UseDataTable({
    data: programQuery.data?.programs ?? [],
    columns,
    pageCount: Math.ceil((programQuery.data?.total ?? 0) / pagination.pageSize),
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
      debounce((newFilters: ProgramFilters) => {
        const columnFilters = [];
        if (newFilters.title) {
          columnFilters.push({ id: 'title', value: newFilters.title });
        }
        if (newFilters.location) {
          columnFilters.push({
            id: 'tags.location',
            value: newFilters.location,
          });
        }
        if (newFilters.duration) {
          columnFilters.push({
            id: 'tags.duration',
            value: newFilters.duration,
          });
        }
        if (newFilters.challenge) {
          columnFilters.push({
            id: 'tags.challenge',
            value: newFilters.challenge,
          });
        }
        if (newFilters.space) {
          columnFilters.push({ id: 'tags.space', value: newFilters.space });
        }
        if (newFilters.type) {
          columnFilters.push({ id: 'tags.type', value: newFilters.type });
        }
        if (newFilters.approved !== undefined) {
          columnFilters.push({ id: 'approved', value: newFilters.approved });
        }
        setColumnFilters(columnFilters);
      }, 500),
    [setColumnFilters]
  );

  const handleFilterChange = (
    key: keyof ProgramFilters,
    value: string | boolean | undefined
  ): void => {
    const newFilters = {
      ...filters,
      [key]:
        key === 'energyLevel'
          ? isValidEnergyLevel(value as string)
            ? value
            : 'all'
          : value,
    } as ProgramFilters;

    setFilters(newFilters);
    debouncedUpdateFilters(newFilters);
  };

  const handleClearFilters = (): void => {
    const clearedFilters: ProgramFilters = {
      title: '',
      location: 'all',
      energyLevel: 'all',
      duration: 'all',
      challenge: 'all',
      space: 'all',
      type: 'all',
      approved: undefined,
    };
    setFilters(clearedFilters);
    debouncedUpdateFilters(clearedFilters);
  };

  function Filters(): ReactNode {
    const userRole = useSelector(selectRole);
    const isAdmin = userRole === EUserRole.ADMIN;

    return (
      <div className='space-y-4 p-4'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-7'>
          <Input
            placeholder='Filter by title...'
            value={filters.title}
            onChange={e => handleFilterChange('title', e.target.value)}
          />
          <Select
            value={filters.location}
            onValueChange={value => handleFilterChange('location', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select location' />
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
            value={filters.duration}
            onValueChange={value => handleFilterChange('duration', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select duration' />
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
            onValueChange={value => handleFilterChange('challenge', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select challenge' />
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
            value={filters.space}
            onValueChange={value => handleFilterChange('space', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select space' />
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
          <Select
            value={filters.type}
            onValueChange={value => handleFilterChange('type', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select activity type' />
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
          {isAdmin && (
            <Select
              value={
                filters.approved === undefined
                  ? 'all'
                  : filters.approved.toString()
              }
              onValueChange={value =>
                handleFilterChange(
                  'approved',
                  value === 'all' ? undefined : value === 'true'
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder='Filter by status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Status</SelectItem>
                <SelectItem value='true'>Approved</SelectItem>
                <SelectItem value='false'>Pending</SelectItem>
              </SelectContent>
            </Select>
          )}
          <Select
            value={filters.energyLevel}
            onValueChange={value => handleFilterChange('energyLevel', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select energy level' />
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
      if (key === 'approved') return value !== undefined;
      if (key === 'title') return value !== '';
      return value !== 'all';
    });

    if (!hasActiveFilters) {
      router.replace('/program', { scroll: false });
      return;
    }

    const params = new URLSearchParams();
    if (filters.title) params.set('title', filters.title);
    if (filters.location !== 'all') params.set('location', filters.location);
    if (filters.energyLevel !== 'all') {
      const [minLevel, maxLevel] = energyLevelToNumeric(
        filters.energyLevel as EEnergyLevel
      );
      params.set('energyLevel', filters.energyLevel);
      params.set('energyLevelMin', minLevel.toString());
      params.set('energyLevelMax', maxLevel.toString());
    }
    if (filters.duration !== 'all') params.set('duration', filters.duration);
    if (filters.challenge !== 'all') params.set('challenge', filters.challenge);
    if (filters.space !== 'all') params.set('space', filters.space);
    if (filters.type !== 'all') params.set('type', filters.type);
    if (filters.approved !== undefined)
      params.set('approved', filters.approved.toString());
    const queryString = params.toString();

    const path: Route = `/program?${queryString ? `${queryString}` : ''}`;
    router.replace(path, { scroll: false });
  }, [filters, router]);

  const handleCreateProgram = (): void => {
    const params = new URLSearchParams({
      location: filters.location,
      energyLevel: filters.energyLevel,
      duration: filters.duration,
      challenge: filters.challenge,
      space: filters.space,
      type: filters.type,
    });

    router.push(`/program/create?${params.toString()}`);
  };

  if (programQuery.isLoading) {
    return (
      <>
        {/* <VerifedOnly /> */}
        <ProgramLoadingPage />
      </>
    );
  }

  return (
    <>
      {/* <VerifedOnly /> */}
      <ConfirmDialog />
      <TooltipProvider>
        <div className='container mx-auto p-4'>
          <div className='mb-4 flex justify-end'>
            <Button onClick={handleCreateProgram}>Create Program</Button>
          </div>
          <Card>
            <Filters />
            <DataTable
              table={table}
              columns={columns}
            />
            <DataTablePagination table={table} />
            <div className='p-4 text-right text-sm text-muted-foreground'>
              Total Filtered Programs: {programQuery.data?.programs.length ?? 0}
            </div>
          </Card>
        </div>
      </TooltipProvider>
    </>
  );
}

export default ProgramPage;
