import { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EActivityType } from '@/features/program/types/EActivityType';
import { EChallenge } from '@/features/program/types/EChallenge';
import { EDuration } from '@/features/program/types/EDuration';
import { EEnergyLevel } from '@/features/program/types/EEnergyLevel';
import { ELocation } from '@/features/program/types/ELocation';
import { ESpace } from '@/features/program/types/ESpace';

interface ProgramFilters {
  immediate: {
    location: string | 'all';
    energyLevel: 'all' | string;
    duration: string | 'all';
    challenge: string | 'all';
    space: string | 'all';
    type: string | 'all';
    approved: string | 'all';
  };
  debounced: {
    title: string;
  };
}

interface FiltersProps {
  filters: ProgramFilters;
  onImmediateFilterChange: (key: keyof ProgramFilters['immediate'], value: string) => void;
  onDebouncedFilterChange: (key: keyof ProgramFilters['debounced'], value: string) => void;
  onClearFilters: () => void;
}

function ProgramTableFilters({
  filters,
  onImmediateFilterChange,
  onDebouncedFilterChange,
  onClearFilters,
}: FiltersProps): ReactNode {
  return (
    <div className='space-y-4 p-4'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Input
          placeholder='Filter by title...'
          value={filters.debounced.title}
          onChange={(e) => onDebouncedFilterChange('title', e.target.value)}
        />
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
        <Select
          value={filters.immediate.energyLevel}
          onValueChange={(value) => onImmediateFilterChange('energyLevel', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder='Select energy level' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Energy Levels</SelectItem>
            {Object.values(EEnergyLevel).map((level) => (
              <SelectItem
                key={level}
                value={level}
              >
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={filters.immediate.duration}
          onValueChange={(value) => onImmediateFilterChange('duration', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder='Select duration' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Durations</SelectItem>
            {Object.values(EDuration).map((duration) => (
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
          value={filters.immediate.challenge}
          onValueChange={(value) => onImmediateFilterChange('challenge', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder='Select challenge' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Challenges</SelectItem>
            {Object.values(EChallenge).map((challenge) => (
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
          value={filters.immediate.space}
          onValueChange={(value) => onImmediateFilterChange('space', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder='Select space' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Spaces</SelectItem>
            {Object.values(ESpace).map((space) => (
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
          value={filters.immediate.type}
          onValueChange={(value) => onImmediateFilterChange('type', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder='Select activity type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Types</SelectItem>
            {Object.values(EActivityType).map((type) => (
              <SelectItem
                key={type}
                value={type}
              >
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={filters.immediate.approved}
          onValueChange={(value) => onImmediateFilterChange('approved', value)}
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

export default ProgramTableFilters;
