import { useCallback } from 'react';

import { Route } from 'next';
import { useRouter, useSearchParams } from 'next/navigation';

export function UseUrlParams<T extends Record<string, string>>(): {
  updateUrlParams: (params: Partial<T>) => void;
  getUrlParam: (key: keyof T) => T[keyof T];
} {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateUrlParams = useCallback(
    (params: Partial<T>) => {
      const urlParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value && value !== 'all') {
          urlParams.set(key, value);
        }
      });

      const path = urlParams.toString() ? `?${urlParams.toString()}` : '';
      router.replace(path as Route, { scroll: false });
    },
    [router]
  );

  const getUrlParam = (key: keyof T): T[keyof T] => searchParams.get(key as string) as T[keyof T];

  return { updateUrlParams, getUrlParam };
}
