import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

import { ResponseCode } from '@/types/ResponseCode';

import { customErrorHandler } from './errorHandlers/customErrorHandler';
import { errorHandler } from './errorHandlers/errorHandler';
import { zodErrorHandler } from './errorHandlers/zodErrorHandler';
import { CustomError } from './errors/CustomError';

/**
 * Middleware function that wraps an asynchronous operation in a try-catch block.
 * It handles different types of errors and returns appropriate responses.
 *
 * @template T The type of the value returned by the asyncFunction.
 * @param {() => Promise<T>} asyncFunction - The asynchronous function to be executed.
 * @returns {Promise<T | NextResponse<object>>} The result of the asyncFunction or an error response.
 *
 * @example
 * const result = await TryCatchMiddleware(async () => {
 *   // Some asynchronous operation
 *   return await fetchData();
 * });
 *
 * @example
 * const handler = async (req, res) => {
 *   return TryCatchMiddleware(async () => {
 *     // Request handling logic
 *   });
 * };
 */
export async function TryCatchMiddleware<T>(asyncFunction: () => Promise<T>): Promise<T | NextResponse<object>> {
  try {
    return await asyncFunction();
  } catch (error: unknown) {
    if (error instanceof CustomError) {
      return customErrorHandler(
        {
          message: error.message,
        },
        error.status ?? ResponseCode.INTERNAL_SERVER_ERROR
      );
    } else if (error instanceof ZodError) {
      return zodErrorHandler(error);
    } else if (error instanceof Error) {
      return errorHandler(error);
    } else {
      // This is some other internal error
      return customErrorHandler({ message: 'Internal error. Error: Unknown' }, ResponseCode.INTERNAL_SERVER_ERROR);
    }
  }
}
