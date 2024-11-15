import { CustomError } from './CustomError';

/**
 * Represents a Not Found error in the application.
 * Extends the CustomError class to provide specific handling for 404 errors.
 *
 * @extends CustomError
 *
 * @param {string} [message="Not Found"] - The error message. Defaults to "Not Found" if not provided.
 * @param {string | null} [error] - Additional error details or context.
 *
 * @example
 * throw new NotFoundError("User not found");
 *
 * @example
 * throw new NotFoundError(); // Uses default message "Not Found"
 *
 * @example
 * throw new NotFoundError("Resource not found", "Additional error details");
 */
export class NotFoundError extends CustomError {
  constructor(message = 'Not Found', error?: string | null) {
    super(message, 404, error);
  }
}
