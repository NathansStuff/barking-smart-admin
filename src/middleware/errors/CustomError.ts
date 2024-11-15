/**
 * Represents a custom error in the application.
 * Extends the built-in Error class to provide additional properties for status and error details.
 *
 * @extends Error
 *
 * @param {string} message - The error message.
 * @param {number} status - The HTTP status code associated with this error.
 * @param {string | null} [error] - Additional error details or context. Defaults to null if not provided.
 *
 * @example
 * throw new CustomError("Bad Request", 400);
 *
 * @example
 * throw new CustomError("Internal Server Error", 500, "Database connection failed");
 */
export class CustomError extends Error {
  status?: number;
  message: string;
  error: string | null;

  constructor(message: string, status: number, error?: string | null) {
    super(message);
    this.status = status;
    this.message = message;
    this.error = error ?? null;
  }
}
