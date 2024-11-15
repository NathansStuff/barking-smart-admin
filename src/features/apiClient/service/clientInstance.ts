import { ApiClientConfig } from '../types/ApiClientTypes';

import { ApiClient } from './apiClient';

/** The singleton instance of the ApiClient */
let apiClientInstance: ApiClient | null = null;

/**
 * Initializes the ApiClient with the given configuration.
 * @param {ApiClientConfig} config - The configuration for the API client
 * @returns {ApiClient} The initialized ApiClient instance
 */
export function initializeApiClient(config: ApiClientConfig): ApiClient {
  apiClientInstance = new ApiClient(config);
  return apiClientInstance;
}

/**
 * Retrieves the initialized ApiClient instance.
 * @throws {Error} If the ApiClient has not been initialized
 * @returns {ApiClient} The initialized ApiClient instance
 */
export function getApiClient(): ApiClient {
  if (!apiClientInstance) {
    throw new Error(
      'API client has not been initialized. Call initializeApiClient first.'
    );
  }
  return apiClientInstance;
}