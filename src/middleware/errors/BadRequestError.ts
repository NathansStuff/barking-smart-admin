import { CustomError } from './CustomError';

/**
 * Represents a Bad Request error in the application.
 * Extends the CustomError class to provide specific handling for 400 errors.
 *
 * @extends CustomError
 *
 * @param {string} [message="Bad Request"] - The error message. Defaults to "Bad Request" if not provided.
 * @param {string | null} [error] - Additional error details or context.
 *
 * @example
 * throw new BadRequestError("Invalid input");
 *
 * @example
 * throw new BadRequestError(); // Uses default message "Bad Request"
 *
 * @example
 * throw new BadRequestError("Missing required field", "Username is required");
 */
export class BadRequestError extends CustomError {
  constructor(message = 'Bad Request', error?: string | null) {
    super(message, 400, error);
  }
}
