import { ReactNode } from 'react';
import { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { DateRangePicker } from '@/components/ui/DateRangePicker';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { ELogStatus } from '../types/ELogStatus';
import { ELogType } from '../types/ELogType';
import { LogFilters } from '../types/LogFilters';

interface FiltersProps {
  filters: LogFilters;
  onImmediateFilterChange: (key: keyof LogFilters['immediate'], value: string | DateRange | undefined) => void;
  onDebouncedFilterChange: (key: keyof LogFilters['debounced'], value: string) => void;
  onClearFilters: () => void;
}

function LogTableFilters({
  filters,
  onImmediateFilterChange,
  onDebouncedFilterChange,
  onClearFilters,
}: FiltersProps): ReactNode {
  return (
    <div className='space-y-4 p-4'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <DateRangePicker
          dateRange={filters.immediate.dateRange}
          onDateRangeChange={(range) => onImmediateFilterChange('dateRange', range)}
        />
        <Input
          placeholder='Filter by email...'
          value={filters.debounced.email}
          onChange={(e) => onDebouncedFilterChange('email', e.target.value)}
        />
        <Select
          value={filters.immediate.action}
          onValueChange={(value) => onImmediateFilterChange('action', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder='Select action' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Actions</SelectItem>
            {Object.values(ELogType).map((action) => (
              <SelectItem
                key={action}
                value={action}
              >
                {action.replace(/_/g, ' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={filters.immediate.status}
          onValueChange={(value) => onImmediateFilterChange('status', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder='Select status' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Statuses</SelectItem>
            {Object.values(ELogStatus).map((status) => (
              <SelectItem
                key={status}
                value={status}
              >
                {status}
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

export default LogTableFilters;
