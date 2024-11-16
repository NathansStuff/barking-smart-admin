import { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ELocation } from '@/features/program/types/ELocation';

import { DogFilters } from '../types/DogFilters';
import { EBreed } from '../types/EBreed';
import { EGender } from '../types/EGender';

interface FiltersProps {
  filters: DogFilters;
  onImmediateFilterChange: (key: keyof DogFilters['immediate'], value: string) => void;
  onDebouncedFilterChange: (key: keyof DogFilters['debounced'], value: string) => void;
  onClearFilters: () => void;
}

function DogTableFilters({
  filters,
  onImmediateFilterChange,
  onDebouncedFilterChange,
  onClearFilters,
}: FiltersProps): ReactNode {
  return (
    <div className='space-y-4 p-4'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Input
          placeholder='Filter by name...'
          value={filters.debounced.name}
          onChange={(e) => onDebouncedFilterChange('name', e.target.value)}
        />
        <Select
          value={filters.immediate.breed}
          onValueChange={(value) => onImmediateFilterChange('breed', value)}
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
          value={filters.immediate.gender}
          onValueChange={(value) => onImmediateFilterChange('gender', value)}
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

export default DogTableFilters;
