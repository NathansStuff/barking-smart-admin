import { NextResponse } from 'next/server';

import { ResponseCode } from '@/types/ResponseCode';

import { customErrorHandler } from './customErrorHandler';

export function errorHandler(error: Error): NextResponse<object> {
  if (error.message) {
    if (error.message.includes('E11000')) {
      // This is a duplicate key error
      return customErrorHandler(
        {
          message: 'Duplicate key error',
        },
        ResponseCode.BAD_REQUEST
      );
    } else if (error.message.includes('Cast to ObjectId failed for value')) {
      // This is a cast error
      return customErrorHandler(
        {
          message: 'Invalid ID',
        },
        ResponseCode.BAD_REQUEST
      );
    } else {
      // This is some other internal error
      return customErrorHandler(
        { message: 'An unexpected error occurred' },
        ResponseCode.INTERNAL_SERVER_ERROR
      );
    }
  } else {
    // This is some other internal error
    return customErrorHandler(
      {
        message: 'An unexpected error occurred',
      },
      ResponseCode.INTERNAL_SERVER_ERROR
    );
  }
}
