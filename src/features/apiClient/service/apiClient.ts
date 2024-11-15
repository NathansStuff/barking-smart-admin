/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

import {
  ApiClientConfig,
  ApiError,
  ApiResponse,
  ErrorInterceptor,
  RequestInterceptor,
  ResponseInterceptor,
} from '../types/ApiClientTypes';

/**
 * ApiClient class for making HTTP requests
 */
export class ApiClient {
  private instance: AxiosInstance;

  /**
   * Creates an instance of ApiClient.
   * @param {ApiClientConfig} config - The configuration for the API client
   */
  constructor(config: ApiClientConfig) {
    this.instance = axios.create({
      baseURL: config.baseURL,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });
  }

  /**
   * Sets a request interceptor
   * @param {RequestInterceptor} interceptor - The request interceptor function
   */
  setRequestInterceptor(interceptor: RequestInterceptor): void {
    this.instance.interceptors.request.use(interceptor);
  }

  /**
   * Sets a response interceptor
   * @param {ResponseInterceptor} interceptor - The response interceptor function
   */
  setResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.instance.interceptors.response.use(interceptor);
  }

  /**
   * Sets an error interceptor
   * @param {ErrorInterceptor} interceptor - The error interceptor function
   */
  setErrorInterceptor(interceptor: ErrorInterceptor): void {
    this.instance.interceptors.response.use(undefined, interceptor);
  }

  /**
   * Handles API errors
   * @param {AxiosError} error - The error object
   * @returns {ApiError} The formatted API error
   * @private
   */
  private handleApiError(error: AxiosError): ApiError {
    if (error.response) {
      const responseData = error.response.data as Record<string, unknown>;
      return {
        message:
          typeof responseData?.message === 'string' ? responseData.message : error.message || 'An error occurred',
        status: error.response.status,
      };
    }
    return {
      message: error.message || 'Network error',
      status: 500,
    };
  }

  /**
   * Performs a GET request
   * @param {string} url - The URL to send the request to
   * @returns {Promise<ApiResponse<T>>} A promise that resolves with the API response
   * @template T
   */
  async get<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.instance.get(url);
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
      };
    } catch (error) {
      throw this.handleApiError(error as AxiosError);
    }
  }

  /**
   * Performs a POST request
   * @param {string} url - The URL to send the request to
   * @param {any} data - The data to send with the request
   * @returns {Promise<ApiResponse<T>>} A promise that resolves with the API response
   * @template T
   */
  async post<T>(url: string, data: any): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.instance.post(url, data);
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
      };
    } catch (error) {
      throw this.handleApiError(error as AxiosError);
    }
  }

  /**
   * Performs a PUT request
   * @param {string} url - The URL to send the request to
   * @param {any} data - The data to send with the request
   * @returns {Promise<ApiResponse<T>>} A promise that resolves with the API response
   * @template T
   */
  async put<T>(url: string, data: any): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.instance.put(url, data);
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
      };
    } catch (error) {
      throw this.handleApiError(error as AxiosError);
    }
  }

  /**
   * Performs a DELETE request
   * @param {string} url - The URL to send the request to
   * @returns {Promise<ApiResponse<T>>} A promise that resolves with the API response
   * @template T
   */
  async delete<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.instance.delete(url);
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
      };
    } catch (error) {
      throw this.handleApiError(error as AxiosError);
    }
  }
}

/**
 * Creates and returns a new ApiClient instance
 * @param {ApiClientConfig} config - The configuration for the API client
 * @returns {ApiClient} A new ApiClient instance
 */
export const createApiClient = (config: ApiClientConfig): ApiClient => {
  return new ApiClient(config);
};
