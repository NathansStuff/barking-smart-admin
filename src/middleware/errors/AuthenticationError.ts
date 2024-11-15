import { CustomError } from './CustomError';

/**
 * Represents an Authentication error in the application.
 * Extends the CustomError class to provide specific handling for authentication failures.
 *
 * @extends CustomError
 *
 * @param {string} [message="Unauthorized"] - The error message. Defaults to "Unauthorized" if not provided.
 * @param {string | null} [error] - Additional error details or context.
 *
 * @example
 * throw new AuthenticationError("Invalid credentials");
 *
 * @example
 * throw new AuthenticationError(); // Uses default message "Unauthorized"
 *
 * @example
 * throw new AuthenticationError("Access denied", "Token expired");
 */
export class AuthenticationError extends CustomError {
  constructor(message = 'Unauthorized', error?: string | null) {
    super(message, 400, error);
  }
}
