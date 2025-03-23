import { DateRange } from 'react-day-picker';

export interface LogFilters {
  immediate: {
    action: string | 'all';
    status: string | 'all';
    dateRange: DateRange | undefined;
  };
  debounced: {
    email: string;
  };
}
