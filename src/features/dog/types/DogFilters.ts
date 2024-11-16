export interface DogFilters {
  immediate: {
    breed: string | 'all';
    gender: string | 'all';
    location: string | 'all';
  };
  debounced: {
    name: string;
  };
}
