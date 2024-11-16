import { useCallback } from 'react';

import { Route } from 'next';
import { useRouter, useSearchParams } from 'next/navigation';

export function UseUrlParams<T extends Record<string, string | number>>(): {
  updateUrlParams: (params: Partial<T>) => void;
  getUrlParam: (key: keyof T) => string;
  getNumericUrlParam: (key: keyof T, defaultValue: number) => number;
  pagination: { pageIndex: number; pageSize: number };
  setPagination: (newPagination: { pageIndex: number; pageSize: number }) => void;
} {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateUrlParams = useCallback(
    (params: Partial<T>) => {
      const urlParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== 'all') {
          urlParams.set(key, String(value));
        }
      });

      const path = urlParams.toString() ? `?${urlParams.toString()}` : '';
      router.replace(path as Route, { scroll: false });
    },
    [router]
  );

  const getUrlParam = (key: keyof T): string => searchParams.get(key as string) || '';

  const getNumericUrlParam = (key: keyof T, defaultValue: number): number => {
    const value = searchParams.get(key as string);
    return value ? parseInt(value, 10) : defaultValue;
  };

  const pagination = {
    pageIndex: getNumericUrlParam('page' as keyof T, 1) - 1,
    pageSize: getNumericUrlParam('pageSize' as keyof T, 10),
  };

  const setPagination = useCallback(
    (newPagination: typeof pagination) => {
      const params = {
        page: newPagination.pageIndex + 1,
        pageSize: newPagination.pageSize
      } as unknown as Partial<T>;

      updateUrlParams(params);
    },
    [updateUrlParams]
  );

  return { updateUrlParams, getUrlParam, getNumericUrlParam, pagination, setPagination };
}
