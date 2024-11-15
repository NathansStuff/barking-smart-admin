/* eslint-disable @typescript-eslint/no-explicit-any */

import { AxiosError, AxiosResponse } from 'axios';

export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

export interface ApiError {
  message: string;
  status: number;
}

export interface ApiClientConfig {
  baseURL: string;
  headers?: Record<string, string>;
}

export type RequestInterceptor = (config: any) => any;
export type ResponseInterceptor = (response: AxiosResponse) => AxiosResponse;
export type ErrorInterceptor = (error: AxiosError) => Promise<never>;
